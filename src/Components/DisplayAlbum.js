import { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets';
import { PlayerContext } from '../Context/PlayerContext';

export default function DisplayAlbum() {
  const {id} = useParams();
  const albumData = albumsData.filter((item) => item.id == id)[0];

  const {playWithId} = useContext(PlayerContext);

  return (
    <div>
      <Navbar />
      <div className='flex gap-8 mt-10 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded' src={albumData.image} alt="" />
        <div className='flex flex-col flex-1'>
          <p>Playlist</p>
          <h1 className='font-bold text-5xl md:text-7xl mb-4'>{albumData.name}</h1>
          <h4>{albumData.desc}</h4>
          <p className='mt-1'>
            <img className='w-5 h-5 inline-block' src={assets.spotify_logo} alt="" />
            <b>  Spotify </b>
            &bull; 1,323,154 Likes
            <b> &bull; 50 Songs, </b>
            about 2 hrs 30 min
          </p>
        </div>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b><b>Title</b></p>
        <p className='m-auto'>Album</p>
        <p className='hidden sm:block m-auto'>Date Added</p>
        <img className='w-4 m-auto' src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {
        songsData.map((item, ind) => (
          <div key={ind} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b]'
          onClick={() => playWithId(ind)}>
            <p className='text-white  '>
              <b className='mr-4 text-[#a7a7a7]'>{ind + 1}</b>
              <img className='w-10 inline mr-5' src={item.image} alt="" />
              {item.name}
            </p>
            <p className='text-[15px] m-auto'>{item.name}</p>
            <p className='text-[15px] hidden sm:block m-auto'>5 Days ago</p>
            <p className='text-[15px] m-auto'>{item.duration}</p> {/*m-auto or text-center*/}
          </div>
        ))
      }
    </div>
  )
}
