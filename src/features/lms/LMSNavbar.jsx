import { Link } from "react-router-dom";
import { FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import { RiMenu2Fill, RiCloseLargeFill } from "react-icons/ri";

import { useAuth } from "../../hooks/useAuth";
import Loader from "../../ui/Loader";
import { useLMSContext } from "../../contexts/LMSContext";
import { HiAcademicCap } from "react-icons/hi2";
import { useAuthContext } from "../../contexts/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useSignedStorageUrl } from "../../hooks/useSignedStorageUrl";
import { ImSpinner2 } from "react-icons/im";

function LMSNavbar() {
  const { handleSignOut } = useAuth();
  const { sidebarOpen, setSidebarOpen, dropdownOpen, setDropdownOpen } =
    useLMSContext();

  const { user } = useAuthContext();
  const { profile, profileLoading } = useUserProfile(user?.id);
  const { data: signedAvatarUrl, isLoading: avatarLoading } =
    useSignedStorageUrl("profile-images", profile?.profile_picture_url);

  // const { user } = useAuthContext();
  // const { data, isLoading } = useUserProfile(user?.id);

  // if (isLoading) return <Loader />;

  const profileName = profile?.name.split(" ")[0];
  console.log(profile);

  return (
    <nav className="relative flex items-center justify-between border-b border-gray-50 bg-white px-4 py-2.5 md:col-span-2 md:px-8">
      <div className="relative h-5 w-5 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="relative inset-0 h-6 w-6 cursor-pointer text-gray-700 hover:text-gray-900"
        >
          <RiMenu2Fill
            className={`absolute top-0 h-5 w-5 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "scale-90 opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <RiCloseLargeFill
            className={`absolute top-0 h-5 w-5 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* <div className="text-2xl font-bold ">
        <Link to="/">
          LMS
        </Link>
      </div> */}
      <div className="flex gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-gradient-to-r from-green-500 to-emerald-600 md:h-10 md:w-10">
          <Link to="/">
            <HiAcademicCap className="h-4 w-4 text-white md:h-6 md:w-6" />
          </Link>
        </div>
        <div>
          {profile?.role && (
            <p className="flex flex-col text-xs leading-tight font-bold md:text-base">
              {profile.role === "admin" ? (
                <>
                  <span>Admin</span>
                  <span>Panel</span>
                </>
              ) : (
                <>
                  <span>Student</span>
                  <span>Portal</span>
                </>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex cursor-pointer items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-600 md:text-sm lg:gap-2 lg:text-base"
        >
          {/* <FiUser className="h-6 w-6" /> */}
          <div className="w-fit">
            {profileLoading || avatarLoading ? (
              <div className="flex h-8 w-8 items-center justify-center">
                <ImSpinner2 className="h-3 w-3 animate-spin text-gray-600" />
              </div>
            ) : (
              <img
                src={signedAvatarUrl || "/user.png"}
                alt="Profile Image"
                loading="eager"
                className={`h-8 w-8 rounded-full border border-gray-100 object-cover lg:h-10 lg:w-10 ${!signedAvatarUrl && "p-1.5"}`}
              />
            )}
          </div>
          <p className="-space-y-0.6 flex flex-col lg:-space-y-1">
            <span className="font-semibold">{profileName}</span>

            <span className="text-[10px] text-gray-400 md:text-xs">
              {`${profile?.role.charAt(0).toUpperCase() + profile?.role.slice(1)}`}
            </span>
          </p>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 z-50 mt-2 w-40 rounded border border-gray-200 bg-white shadow-lg">
            <Link
              to="settings"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FiSettings className="mr-2" /> Profile Settings
            </Link>
            <button
              onClick={() => {
                handleSignOut();
                setDropdownOpen(!dropdownOpen);
              }}
              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
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
