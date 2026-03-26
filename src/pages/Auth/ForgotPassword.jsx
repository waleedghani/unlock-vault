import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CommonInputField from "../../components/CommonInputField/CommonInputField";
import { useForgetPasswordMutation } from "../../redux/services/AuthServices";
import { checkEmailValidation } from "../../helper/HelperValidation";
import Alert from "../../components/Alert/Alert";
import { BeatLoader } from "react-spinners";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgetPassword, response] = useForgetPasswordMutation();
  const [formErrors, setFormErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkEmailValidation(email, setFormErrors)) {
      let data = new FormData();
      data.append("email", email);
      forgetPassword(data);
    }
    // navigate("/new-password");
  };
  useEffect(() => {
    console.log(response);
    if (response?.isSuccess) {
      localStorage.setItem("email", email);
      Alert({
        title: "Success",
        text: response?.data?.message,
      });
      navigate("/verify-password-otp", {
        state: {
          email: email,
        },
      });
    }
    // if (response?.isError) {
    //   console.log(response);
    //   Alert({
    //     title: "Error",
    //     text: response?.error?.data?.message,
    //     iconStyle: "error",
    //   });
    // }

    if (response?.isError) {
      const errorData = response?.error?.data;
      let errorMessage = errorData?.message || "Something went wrong";

      // If there are validation errors, pick the first one
      if (errorData?.errors && typeof errorData.errors === "object") {
        const firstError = Object.values(errorData.errors).flat()[0];
        errorMessage = firstError || errorMessage;

        // OR if you want to show all errors together
        // errorMessage = Object.values(errorData.errors).flat().join(", ");
      }

      Alert({
        title: "Error",
        text: errorMessage,
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
                      <h5 className="heading-txt">Password reset</h5>
                      <p>
                        You will receive instruction for resetting your password
                      </p>
                    </div>
                  </div>
                  <div className="auth-fields-wrapper mt-5">
                    <form action="">
                      <div className="form-group mb-4">
                        <label htmlFor="">
                          <span className="text-danger">*</span> Email
                        </label>
                        <CommonInputField
                          type="text"
                          value={email}
                          placeholder="Enter the Email"
                          onChange={(e) => setEmail(e.target.value)}
                          errors={formErrors?.email}
                        />
                      </div>
                      <div className="form-group my-3">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={response?.isLoading}
                          className="gradient-button w-100"
                        >
                          {response?.isLoading ? (
                            <BeatLoader color="#fff" size={20} />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                      <div className="form-group my-5 or-row">
                        <h6>OR</h6>
                      </div>
                      <div className="form-group my-3">
                        <div className="col-lg-6 offset-lg-3 text-center">
                          <button
                            type="button"
                            onClick={() => navigate("/sign-up")}
                            className="gradient-button w-100"
                          >
                            Sign Up
                          </button>
                        </div>
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

export default ForgotPassword;
