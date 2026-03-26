// import React from "react";
// import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import ContactUs from "../pages/ContactUs";
// import Relics from "../pages/Relics";
// import Vaults from "../pages/Vaults";
// import Tokens from "../pages/Tokens";
// import Paths from "../pages/Paths";
// import Videos from "../pages/Videos";
// import Photos from "../pages/Photos";
// import Terms from "../pages/Terms";
// import Privacy from "../pages/Privacy";
// import Login from "../pages/Auth/Login";
// import SignUp from "../pages/Auth/SignUp";
// import ForgotPassword from "../pages/Auth/ForgotPassword";
// import NewPassword from "../pages/Auth/NewPassword";
// import VerifyOTP from "../pages/Auth/VerifyOTP";
// import MyProfile from "../pages/MyProfile/MyProfile";
// import MySubscriptions from "../pages/MyProfile/MySubscriptions";
// import MyTokens from "../pages/MyProfile/MyTokens";
// import AuthRoute from "./AuthRoute";
// import PrivateRoutes from "./PrivateRoutes";

// const PublicRoutes = () => {
//   return (
//     <>
//       <HashRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* <Route element={<AuthRoute />}>
//             <Route path="/sign-in" element={<Login />} />
//             <Route path="/sign-up" element={<SignUp />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/new-password" element={<NewPassword />} />
//             <Route path="/verify-otp" element={<VerifyOTP />} />
//           </Route>
//           <Route element={<PrivateRoutes />}>
//             <Route path="/about" element={<About />} />
//             <Route path="/contact-us" element={<ContactUs />} />
//             <Route path="/relics" element={<Relics />} />
//             <Route path="/vaults" element={<Vaults />} />
//             <Route path="/token" element={<Tokens />} />
//             <Route path="/path" element={<Paths />} />
//             <Route path="/video" element={<Videos />} />
//             <Route path="/photos" element={<Photos />} />
//             <Route path="/terms-conditions" element={<Terms />} />
//             <Route path="/privacy-policy" element={<Privacy />} />

//             <Route path="/my-profile" element={<MyProfile />} />
//             <Route path="/my-subscription" element={<MySubscriptions />} />
//             <Route path="/my-tokens" element={<MyTokens />} /> */}
//           {/* </Route> */}
//           <AuthRoute>
//             <Route path="/sign-in" element={<Login />} />
//             <Route path="/sign-up" element={<SignUp />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/new-password" element={<NewPassword />} />
//             <Route path="/verify-otp" element={<VerifyOTP />} />
//           </AuthRoute>

//           <PrivateRoutes>
//             <Route path="/about" element={<About />} />
//             <Route path="/contact-us" element={<ContactUs />} />
//             <Route path="/relics" element={<Relics />} />
//             <Route path="/vaults" element={<Vaults />} />
//             <Route path="/token" element={<Tokens />} />
//             <Route path="/path" element={<Paths />} />
//             <Route path="/video" element={<Videos />} />
//             <Route path="/photos" element={<Photos />} />

//             <Route path="/my-profile" element={<MyProfile />} />
//             <Route path="/my-subscription" element={<MySubscriptions />} />
//             <Route path="/my-tokens" element={<MyTokens />} />
//           </PrivateRoutes>

//           {/* Public Always */}
//           <Route path="/terms-conditions" element={<Terms />} />
//           <Route path="/privacy-policy" element={<Privacy />} />
//         </Routes>
//       </HashRouter>
//     </>
//   );
// };

// export default PublicRoutes;

import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Relics from "../pages/Relics";
import Vaults from "../pages/Vaults";
import Tokens from "../pages/Tokens";
import Paths from "../pages/Paths";
import Videos from "../pages/Videos";
import Photos from "../pages/Photos";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import NewPassword from "../pages/Auth/NewPassword";
import VerifyOTP from "../pages/Auth/VerifyOTP";
import MyProfile from "../pages/MyProfile/MyProfile";
import MySubscriptions from "../pages/MyProfile/MySubscriptions";
import MyTokens from "../pages/MyProfile/MyTokens";
import AuthRoute from "./AuthRoute";
import PrivateRoutes from "./PrivateRoutes";
import VerifyPasswordOTP from "../pages/Auth/VerifyPasswordOTP";
import ChangePassword from "../pages/MyProfile/ChangePassword";
import LiveStreamList from "../pages/LiveStream/LiveStreamList";
import QrScan from "../pages/QrScan";
import ConnectXumm from "../pages/MyProfile/ConnectXumm";
import Courses from "../pages/Courses/Courses";
import CoursesDetail from "../pages/Courses/CoursesDetail";
import Chapter from "../pages/Courses/Chapter";
import LiveStreamDetail from "../pages/LiveStream/LiveStreamDetail";
import Subcriptions from "../pages/Subcriptions/Subcriptions";
import Payment from "../pages/MyProfile/Payment";
import MyCourses from "../pages/MyProfile/MyCourses";

const PublicRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Always public */}
        <Route path="/" element={<Home />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/relics" element={<Relics />} />
        <Route path="/vaults" element={<Vaults />} />
        <Route path="/token" element={<Tokens />} />
        <Route path="/path" element={<Paths />} />
        <Route path="/video" element={<Videos />} />
        <Route path="/photos" element={<Photos />} />

        <Route path="/subscription" element={<Subcriptions />} />
        {/* Auth-only (when NOT logged in) */}
        <Route element={<AuthRoute />}>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/verify-password-otp" element={<VerifyPasswordOTP />} />
        </Route>

        {/* Private-only (when logged in) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/connect-xumm" element={<ConnectXumm />} />
          <Route path="/live-stream" element={<LiveStreamList />} />
          <Route
            path="/live-stream-detail/:id"
            element={<LiveStreamDetail />}
          />
          {/* User profile pages */}
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/my-subscription" element={<MySubscriptions />} />
          <Route path="/my-tokens" element={<MyTokens />} />
          <Route path="/payment-history" element={<Payment />} />
          <Route path="/my-courses" element={<MyCourses />} />
          {/* course starts here */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/course-detail/:id" element={<CoursesDetail />} />
          <Route path="/chapter/:id" element={<Chapter />} />
          {/* courses ends here  */}
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default PublicRoutes;
