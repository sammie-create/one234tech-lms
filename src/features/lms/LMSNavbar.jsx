import { Link } from "react-router-dom";
import { FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import { RiMenu2Fill, RiCloseLargeFill } from "react-icons/ri";

import { useAuth } from "../../hooks/useAuth";
import Loader from "../../ui/Loader";
import { useLMSContext } from "../../contexts/LMSContext";
import { HiAcademicCap } from "react-icons/hi2";

function LMSNavbar() {
  const { handleSignOut } = useAuth();
  const {
    sidebarOpen,
    setSidebarOpen,
    dropdownOpen,
    setDropdownOpen,
    student,
  } = useLMSContext();

  // const { user } = useAuthContext();
  // const { data, isLoading } = useUserProfile(user?.id);

  // if (isLoading) return <Loader />;

  const studentName = student?.name.split(" ")[0];
  console.log(student);

  return (
    <nav className="bg-white flex justify-between items-center px-8 py-2.5 border-b border-gray-200 relative md:col-span-2">
      <div className="md:hidden relative w-5 h-5">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="relative w-6 h-6 inset-0 text-gray-700 hover:text-gray-900 cursor-pointer"
        >
          <RiMenu2Fill
            className={`w-5 h-5 absolute top-0 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          />
          <RiCloseLargeFill
            className={`w-5 h-5 absolute top-0 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          />
        </button>
      </div>

      {/* <div className="text-2xl font-bold ">
        <Link to="/">
          LMS
        </Link>
      </div> */}
      <div className="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-sm flex items-center justify-center">
        <Link to="/">
          <HiAcademicCap className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </Link>
      </div>

      {/* <div className="hidden md:flex items-center space-x-6">
    <Link
      to="/"
      className="text-sm font-medium text-gray-600 hover:text-blue-600"
    >
      Home
    </Link>
    <Link
      to="/my-courses"
      className="text-sm font-medium text-gray-600 hover:text-blue-600"
    >
      My Courses
    </Link>
    <Link
      to="/support"
      className="text-sm font-medium text-gray-600 hover:text-blue-600"
    >
      Support
    </Link>
  </div> */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
        >
          <FiUser className="w-5 h-5" />
          <span>{studentName}</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FiSettings className="mr-2" /> Profile Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
            >
              <FiLogOut className="mr-2" /> Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default LMSNavbar;
