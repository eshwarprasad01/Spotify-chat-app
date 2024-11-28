import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  return (
    <div className="w-[25%] p-2 flex-col gap-2 bg-black h-full text-white lg:flex hidden">
      <div className="h-[15%] rounded flex flex-col justify-around bg-[#121212]">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="" />
          <p className="font-bold">Search</p>
        </div>
      </div>
      <div className="h-full rounded bg-[#121212] overflow-auto">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="" />
            <img className="w-5" src={assets.plus_icon} alt="" />
          </div>
        </div>

        <div className="p-4 m-2 rounded bg-[#242424] font-semibold flex flex-col items-start justify-start gap-1">
          <h1>Create your first playlist</h1>
          <p className="font-light">it&apos;s easy we&apos;ll help you</p>
          <button className="bg-white text-black rounded-full px-4 py-1.5 text-[15px] mt-3">
            Create playlist
          </button>
        </div>
        <div className="p-4 m-2 rounded bg-[#242424] font-semibold flex flex-col items-start justify-start gap-1">
          <h1>Let&apos;s find some podcasts to follow</h1>
          <p className="font-light">
            We&apos;ll keep you updates on new episodes
          </p>
          <button className="bg-white text-black rounded-full px-4 py-1.5 text-[15px] mt-3">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
}
