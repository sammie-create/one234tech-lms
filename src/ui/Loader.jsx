import Lottie from "lottie-react";
import loadingAnimation from "../assets/animation/auth-loader.json";

function Loader() {
  return (
    <div
      data-aos=""
      className="fixed bg-white/20 inset-0 z-50 flex justify-center items-center"
    >
      <div className=" w-35 h-35 md:w-50 md:h-50">
        <Lottie animationData={loadingAnimation} />
      </div>
    </div>
  );
}

export default Loader;
