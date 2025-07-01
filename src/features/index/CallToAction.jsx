import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import Button from "../../ui/Button";

function CallToAction() {
  const { isAuthenticated, userRole } = useAuthContext();

  const lms = isAuthenticated
    ? userRole === "admin"
      ? "lms/admin"
      : "/lms/student"
    : "/lms/signin";

  return (
    <section
      data-aos="fade-up"
      className="relative mt-6 overflow-hidden bg-green-700 bg-[url('/green-bg.svg')] bg-cover bg-center bg-no-repeat py-14 text-white bg-blend-multiply xl:mt-10"
    >
      <div className="animate-fade-in mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 leading-7 !text-white dark:text-gray-800">
          Ready to Start Learning?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-sm text-gray-300">
          Join hundreds of students developing successful product careers
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link to={lms}>
            <Button size={"medium"} variation={"primary"}>
              Create Account
            </Button>
          </Link>
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
