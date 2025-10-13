import { useSelector } from "react-redux";
import { Toast } from "../common_Functions/common_function";
import { Navigate } from "react-router-dom";

export const SafeRoute = ({ children }) => {
  const userDetails = useSelector((state) => state.user.details);
  const isLoggedIn = !!userDetails;

  if (!isLoggedIn) {
    Toast.fire({ title: "Please login..", icon: "warning" });
    return <Navigate to="/" replace />;
  }

  return children;
};
