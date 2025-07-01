import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import Loader from "../../ui/Loader";

function ProtectedRoutes() {
  const { isAuthenticated, authLoading, userRole } = useAuthContext();

  if (authLoading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/lms" />;
  if (userRole !== "admin" && userRole !== "student")
    return <Navigate to="/unauthorized" />;

  return <Outlet />;
}

export default ProtectedRoutes;
