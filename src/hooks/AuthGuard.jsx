import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated)return <>{children}</>;
  
   else return <Navigate to="/" />;

};
export default AuthGuard;
