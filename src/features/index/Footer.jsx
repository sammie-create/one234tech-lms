import { HiAcademicCap } from "react-icons/hi2";
import Logo from "../../ui/Logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-gray-200 p-2.5 md:px-4 md:py-2 lg:p-2 xl:px-8">
      <div className="flex h-8.5 w-8.5 items-center justify-center rounded-sm bg-gradient-to-r from-green-500 to-emerald-600 md:h-12 md:w-12">
        <Link to="/">
          <HiAcademicCap className="h-5 w-5 text-white md:h-7 md:w-7" />
        </Link>
      </div>
      <div className="flex gap-4 md:text-sm">
        <Link
          to="/lms/admin/signin"
          className="active:gray-600 hover:underline"
        >
          Admin Login
        </Link>
        <p>&copy; 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
