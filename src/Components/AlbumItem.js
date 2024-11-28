/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AlbumItem({ image, name, desc, id }) {
  const navigate = useNavigate();
  return (
    <div
      className="min-w-[181px] w-10 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
      onClick={() => navigate(`album/${id}`)}
    >
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
}
