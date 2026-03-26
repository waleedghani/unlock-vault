import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const user = useSelector((state) => state.AuthReducer);
  return user?.userToken ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;
