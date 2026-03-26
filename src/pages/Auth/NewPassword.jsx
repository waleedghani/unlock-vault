import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Col, Container, Row } from "react-bootstrap";
import CommonInputField from "../../components/CommonInputField/CommonInputField";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/services/AuthServices";
import { PasswordValidation } from "../../helper/HelperValidation";
import { BeatLoader } from "react-spinners";
import Alert from "../../components/Alert/Alert";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const [resetPassword, response] = useResetPasswordMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (PasswordValidation(password, setFormErrors)) {
      let data = new FormData();
      data.append("email", localStorage.getItem("email"));
      data.append("otp", localStorage.getItem("otp"));
      data.append("password", password?.password);
      data.append("password_confirmation", password?.confirm_password);
      resetPassword(data);
    }
  };
  useEffect(() => {
    console.log(response);
    if (response?.isSuccess) {
      Alert({
        title: "Success",
        text: response?.data?.message,
      });
      navigate("/sign-in");
    }
    if (response?.isError) {
      console.log(response);
      Alert({
        title: "Error",
        text: response?.error?.data?.message,
        iconStyle: "error",
      });
    }
  }, [response]);
  return (
    <>
      {/* page header starts here */}
      <PageHeader>
        <section className="auth-sec">
          <Container>
            <Row>
              <Col lg="2"></Col>
              <Col lg="8">
                <div className="auth-card-wrapper">
                  <div className="auth-logo-wrapper text-center">
                    <div className="logo-txt-wrapper">
                      <h5 className="heading-txt">Set New Password</h5>
                      <p>
                        You will receive instruction for resetting your password
                      </p>
                    </div>
                  </div>
                  <div className="auth-fields-wrapper mt-5">
                    <form action="">
                      <div className="form-group mb-4 position-relative">
                        <label htmlFor="">New password</label>
                        <CommonInputField
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter the New password"
                          value={password?.password}
                          onChange={(e) =>
                            setPassword({
                              ...password,
                              password: e.target.value,
                            })
                          }
                          errors={formErrors?.password}
                        />
                        <span
                          className="position-absolute"
                          style={{
                            right: "15px",
                            top: formErrors?.password ? "50%" : "67%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#fff",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <div className="form-group mb-4 position-relative">
                        <label htmlFor="">Re-enter Password</label>
                        <CommonInputField
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter the Re-enter Password"
                          value={password?.confirm_password}
                          onChange={(e) =>
                            setPassword({
                              ...password,
                              confirm_password: e.target.value,
                            })
                          }
                          errors={formErrors?.confirm_password}
                        />
                        <span
                          className="position-absolute"
                          style={{
                            right: "15px",
                            top: formErrors?.password_confirm ? "50%" : "67%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#fff",
                          }}
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <div className="form-group mt-5">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="gradient-button w-100"
                          disabled={response?.isLoading}
                        >
                          {response?.isLoading ? (
                            <BeatLoader color="#fff" size={20} />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </PageHeader>
      {/* page header ends here */}
    </>
  );
};

export default NewPassword;
