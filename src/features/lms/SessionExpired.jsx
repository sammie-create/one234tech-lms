import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import timeoutAnimation from "../../assets/animation/session-expired.json";

function SessionExpired() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/lms/signin");
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-40 h-40 md:w-60 md:h-60  mb-3">
        <Lottie animationData={timeoutAnimation} loop autoplay />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Session Expired
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        For your security, your session has timed out. You’ll be redirected to
        sign in shortly.
      </p>
      <button
        onClick={() => navigate("/lms/signin")}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-md transition"
      >
        Go to Sign In Now
      </button>
    </div>
  );
}

export default SessionExpired;
