import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiClipboard,
  FiAward,
  FiSettings,
} from "react-icons/fi";
import { useLMSContext } from "@/contexts/LMSContext";
import {
  RiBook2Line,
  RiBookShelfLine,
  RiDashboardHorizontalLine,
  RiFolder3Line,
  RiGroupLine,
  RiSettings4Line,
} from "react-icons/ri";
import { MdOutlinePlayLesson } from "react-icons/md";

const links = [
  {
    id: 500,
    to: "dashboard",
    linkIcon: <RiDashboardHorizontalLine />,
    linkName: "Dashboard",
  },
  {
    id: 501,
    to: "manage-students",
    linkIcon: <RiGroupLine />,
    linkName: "Manage Students",
  },
  {
    id: 502,
    to: "courses",
    linkIcon: <RiBookShelfLine />,
    linkName: "Manage Courses",
  },
  {
    id: 503,
    to: "modules",
    linkIcon: <RiFolder3Line />,
    linkName: "Modules",
  },
  {
    id: 504,
    to: "lessons",
    linkIcon: <MdOutlinePlayLesson />,
    linkName: "Lessons",
  },
  // {
  //   id: 505,
  //   to: "assignments",
  //   linkIcon: <FiAward />,
  //   linkName: "Certificates",
  // },
  {
    id: 506,
    to: "settings",
    linkIcon: <RiSettings4Line />,
    linkName: "Settings",
  },
];

function AdminSideBar() {
  const { sidebarOpen, setSidebarOpen } = useLMSContext();

  return (
    <div className="md:col-start-1 md:row-start-2">
      <aside
        className={`fixed z-40 h-full border-r border-gray-50 bg-white px-6 py-10 transition-all duration-400 ease-in-out md:relative xl:px-10 ${
          sidebarOpen ? "w-[55%] translate-x-0" : "w-[55%] -translate-x-full"
        } md:w-full md:translate-x-0`}
      >
        <ul className="flex flex-col justify-center gap-3 font-medium">
          {links.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-gray-50 md:px-6 lg:text-sm xl:text-base"
              >
                {link.linkIcon} <span>{link.linkName}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 top-[53px] z-30 bg-black opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default AdminSideBar;
