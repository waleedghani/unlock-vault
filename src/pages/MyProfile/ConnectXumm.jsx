import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useConnectWalletViaProfileMutation,
  useLazyXummLoginQuery,
  useLazyXummStatusQuery,
} from "../../redux/services/AuthServices";
import { setUserToken } from "../../redux/reducers/AuthReducer";
import ProfileLayout from "../../components/layout/ProfileLayout";
import { Col, Container, Row } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import CommonInputField from "../../components/CommonInputField/CommonInputField";
import { validateWalletAddress } from "../../helper/HelperValidation";
import Alert from "../../components/Alert/Alert";
import { Alert as AlertBootstrap } from "react-bootstrap";

const ConnectXumm = () => {
  const dispatch = useDispatch();
  const [xummLogin, response] = useLazyXummLoginQuery();
  const [xummStatus, statuResponse] = useLazyXummStatusQuery();
  const [connectWalletViaProfile, walletResponse] =
    useConnectWalletViaProfileMutation();
  const intervalRef = useRef(null);
  const [retryCount, setRetryCount] = useState(0);
  const user = useSelector((state) => state?.AuthReducer?.user);
  const userToken = useSelector((state) => state?.AuthReducer?.userToken);
  const [walletAddress, setWalletAddress] = useState("");
  const [formErrors, setFormErrors] = useState(null);

  const handleSubmit = () => {
    if (validateWalletAddress(walletAddress, setFormErrors)) {
      let data = new FormData();
      data.append("wallet_address", walletAddress);
      connectWalletViaProfile({ id: user?.id, data });
    }
  };
  useEffect(() => {
    xummLogin({ page_type: 0 });
  }, [xummLogin]);

  useEffect(() => {
    // Only start polling if login success AND xumm_payload_uuid exists as a string
    if (response?.isSuccess && typeof user?.xumm_payload_uuid === "string") {
      intervalRef.current = setInterval(() => {
        xummStatus({ id: user?.id });
      }, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [response?.isSuccess, xummStatus, user?.id, user?.xumm_payload_uuid]);

  useEffect(() => {
    console.log(statuResponse, "statuResponse");

    if (statuResponse?.isSuccess) {
      dispatch(setUserToken({ user: statuResponse?.data?.user }));

      if (statuResponse?.data?.connected === true) {
        // ✅ stop polling when connected
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        Alert({
          title: "Success",
          text: "Your Wallet has been Connected",
        });
      }
    }

    // if (statuResponse?.isError) {
    //   Alert({
    //     title: "Error",
    //     text: statuResponse?.error?.data?.error,
    //     iconStyle: "error",
    //   });
    // }
  }, [statuResponse, dispatch]);

  useEffect(() => {
    if (statuResponse?.isError && retryCount < 3) {
      let timeout = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        xummLogin({ page_type: 0 });
      }, 5000);

      if (retryCount === 0) {
        // 👈 show alert only once
        Alert({
          title: "Error",
          text: statuResponse?.error?.data?.error,
          iconStyle: "error",
        });
      }

      return () => clearTimeout(timeout);
    }
  }, [statuResponse, retryCount]);

  useEffect(() => {
    console.log(walletResponse, "walletResponse");

    if (walletResponse?.isSuccess) {
      Alert({
        title: "Success",
        text: walletResponse?.data?.message,
      });
      setWalletAddress("");
      dispatch(setUserToken({ user: walletResponse?.data?.data?.user }));
    }

    if (walletResponse?.isError) {
      const apiError = walletResponse?.error?.data?.error;
      let errorMessage =
        apiError?.message ||
        walletResponse?.error?.data?.message ||
        "Something went wrong";
      xummLogin({ page_type: 0 });
      Alert({
        title: "Error",
        text: errorMessage,
        iconStyle: "error",
      });
    }
  }, [walletResponse, dispatch]);

  return (
    <>
      <ProfileLayout type={"My Subscription"}>
        <section className="connect-xumm-sec">
          <Container>
            <Row>
              <Col lg="12">
                <div className="auth-card-wrapper">
                  <div className="auth-logo-wrapper">
                    <div className="logo-txt-wrapper">
                      <h3 className="heading-txt">Scan QR To Enter a Vault</h3>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                    </div>
                  </div>
                  {user?.wallet_connected === 1 ? (
                    <AlertBootstrap variant="success" className="mt-3">
                      <strong>Already Connected To Xaman!</strong>
                    </AlertBootstrap>
                  ) : (
                    <div className="auth-fields-wrapper mt-5">
                      <div className="qr-img-wrapper">
                        {response?.isLoading ? (
                          <div className="qr-loader">
                            <BeatLoader color="#fff" size={20} />
                          </div>
                        ) : (
                          <figure>
                            <img
                              src={response?.data?.qr_url}
                              className="img-fluid"
                              alt=""
                            />
                          </figure>
                        )}
                      </div>
                      <div className="or-wrapper my-2">
                        <h4 className="heading-txt">OR</h4>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          {" "}
                          <div className="address-input-wrapper">
                            {/* <form action=""> */}
                            <div className="form-group">
                              <CommonInputField
                                type="text"
                                className="form-control"
                                value={walletAddress}
                                onChange={(e) =>
                                  setWalletAddress(e.target.value)
                                }
                                placeholder="Enter the Wallet Address"
                                height="50px"
                                errors={
                                  formErrors?.walletAddress
                                    ? formErrors?.walletAddress
                                    : null
                                }
                                maxLength={50}
                              />
                            </div>
                            <div className="form-group my-3">
                              <button
                                type="button"
                                onClick={handleSubmit}
                                className="gradient-button w-100"
                                disabled={walletResponse?.isLoading}
                              >
                                {walletResponse?.isLoading ? (
                                  <BeatLoader color="#fff" size={20} />
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            </div>
                            {/* </form> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </ProfileLayout>
    </>
  );
};

export default ConnectXumm;
