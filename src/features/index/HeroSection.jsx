// import Button from "../../ui/Button";

// function HeroSection() {
//   return (
//     <section className="px-8 py-15 md:py-20 md:px-20 lg:px-24 lg:pt-30 lg:pb-20 xl:w-[72%] xl:m-auto flex flex-col items-center gap-2">
//       <h1
//         data-aos="zoom-in"
//         className="text-[26px] md:text-[40px] lg:text-[65px] leading-7 md:leading-12 lg:leading-18 text-gray-800"
//       >
//         Build Smarter Products,{" "}
//         <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//           Learn the Right Way
//         </span>
//       </h1>

//       <p
//         data-aos="zoom-in"
//         className="text-[10px] text-gray-700 md:text-base lg:text-[22px] italic mb-4 md:mb-8 xl:mb-12 lg:pr-17"
//       >
//         Your product career starts here with guided courses, hands-on learning,
//         and the support to keep you moving forward.
//       </p>

//       <div className="flex gap-5 md:gap-10 justify-center">
//         <Button size={"medium"} variation={"primary"}>
//           Start Learning
//         </Button>
//         <Button size={"medium"} variation={"secondary"}>
//           Explore Courses
//         </Button>
//       </div>
//     </section>
//   );
// }

// export default HeroSection;

import Button from "../../ui/Button";
import HeroImage from "../../assets/images/hero-image-optimized.webp";

function HeroSection() {
  return (
    <section className="bg-white px-6 py-12 md:px-8 md:py-20 lg:px-10 lg:py-25 xl:px-20">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 md:flex-row md:gap-5 xl:gap-10">
        {/* Text content */}
        <div className="flex-1 lg:flex-[1.2] lg:text-left">
          <h1
            data-aos="zoom-in"
            className="text-[25px] leading-tight font-bold text-gray-800 md:text-[30px] lg:text-[45px] xl:text-[55px]"
          >
            Build Smarter Products,{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Learn the Right Way
            </span>
          </h1>

          <p
            data-aos="zoom-in"
            className="mx-auto mt-1 mb-5 max-w-xl text-[12px] text-gray-700 italic md:text-[14px] lg:mx-0 lg:mb-7 lg:text-[18px] xl:mt-3"
          >
            Your product career starts here with guided courses, hands-on
            learning, and the support to keep you moving forward.
          </p>

          <div className="flex justify-center gap-4 md:justify-start">
            <Button size={"medium"} variation={"primary"}>
              Start Learning
            </Button>
            <Button size={"medium"} variation={"secondary"}>
              Explore Courses
            </Button>
          </div>
        </div>

        {/* Hero image */}
        <div
          data-aos="zoom-in"
          className="flex-1 items-center justify-center lg:flex lg:flex-[0.8]"
        >
          <img
            src={HeroImage}
            alt="Group of students studying"
            className="h-auto w-auto rounded-e-full object-cover shadow-lg md:rounded-s-full lg:h-85 lg:w-85 lg:rounded-full xl:h-100 xl:w-100"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
