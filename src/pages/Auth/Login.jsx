import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";
import PageHeading from "../../components/PageHeading";
import Footer from "../../components/Footer";
import { WebLogo } from "../../constant/Index";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../assets/css/login.css";
import CommonInputField from "../../components/CommonInputField/CommonInputField";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../redux/reducers/AuthReducer";
import { BeatLoader } from "react-spinners";
import Alert from "../../components/Alert/Alert";
import { useLoginMutation } from "../../redux/services/AuthServices";
import { signInValidation } from "../../helper/HelperValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authLogin, response] = useLoginMutation();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  const handleSubmit = (e) => {
    console.log(login);
    e.preventDefault();
    if (signInValidation(login, setFormErrors)) {
      let data = new FormData();
      data.append("email", login.email);
      data.append("password", login.password);
      authLogin(data);
    }
  };

  useEffect(() => {
    const remembered = JSON.parse(localStorage.getItem("rememberMeData"));
    if (remembered) {
      setLogin({
        email: remembered.email || "",
        password: remembered.password || "",
        rememberMe: true,
      });
    }
  }, []);

  useEffect(() => {
    if (response?.isSuccess) {
      console.log(response?.data?.data, "asdcjnsacj");
      dispatch(setUserToken(response?.data?.data));
      Alert({
        title: "Success",
        text: response?.data?.message,
      });
      navigate("/");
      if (login.rememberMe) {
        localStorage.setItem(
          "rememberMeData",
          JSON.stringify({ email: login.email, password: login.password })
        );
      } else {
        localStorage.removeItem("rememberMeData");
      }

      setLogin({
        email: "",
        password: "",
        rememberMe: false,
      });
    }

    if (response?.isError) {
      if (response?.error?.data?.errors?.email?.[0]) {
        Alert({
          title: "Error",
          text: response?.error?.data?.errors?.email?.[0],
          iconStyle: "error",
        });
      } else if (response?.error?.data?.errors?.[0]) {
        Alert({
          title: "Error",
          text: response?.error?.data?.errors?.[0],
          iconStyle: "error",
        });
      } else {
        Alert({
          title: "Error",
          text: response?.error?.data?.message,
          iconStyle: "error",
        });
      }
    }
  }, [response]);
  return (
    <>
      {/* <Header /> */}
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
                      <h5 className="heading-txt">Login to get Started</h5>
                    </div>
                  </div>

                  <div className="auth-fields-wrapper mt-5">
                    <form>
                      <div className="form-group mb-4">
                        <label>
                          <span className="text-danger">*</span>{" "}
                          <span>Email</span>
                        </label>
                        <CommonInputField
                          type="email"
                          className="form-control"
                          value={login?.email}
                          onChange={(e) =>
                            setLogin({ ...login, email: e.target.value })
                          }
                          errors={formErrors?.email ? formErrors?.email : null}
                          placeholder="Enter the Email"
                          height="50px"
                        />
                      </div>

                      <div className="form-group mb-4 position-relative">
                        <label>
                          <span className="text-danger">*</span>{" "}
                          <span>Password</span>
                        </label>
                        <CommonInputField
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter the password"
                          height="50px"
                          value={login?.password}
                          onChange={(e) =>
                            setLogin({ ...login, password: e.target.value })
                          }
                          errors={
                            formErrors?.password ? formErrors?.password : null
                          }
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

                      {/* <div className="form-group my-4">
                        <Link
                          className="text-secondary forgot-text text-decoration-none"
                          to="/forgot-password"
                        >
                          Forgot password?
                        </Link>
                      </div> */}
                      <div className="form-group my-3 d-flex justify-content-between align-items-center">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={login.rememberMe}
                            onChange={(e) =>
                              setLogin({
                                ...login,
                                rememberMe: e.target.checked,
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember Me
                          </label>
                        </div>
                        <Link
                          className="text-secondary forgot-text text-decoration-none"
                          to="/forgot-password"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <div className="form-group my-3">
                        <button
                          onClick={handleSubmit}
                          type="button"
                          className="gradient-button w-100"
                        >
                          {response?.isLoading ? (
                            <BeatLoader color="#fff" size={20} />
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>

                      <div className="form-group my-3 or-row text-center">
                        <h6 className="heading-txt">OR</h6>
                      </div>

                      <div className="form-group my-3 text-center">
                        <Link to="/sign-up" className="gradient-button">
                          Sign Up
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

      {/* <Footer /> */}
    </>
  );
};

export default Login;
