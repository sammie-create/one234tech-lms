import Lottie from "lottie-react";
import underConstruction from "../../assets/animation/site-under-construction.json";

function StudentAssignments() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-60 w-60 xl:h-80 xl:w-80">
        <Lottie
          animationData={underConstruction}
          loop={true}
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p className="mx-auto w-3/4 text-center md:text-xs xl:text-sm">
        <span className="font-bold text-amber-600">Assignments update!</span>{" "}
        We're currently building our assignments page to streamline your
        coursework. Stay tuned for an enhanced learning experience
      </p>
    </div>
  );
}

export default StudentAssignments;
