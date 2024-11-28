import Navbar from "./Navbar";
import { albumsData, songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";

export default function DisplayHome() {
  return (
    <div>
      <Navbar />
      <div className="mb-2">
        <h1 className="text-2xl font-bold mt-3 mb-2">Featured Charts</h1>
        <div className="flex overflow-auto">
          {console.log("Hello all")}
          {albumsData.map((item, ind) => (
            <AlbumItem
              key={ind}
              image={item.image}
              name={item.name}
              desc={item.desc}
              id={item.id}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mt-1 mb-3">
          Today&apos;s Biggest hits
        </h1>
        <div className="flex overflow-auto">
          {songsData.map((item, ind) => (
            <SongItem
              key={ind}
              image={item.image}
              name={item.name}
              desc={item.desc}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
