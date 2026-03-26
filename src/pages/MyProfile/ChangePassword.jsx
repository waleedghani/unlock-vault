import React, { useEffect, useState } from "react";
import ProfileLayout from "../../components/layout/ProfileLayout";
import CommonInputField from "../../components/CommonInputField/CommonInputField";
import { Button } from "react-bootstrap";
import { useChangeProfilePasswordMutation } from "../../redux/services/AuthServices";
import { ChangePasswordValidation } from "../../helper/HelperValidation";
import { BeatLoader } from "react-spinners";
import Alert from "../../components/Alert/Alert";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [formErrors, setFormErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
  const [changeProfilePassword, response] = useChangeProfilePasswordMutation();
  const handleSubmit = () => {
    if (ChangePasswordValidation(password, setFormErrors)) {
      let data = new FormData();
      data.append("current_password", password?.current_password);
      data.append("new_password", password?.new_password);
      data.append(
        "new_password_confirmation",
        password?.new_password_confirmation
      );
      changeProfilePassword(data);
    }
  };

  useEffect(() => {
    if (response?.isSuccess) {
      Alert({
        title: "Success",
        text: response?.data?.message,
      });
      navigate("/my-profile");
      setFormErrors(null);
      setPassword({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    }

    if (response?.isError) {
      const backendErrors = response?.error?.data?.errors;
      if (backendErrors) {
        setFormErrors(backendErrors); // <-- store backend validation errors
      }

      Alert({
        title: "Error",
        text: response?.error?.data?.message,
        iconStyle: "error",
      });
    }
  }, [response]);
  return (
    <>
      <ProfileLayout type={"My Profile"}>
        <div className="row">
          <div className="col-lg-6 col">
            <h2 className="mt-3 mb-0 heading-txt text-uppercase">My Profile</h2>
            <p>Nunc pellentesque libero et lore</p>
          </div>
        </div>

        <div className="row profile-row">
          <div className="col-md-4 my-md-4 my-2 info position-relative">
            <p className="m-0 secondary-regular-font dark-color label level-5">
              Current password
            </p>
            <CommonInputField
              type={showPassword ? "text" : "password"}
              value={password?.current_password}
              onChange={(e) =>
                setPassword({ ...password, current_password: e.target.value })
              }
              placeholder={"Current password"}
              errors={
                formErrors?.current_password
                  ? formErrors?.current_password
                  : null
              }
            />
            <span
              className="position-absolute"
              style={{
                right: "25px",
                top: "60%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#fff",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="col-md-4 my-md-4 my-2 info position-relative">
            <p className="m-0 secondary-regular-font dark-color label level-5">
              New password
            </p>

            <CommonInputField
              type={showConfirmPassword ? "text" : "password"}
              value={password?.new_password}
              onChange={(e) =>
                setPassword({ ...password, new_password: e.target.value })
              }
              placeholder={"New password"}
              errors={
                formErrors?.new_password ? formErrors?.new_password : null
              }
            />
            <span
              className="position-absolute"
              style={{
                right: "25px",
                top: "60%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#fff",
              }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="col-md-4 my-md-4 my-2 info position-relative">
            <p className="m-0 secondary-regular-font dark-color label level-5">
              New Password Confirmation
            </p>

            <CommonInputField
              type={showNewConfirmPassword ? "text" : "password"}
              value={password?.new_password_confirmation}
              onChange={(e) =>
                setPassword({
                  ...password,
                  new_password_confirmation: e.target.value,
                })
              }
              placeholder={"New Password Confirmation"}
              errors={
                formErrors?.new_password_confirmation
                  ? formErrors?.new_password_confirmation
                  : null
              }
            />
            <span
              className="position-absolute"
              style={{
                right: "25px",
                top: "60%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#fff",
              }}
              onClick={() => setShowNewConfirmPassword(!showNewConfirmPassword)}
            >
              {showNewConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="d-flex profile-row flex-column flex-md-row align-items-start align-items-md-center my-md-3 my-2">
          <div className="info col-md-6">
            <Button
              onClick={handleSubmit}
              disabled={response?.isLoading}
              className="gradient-button"
            >
              {response?.isLoading ? (
                <BeatLoader color="#fff" size={20} />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
};

export default ChangePassword;
