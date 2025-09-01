import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import mailSentAnimation from "@/assets/animation/mail-sent.json";

function EmailSent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <div className="mb-4 h-32 w-32 md:h-48 md:w-48">
        <Lottie
          animationData={mailSentAnimation}
          loop={true}
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h2 className="mb-2 text-lg font-semibold">Check your email</h2>
      <p className="mb-6 text-sm text-gray-600">
        We've sent a password reset link. Please follow the instructions in your
        inbox.
      </p>

      <Link
        to="/lms/signin"
        className="text-sm font-medium !text-emerald-600 hover:underline"
      >
        Back to Sign In
      </Link>
    </div>
  );
}

export default EmailSent;
