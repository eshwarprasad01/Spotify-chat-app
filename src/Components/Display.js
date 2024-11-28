import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome.js";
import DisplayAlbum from "./DisplayAlbum.js";
import { albumsData } from "../assets/assets.js";

export default function Display() {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : null;
  const bgColor = albumsData.filter((item) => item.id == albumId)[0]?.bgColor;

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  });

  return (
    <div
      ref={displayRef}
      className="bg-[#121212] flex-1 m-2 rounded flex flex-col px-6 pt-4 lg:ml-0 text-white overflow-auto"
    >
      <Routes>
        <Route path="" element={<DisplayHome />} />
        <Route path="album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
}
