import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiClipboard,
  FiAward,
  FiSettings,
} from "react-icons/fi";
import { useLMSContext } from "../../contexts/LMSContext";

const links = [
  {
    id: 444,
    to: "dashboard",
    linkIcon: <FiHome />,
    linkName: "Dashboard",
  },
  {
    id: 445,
    to: "my-courses",
    linkIcon: <FiBook />,
    linkName: "My Courses",
  },
  {
    id: 446,
    to: "assignments",
    linkIcon: <FiClipboard />,
    linkName: "Assignments",
  },
  {
    id: 447,
    to: "certificates",
    linkIcon: <FiAward />,
    linkName: "Certificates",
  },
  {
    id: 448,
    to: "settings",
    linkIcon: <FiSettings />,
    linkName: "Settings",
  },
];

function SideBar() {
  const { sidebarOpen, setSidebarOpen } = useLMSContext();

  return (
    <div className="md:col-start-1 md:row-start-2">
      <aside
        className={`fixed md:relative z-40 h-full bg-white border-r border-gray-200 py-10 px-6 transition-all duration-400 ease-in-out  ${
          sidebarOpen ? "w-[55%] translate-x-0" : "w-[55%] -translate-x-full"
        } md:w-full md:translate-x-0`}
      >
        <ul className="flex flex-col gap-3 justify-center font-medium">
          {links.map(link => (
            <li key={link.id}>
              <NavLink
                to={link.to}
                className="flex items-center gap-2 text-[15px] px-6 py-2 rounded-lg hover:bg-gray-50"
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
          className="fixed inset-0 bg-black top-[65px] opacity-40 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default SideBar;
