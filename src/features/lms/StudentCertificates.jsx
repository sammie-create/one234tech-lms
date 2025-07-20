import Lottie from "lottie-react";
import comingSoon from "../../assets/animation/coming-soon.json";

function StudentCertificates() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-60 w-60 xl:h-80 xl:w-80">
        <Lottie
          animationData={comingSoon}
          loop={true}
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p className="mx-auto w-3/4 text-center md:text-xs xl:text-sm">
        <span className="font-bold text-emerald-600">
          Certificates on the way!
        </span>{" "}
        Our certificate page is coming soon, allowing you to easily access and
        share your course completion certificates
      </p>
    </div>
  );
}

export default StudentCertificates;
