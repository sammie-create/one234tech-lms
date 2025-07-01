import { HiAcademicCap } from "react-icons/hi2";
import Logo from "../../ui/Logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex items-center justify-between px-4 py-1.5">
      <div className="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-sm flex items-center justify-center">
        <Link to="/">
          <HiAcademicCap className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </Link>
      </div>
      <div className="flex gap-4">
        <Link
          to="/lms/admin/signin"
          className="hover:underline active:gray-600"
        >
          Admin Login
        </Link>
        <p>&copy; 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
