import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: Number(track.duration.split(":")[1]),
      minute: Number(track.duration.split(":")[0]),
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await play();
  };

  const previous = async() => {
    if(track.id > 0) playWithId(track.id - 1);
  }
  const next = async() => {
    if(track.id < songsData.length - 1) playWithId(track.id + 1);
  }

  const seekSong = async(event) => {
    audioRef.current.currentTime = (event.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
  }

  useEffect(() => {
    setTime((prev) => ({
      ...prev,
      totalTime: {
        second: Number(track.duration.split(":")[1]),
        minute: Number(track.duration.split(":")[0]),
      },
    }));
  }, [track]);

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime((prev) => ({
          ...prev,
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
        }));
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
