import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const { isAuthenticated, userRole } = useAuthContext();
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);

  const lms = isAuthenticated
    ? userRole === "admin"
      ? "lms/admin"
      : "/lms/student"
    : "/lms/signin";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Initial height update
    updateHeight();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeight);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      <div style={{ height: isScrolled ? navHeight : 0 }}></div>

      <nav
        data-aos="fade-in"
        ref={navRef}
        className={`${isScrolled ? "fixed shadow-sm" : ""} top-0 z-50 w-full bg-white p-2.5 transition-all duration-300 md:px-4 md:py-3.5 lg:p-3 xl:px-8`}
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
    </>
  );
}

export default Navbar;
