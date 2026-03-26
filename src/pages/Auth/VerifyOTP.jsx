import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Col, Container, Row } from "react-bootstrap";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { setUserToken } from "../../redux/reducers/AuthReducer";
import Alert from "../../components/Alert/Alert";
import {
  useResendOtpMutation,
  useVerifyAccountMutation,
} from "../../redux/services/AuthServices";
import { useDispatch } from "react-redux";
import { VerifyOtpValidation } from "../../helper/HelperValidation";
import { BeatLoader } from "react-spinners";

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const [verifyAccount, response] = useVerifyAccountMutation();
  const [resendOtp, responsed] = useResendOtpMutation();

  // ⏳ Timer state
  const [timer, setTimer] = useState(0);

  const HandleSend = () => {
    let data = new FormData();
    data.append("email", localStorage.getItem("email"));
    resendOtp(data);
    // Start 2 min countdown (120 seconds)
    setTimer(120);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (VerifyOtpValidation(otp, setFormErrors)) {
      let data = new FormData();
      data.append("email", localStorage.getItem("email"));
      data.append("otp", otp);
      verifyAccount(data);
    }
  };

  // ⏱ Countdown effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Handle "response"
  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setUserToken(response?.data?.data));
      Alert({
        title: "Success",
        text: response?.data?.message,
      });
      navigate("/");
    }

    if (response?.isError) {
      Alert({
        title: "Error",
        text: response?.error?.data?.message,
        iconStyle: "error",
      });
    }
  }, [response, dispatch, navigate]);

  // ✅ Handle "responsed"
  useEffect(() => {
    if (responsed?.isSuccess) {
      Alert({
        title: "Success",
        text: responsed?.data?.message,
      });
    }

    if (responsed?.isError) {
      Alert({
        title: "Error",
        text: responsed?.error?.data?.message,
        iconStyle: "error",
      });
    }
  }, [responsed]);

  // Helper to format timer as mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <>
      <PageHeader>
        <section className="auth-sec">
          <Container>
            <Row>
              <Col lg="2"></Col>
              <Col lg="8">
                <div className="auth-card-wrapper">
                  <div className="auth-logo-wrapper text-center">
                    <div className="logo-txt-wrapper">
                      <h5 className="heading-txt">Verify OTP</h5>
                      <p>You will receive OTP on your Email</p>
                    </div>
                  </div>
                  <div className="auth-fields-wrapper mt-5">
                    <form>
                      <div className="form-group mb-4 otp-fields-wrapper">
                        <label>
                          <span className="text-danger">*</span> Email
                        </label>
                        <OTPInput
                          value={otp}
                          inputType="number"
                          onChange={setOtp}
                          numInputs={6}
                          renderSeparator={<span>-</span>}
                          renderInput={(props) => <input {...props} />}
                        />
                        {formErrors?.otp && (
                          <p className="text-danger">{formErrors?.otp}</p>
                        )}
                      </div>
                      <div className="form-group my-3">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="gradient-button w-100"
                        >
                          {response?.isLoading ? (
                            <BeatLoader color="#fff" size={20} />
                          ) : (
                            "Submit"
                          )}
                        </button>
                        <div className="form-group my-4 text-center">
                          {timer > 0 ? (
                            <p style={{ color: "#6b00ff" }}>
                              Resend available in {formatTime(timer)}
                            </p>
                          ) : (
                            <p
                              className="text-decoration-none"
                              onClick={HandleSend}
                              style={{
                                cursor: "pointer",
                                color: "#6b00ff",
                                opacity: responsed?.isLoading && 0.7,
                              }}
                            >
                              {responsed?.isLoading
                                ? "Resending..."
                                : "Resend Otp"}
                            </p>
                          )}
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
    </>
  );
};

export default VerifyOTP;
