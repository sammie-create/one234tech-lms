import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import Button from "../../ui/Button";

function CallToAction() {
  const { isAuthenticated, userRole } = useAuthContext();
  const navigate = useNavigate();

  const lms = isAuthenticated
    ? userRole === "admin"
      ? "lms/admin"
      : "/lms/student"
    : "/lms/signin";

  return (
    <section className="relative mt-6 overflow-hidden bg-green-700 bg-[url('/green-bg.svg')] bg-cover bg-center bg-no-repeat py-14 text-white bg-blend-multiply xl:mt-10">
      <div
        data-aos="fade-up"
        className="animate-fade-in mx-auto max-w-4xl px-4 text-center"
      >
        <h2 className="mb-4 leading-7 !text-white dark:text-gray-800">
          Ready to Start Learning?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-sm text-gray-300">
          Join hundreds of students developing successful product careers
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {/* <Button size={"medium"} variation={"primary"}>
            Create Account
          </Button>

          <Button size={"medium"} variation={"secondary"}>
            Explore Courses
          </Button> */}

          <button
            type="button"
            onClick={() => navigate(lms)}
            className="btn bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-[12px] text-white transition-all duration-300 hover:from-green-600 hover:to-emerald-700"
          >
            Create Account
          </button>

          <button className="btn border border-green-500 px-6 py-3 text-[12px] text-green-400 transition-all duration-400 hover:border-green-50 hover:bg-green-50">
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
