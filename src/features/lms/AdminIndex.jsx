import { Outlet } from "react-router-dom";
import LMSNavbar from "./LMSNavbar";
import SideBar from "./SideBar";
import LMSFooter from "./LMSFooter";
import { useAuthContext } from "../../contexts/AuthContext";
import Loader from "../../ui/Loader";

function AdminIndex() {
  const { authLoading } = useAuthContext();

  return (
    <>
      {authLoading ? (
        <Loader />
      ) : (
        <div
          data-aos="fade-in"
          className="min-h-screen md:grid md:grid-cols-[14rem_1fr] md:grid-rows-[auto_1fr_auto] lg:grid-cols-[16rem_1fr] xl:grid-cols-[20rem_1fr]"
        >
          <LMSNavbar />
          <SideBar />
          <main className="relative col-start-2 row-start-2 min-h-screen p-4 md:p-7 lg:px-10 lg:py-10">
            <Outlet />
          </main>
          <LMSFooter />
        </div>
      )}
    </>
  );
}

export default AdminIndex;
