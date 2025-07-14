import Lottie from "lottie-react";
// import loadingAnimation from "../assets/animation/auth-loader.json";
import loadingAnimation from "../assets/animation/spin-loader.json";

function Loader() {
  return (
    <div
      data-aos=""
      className="absolute inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="h-20 w-20 md:h-35 md:w-35">
        <Lottie animationData={loadingAnimation} />
      </div>
    </div>
  );
}

export default Loader;
