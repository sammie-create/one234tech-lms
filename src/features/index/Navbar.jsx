import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import { useAuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const { isAuthenticated, userRole } = useAuthContext();

  const lms = isAuthenticated
    ? userRole === "admin"
      ? "lms/admin"
      : "/lms/student"
    : "/lms/signin";

  return (
    <nav
      data-aos="fade-in"
      className="sticky top-0 z-50 bg-white p-2.5 shadow-sm md:px-4 md:py-3.5 lg:p-3 xl:px-8"
    >
      <div className="flex items-center justify-between">
        <Logo />
        <Link to={lms}>
          <Button size={"small"} variation={"primary"}>
            Access LMS
          </Button>
        </Link>
      </div>
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              One234 Tech
            </h1>
            <p className="text-gray-600">Product School Learning Platform</p>
          </div>
        </div>
        <Button
          onClick={() => navigate("/lms")}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
        >
          Access LMS
        </Button>
      </div> */}
    </nav>
  );
}

export default Navbar;
