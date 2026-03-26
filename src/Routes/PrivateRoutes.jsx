import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.AuthReducer);
  return user?.userToken ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
