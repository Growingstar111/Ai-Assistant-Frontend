import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Toast } from "../common_Functions/common_function";

 const AuthRoute = ({ children }) => {
  const userDetails = useSelector((state) => state.user.details);
  const isLoggedIn = !!userDetails;

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
 

  return children;
};
export default AuthRoute


