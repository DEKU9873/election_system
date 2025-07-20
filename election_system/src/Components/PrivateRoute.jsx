import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ allowedRoles }) => {
  const token = Cookies.get("token");
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

 

  if (!token || !user) {
    console.log("No token or user, redirecting to login");
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("Role not allowed, redirecting to login");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
