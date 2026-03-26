import { NavLink, useLocation } from "react-router-dom";
import { setlogoutUser } from "../../redux/reducers/AuthReducer";
import { useDispatch } from "react-redux";
// import "../ProfileLayout/profileLayout.css";
const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location, "location");
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setlogoutUser());
    Alert({
      title: "success",
      text: "Logout successfully",
    });
    navigate("/");
  };

  return (
    <ul className="sidebar__list list-unstyled m-0 p-0">
      <NavLink
        to="/my-profile"
        end
        className={({ isActive }) =>
          `level-5-sm d-flex align-items-center justify-content-center reg-font dark-color text-uppercase ${
            isActive || location.pathname === "/" ? "active-profile" : ""
          }`
        }
      >
        <li className="py-md-3 py-2 text-center reg-font">My Profile</li>
      </NavLink>
      <NavLink
        to="/my-subscription"
        className={({ isActive }) =>
          `level-5-sm d-flex align-items-center justify-content-center reg-font dark-color text-uppercase ${
            isActive ? "active-profile" : ""
          }`
        }
      >
        <li className="py-md-3 py-2">My Subscriptions</li>
      </NavLink>
      <NavLink
        to="/my-courses"
        className={({ isActive }) =>
          `level-5-sm d-flex align-items-center justify-content-center reg-font dark-color text-uppercase ${
            isActive ? "active-profile" : ""
          }`
        }
      >
        <li className="py-md-3 py-2">My Courses</li>
      </NavLink>
      <NavLink
        to="/my-tokens"
        className={({ isActive }) =>
          `level-5-sm d-flex align-items-center justify-content-center reg-font dark-color text-uppercase ${
            isActive ? "active-profile" : ""
          }`
        }
      >
        <li className="py-md-3 py-2">My Tokens</li>
      </NavLink>
      <NavLink
        to="/connect-xumm"
        className={({ isActive }) =>
          `level-5-sm d-flex align-items-center justify-content-center reg-font dark-color text-uppercase ${
            isActive ? "active-profile" : ""
          }`
        }
      >
        <li className="py-md-3 py-2">Connect To XUMM</li>
      </NavLink>
      <NavLink
        to="/payment-history"
        className={({ isActive }) =>
          `level-5-sm d-flex align-items-center justify-content-center reg-font dark-color text-uppercase ${
            isActive ? "active-profile" : ""
          }`
        }
      >
        <li className="py-md-3 py-2">Payment History</li>
      </NavLink>
      <NavLink
        to="#"
        className={({ isActive }) =>
          `level-5-sm d-flex align-items-center justify-content-center reg-font dark-color text-uppercase ${
            isActive ? "active" : ""
          }`
        }
      >
        <li className="py-md-3 py-2" onClick={handleLogout}>
          LOGOUT
        </li>
      </NavLink>
    </ul>
  );
};

export default Sidebar;
