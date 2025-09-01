import { Link } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi2";

function Logo() {
  return (
    <Link className="flex gap-1.5 lg:gap-3">
      <div className="w-8 h-8 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md flex items-center justify-center">
        <HiAcademicCap className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-[14px] md:text-[20px] bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          One234 Tech
        </h1>
        <p className="text-gray-600 lg:text-[14px] lg:leading-4 leading-3 md:text-[14px]">
          Product School Learning Platform
        </p>
      </div>
    </Link>
  );
}

export default Logo;
