import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import PageHeading from "../../components/PageHeading";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { WebLogo } from "../../constant/Index";
import CommonInputField from "../../components/CommonInputField/CommonInputField";
import { useAuthRegisterMutation } from "../../redux/services/AuthServices";
import { signUpValidation } from "../../helper/HelperValidation";
import Alert from "../../components/Alert/Alert";
import InputMask from "react-input-mask";
import { BeatLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
    const [authRegister, { data, error, isLoading, isSuccess, isError }] =
      useAuthRegisterMutation();

  const [signup, setSignUp] = useState({
    fname: "",
    lname: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formErrors, setFormErrors] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("all data ", formErrors);
    if (signUpValidation(signup, setFormErrors)) {
      let data = new FormData();
      data.append("first_name", signup?.fname);
      data.append("last_name", signup?.lname);
      data.append("email", signup?.email);
      data.append("password", signup?.password);
      data.append("password_confirmation", signup?.password_confirm);
      data.append("phone_number", signup?.phone_number);
      console.log("all data ", signup);
      authRegister(data);
    }
  };

  // useEffect(() => {
  //   console.log(response, "all done");
  //   if (response?.isSuccess) {
  //     Alert({
  //       title: "Success",
  //       text: "Account created successfully. Please verify your email by clicking the link we sent to your inbox.",
  //     });
  //     navigate("/verify-otp");
  //     // localStorage.setItem("email", user?.email);
  //     setUser({
  //       fname: "",
  //       lname: "",
  //       email: "",
  //       phone_number: "",
  //       password: "",
  //       password_confirm: "",
  //     });
  //   }
  //   if (response?.isError) {
  //     // if (
  //     //   response?.error?.data?.errors?.length === 0 &&
  //     //   response?.error?.data?.message === "Bad Request!"
  //     // ) {
  //     //   setFormErrors(response?.error?.data?.errors);
  //     // } else if (response?.error?.data?.errors?.website) {
  //     //   setFormErrors({ website: response?.error?.data?.errors?.website?.[0] });
  //     // } else if (response?.error?.data?.errors?.profile_photo) {
  //     //   setFormErrors({
  //     //     profile_photo: response?.error?.data?.errors?.profile_photo?.[0],
  //     //   });
  //     // }
  //     // if (Object.keys(response?.error?.data?.errors).length > 0) {
  //     //   const errorMessages = response?.error?.data?.errors
  //     //     ? Object.values(response.error.data.errors).flat().join("\n")
  //     //     : "An unexpected error occurred.";
  //     //   Alert({
  //     //     title: "Error",
  //     //     text: errorMessages,
  //     //     iconStyle: "error",
  //     //   });
  //     // } else {
  //     Alert({
  //       title: "Error",
  //       text: response?.error?.data?.message,
  //       iconStyle: "error",
  //     });
  //     // }
  //   }
  // }, [response]);

  useEffect(() => {
    console.log(isSuccess, data, "isSuccess");
    if (isSuccess) {
      Alert({
        title: "Success",
        text: data?.message,
      });
      localStorage.setItem("email", signup?.email);
      setSignUp({
        fname: "",
        lname: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirm: "",
      });
      navigate("/verify-otp");
    }

    // if (isError) {
    //   Alert({
    //     title: "Error",
    //     text: error?.data?.message || "Something went wrong",
    //     iconStyle: "error",
    //   });
    // }

    if (isError) {
      const validationErrors = error?.data?.errors;
      let errorMessage = error?.data?.message || "Something went wrong";

      // If there are validation errors, pick the first one (or join all)
      if (validationErrors && typeof validationErrors === "object") {
        // Example: pick first error
        const firstError = Object.values(validationErrors).flat()[0];
        errorMessage = firstError;

        // Or, if you want to show all errors combined:
        // errorMessage = Object.values(validationErrors).flat().join(", ");
      }

      Alert({
        title: "Error",
        text: errorMessage,
        iconStyle: "error",
      });
    }
  }, [isSuccess, isError, error]);

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
                    <figure>
                      <Link to="/">
                        <img src={WebLogo} className="img-fluid" alt="logo" />
                      </Link>
                    </figure>
                    <div className="logo-txt-wrapper mt-3">
                      <h5 className="heading-txt">Sign Up to get Started</h5>
                    </div>
                  </div>

                  <div className="auth-fields-wrapper mt-5">
                    <form>
                      <div className="form-group row mb-4">
                        <div className="col-lg-6">
                          <label>
                            <span className="text-danger">*</span> First Name
                          </label>
                          <CommonInputField
                            type="text"
                            className="form-control"
                            value={signup?.fname}
                            onChange={(e) =>
                              setSignUp({ ...signup, fname: e.target.value })
                            }
                            placeholder="Enter the First Name"
                            height="50px"
                            errors={
                              formErrors?.fname ? formErrors?.fname : null
                            }
                            maxLength={15}
                          />
                        </div>
                        <div className="col-lg-6">
                          {" "}
                          <label>
                            <span className="text-danger">*</span> Last Name
                          </label>
                          <CommonInputField
                            type="text"
                            className="form-control"
                            value={signup?.lname}
                            onChange={(e) =>
                              setSignUp({ ...signup, lname: e.target.value })
                            }
                            placeholder="Enter the Last Name"
                            height="50px"
                            errors={
                              formErrors?.lname ? formErrors?.lname : null
                            }
                            maxLength={15}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-4">
                        <label>
                          <span className="text-danger">*</span> Email
                        </label>
                        <CommonInputField
                          type="email"
                          className="form-control"
                          value={signup?.email}
                          onChange={(e) =>
                            setSignUp({ ...signup, email: e.target.value })
                          }
                          placeholder="Enter the Email"
                          height="50px"
                          errors={formErrors?.email ? formErrors?.email : null}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label>
                          <span className="text-danger">*</span> Phone Number
                        </label>
                        {/* <CommonInputField
                          type="text"
                          className="form-control"
                          value={signup?.phone_number}
                          onChange={(e) =>
                            setSignUp({
                              ...signup,
                              phone_number: e.target.value,
                            })
                          }
                          placeholder="123-123-1234"
                          height="50px"
                          errors={
                            formErrors?.phone_number
                              ? formErrors?.phone_number
                              : null
                          }
                        /> */}

                        <InputMask
                          value={signup?.phone_number}
                          onChange={(e) =>
                            setSignUp({
                              ...signup,
                              phone_number: e.target.value,
                            })
                          }
                          style={{ height: "50px" }}
                          mask="999-999-9999"
                          placeholder="Enter the Phone Number"
                          className={
                            formErrors?.phone_number
                              ? "border-danger form-control dashboard-input"
                              : "form-control dashboard-input"
                          }
                        />
                        {formErrors?.phone_number ? (
                          <p
                            className="error"
                            style={{
                              color: "red",
                              fontSize: "13px",
                              marginBottom: "0",
                              marginTop: "10px",
                            }}
                          >
                            {formErrors?.phone_number}
                          </p>
                        ) : null}
                      </div>
                      <div className="form-group mb-4 position-relative">
                        <label>
                          <span className="text-danger">*</span> Password
                        </label>
                        <CommonInputField
                          type={showPassword ? "text" : "password"}
                          className="form-control pe-5" // pe-5 gives padding for the eye button
                          placeholder="Enter the password"
                          height="50px"
                          value={signup?.password}
                          onChange={(e) =>
                            setSignUp({ ...signup, password: e.target.value })
                          }
                          errors={
                            formErrors?.password ? formErrors?.password : null
                          }
                        />

                        {/* Eye Icon */}
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
                        <label>
                          <span className="text-danger">*</span> Confirm
                          Password
                        </label>
                        <CommonInputField
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter the Confirm password"
                          height="50px"
                          value={signup?.password_confirm}
                          onChange={(e) =>
                            setSignUp({
                              ...signup,
                              password_confirm: e.target.value,
                            })
                          }
                          errors={
                            formErrors?.password_confirm
                              ? formErrors?.password_confirm
                              : null
                          }
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

                      <div className="form-group my-4">
                        <Link
                          className="text-secondary forgot-text text-decoration-none"
                          to="/forgot-password"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <div className="form-group my-3">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="gradient-button w-100"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <BeatLoader color="#fff" size={20} />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>

                      <div className="form-group my-3 or-row text-center">
                        <h6 className="heading-txt">OR</h6>
                      </div>

                      <div className="form-group my-3 text-center">
                        <Link to="/sign-in" className="gradient-button">
                          Login
                        </Link>
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

export default SignUp;
