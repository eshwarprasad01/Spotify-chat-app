import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center font-semibold">
        <div className="flex gap-2 items-center">
          <img onClick={() => navigate(-1)} className="w-8 bg-black p-2 rounded-full cursor-pointer" src={assets.arrow_left} alt="" />
          <img onClick={() => navigate(1)} className="w-8 bg-black p-2 rounded-full cursor-pointer" src={assets.arrow_right} alt="" />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black rounded-full px-4 py-1 text-[15px] hidden md:block cursor-pointer">Explore Premium</p>
          <p className="bg-black rounded-full px-3 py-1 text-[15px] cursor-pointer">Install App</p>
          <p className="bg-purple-500 text-black rounded-full w-7 h-7 flex justify-center items-center">E</p>
          <img onClick={() => navigate("/Chat")} className=" p-1 w-8 rounded hover:bg-[#ffffff2b]" src={assets.messenger_icon} alt="" />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <p className="bg-white text-black rounded-full px-4 py-1 cursor-pointer">All</p>
        <p className="bg-black rounded-full px-4 py-1 cursor-pointer">Music</p>
        <p className="bg-black rounded-full px-4 py-1 cursor-pointer">Podcasts</p>
      </div>
    </div>
  )
}
