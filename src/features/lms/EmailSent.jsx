import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import mailSentAnimation from "../../assets/animation/mail-sent.json";

function EmailSent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100 text-center">
      <div className="w-32 h-32 md:w-48 md:h-48 mb-4">
        <Lottie
          animationData={mailSentAnimation}
          loop={true}
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h2 className="text-lg font-semibold mb-2">Check your email</h2>
      <p className="text-sm text-gray-600 mb-6">
        We've sent a password reset link. Please follow the instructions in your
        inbox.
      </p>

      <Link
        to="/lms/signin"
        className="text-sm !text-emerald-600 hover:underline font-medium"
      >
        Back to Sign In
      </Link>
    </div>
  );
}

export default EmailSent;
