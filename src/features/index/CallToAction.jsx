import Button from "../../ui/Button";

function CallToAction() {
  return (
    <section
      data-aos="fade-up"
      className="relative overflow-hidden py-14 mt-6 xl:mt-10 bg-[url('/green-bg.svg')] bg-no-repeat bg-cover bg-center bg-green-700 bg-blend-multiply text-white"
    >
      {/* Blurred Texture SVG Overlay */}
      {/* <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/green-bg.svg"
          alt=""
          className="w-full h-full object-cover opacity-40 mix-blend- "
        />
      </div> */}
      <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in">
        <h2 className="!text-white dark:text-gray-800 mb-4 leading-7">
          Ready to Start Learning?
        </h2>
        <p className="text-gray-300 mb-8 text-sm max-w-2xl mx-auto">
          Join hundreds of students developing successful product careers
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size={"medium"} variation={"primary"}>
            Create Account
          </Button>
          <Button size={"medium"} variation={"secondary"}>
            Explore Courses
          </Button>

          {/* <button className="btn px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[12px] hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
            Create Account
          </button>
          <button className="btn px-6 py-3 border border-green-500 text-green-400 text-[12px] hover:bg-green-50 hover:border-green-50 transition-all duration-400">
            Explore Courses
          </button> */}
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
