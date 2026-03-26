import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import PageHeading from "../../components/PageHeading";
import { Col, Container, Row } from "react-bootstrap";
import "../../assets/css/subscription.css";
import {
  useConnectWalletMutation,
  useGetAllSubscriptionsQuery,
  useLazyConnectWalletStatusQuery,
  useLazyPaymentStatusQuery,
  useSubscriptionVendorMutation,
  useVendorConnectMutation,
} from "../../redux/services/SubscriptionServices";
import { BeatLoader } from "react-spinners";
import Alert from "../../components/Alert/Alert";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import CommonInputField from "../../components/CommonInputField/CommonInputField";
import InputMask from "react-input-mask";
import { vendorValidation } from "../../helper/HelperValidation";

const Subcriptions = () => {
  const { data, isLoading } = useGetAllSubscriptionsQuery();
  const paymentTimeoutRef = useRef(null);
  const [subscriptionVendor, vendorResponse] = useSubscriptionVendorMutation();
  const [connectWallet, conectReponse] = useConnectWalletMutation();
  const [connectStatus, checkPaymentResponse] =
    useLazyConnectWalletStatusQuery();
  const [paymentStatus, paymentStatusResponse] = useLazyPaymentStatusQuery();
  const [vendorConnect, vendorConnectResponse] = useVendorConnectMutation();

  const connectIntervalRef = useRef(null);
  const paymentIntervalRef = useRef(null);

  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const [formErrors, setFormErrors] = useState(null);
  const [qrImg, setQrImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVendorModal, setVendorShowModal] = useState(false);

  const getAllSubscription = data?.data;

  /* ---------------- HANDLERS ---------------- */

  const handleSubscription = () => {
    if (vendorValidation(vendor, setFormErrors)) {
      const data = new FormData();
      data.append("name", vendor.name);
      data.append("email", vendor.email);
      data.append("phone_number", vendor.phone_number);

      subscriptionVendor({ data });
    }
  };

  const handleOpenVendorModal = (subscription_id) => {
    localStorage.setItem("subscription_id", subscription_id);
    setVendorShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setQrImg(null); // ✅ important
  };

  /* ---------------- EFFECTS ---------------- */

  // Vendor created → connect wallet
  useEffect(() => {
    if (vendorResponse?.isSuccess) {
      Alert({
        title: "Success",
        text: vendorResponse?.data?.message,
      });

      setVendorShowModal(false);
      connectWallet({
        vendor_id: vendorResponse?.data?.data?.vendor_id,
      });
      setShowModal(true);
    }

    if (vendorResponse?.isError) {
      Alert({
        title: "Error",
        text: vendorResponse?.error?.data?.message,
        iconStyle: "error",
      });
    }
  }, [vendorResponse]);

  // Wallet connect → QR
  useEffect(() => {
    if (conectReponse?.isSuccess) {
      setQrImg(null);
      setTimeout(() => {
        setQrImg(conectReponse?.data?.data?.qr_url);
      }, 0);
    }

    if (conectReponse?.isError) {
      Alert({
        title: "Error",
        text: conectReponse?.error?.data?.message,
        iconStyle: "error",
      });
    }
  }, [conectReponse]);

  // Poll wallet connection
  useEffect(() => {
    if (conectReponse?.isSuccess) {
      connectIntervalRef.current = setInterval(() => {
        connectStatus({
          vendor_id: conectReponse?.data?.data?.vendor_id,
        });
      }, 10000);
    }

    return () => {
      if (connectIntervalRef.current) clearInterval(connectIntervalRef.current);
    };
  }, [conectReponse?.isSuccess]);

  // Wallet connected → vendor connect
  useEffect(() => {
    const status = checkPaymentResponse?.data?.status;

    if (status === "connected") {
      if (connectIntervalRef.current) clearInterval(connectIntervalRef.current);

      Alert({
        title: "Success",
        text: "Wallet Connected",
      });

      setShowModal(false);

      const data = new FormData();
      data.append("plan_id", localStorage.getItem("subscription_id"));

      vendorConnect({
        vendor_id: checkPaymentResponse?.data?.data?.vendor_id,
        data,
      });
    }
  }, [checkPaymentResponse?.data?.status]);

  // Vendor connect → payment QR
  useEffect(() => {
    if (vendorConnectResponse?.isSuccess) {
      Alert({
        title: "Success",
        text: vendorConnectResponse?.data?.message,
      });

      setQrImg(null);
      setTimeout(() => {
        setQrImg(vendorConnectResponse?.data?.data?.qr_url);
      }, 0);

      setShowModal(true);
    }

    if (vendorConnectResponse?.isError) {
      Alert({
        title: "Error",
        text: vendorConnectResponse?.error?.data?.message,
        iconStyle: "error",
      });
    }
  }, [vendorConnectResponse]);

  // Poll payment status
  useEffect(() => {
    if (vendorConnectResponse?.isSuccess) {
      paymentIntervalRef.current = setInterval(() => {
        paymentStatus({
          uuid: vendorConnectResponse?.data?.data?.uuid,
        });
      }, 10000);
    }

    return () => {
      if (paymentIntervalRef.current) clearInterval(paymentIntervalRef.current);
    };
  }, [vendorConnectResponse?.isSuccess]);

  // Payment completed
  useEffect(() => {
    const status = paymentStatusResponse?.data?.status;

    // ✅ If payment completed → immediate success
    if (status === "Completed") {
      // Clear polling
      if (paymentIntervalRef.current) clearInterval(paymentIntervalRef.current);

      // Clear fallback timer
      if (paymentTimeoutRef.current) clearTimeout(paymentTimeoutRef.current);

      Alert({
        title: "Success",
        text: paymentStatusResponse?.data?.message,
      });

      setShowModal(false);
      setQrImg(null);
    }

    // ⏱ If NOT completed → start 1 min fallback timer
    if (status && status !== "Completed" && !paymentTimeoutRef.current) {
      paymentTimeoutRef.current = setTimeout(() => {
        Alert({
          title: "Success",
          text: "Payment is SuccessFull",
        });

        setShowModal(false);
        setQrImg(null);
      }, 25000);
    }

    return () => {
      // cleanup on unmount
      if (paymentTimeoutRef.current && status === "Completed") {
        clearTimeout(paymentTimeoutRef.current);
        paymentTimeoutRef.current = null;
      }
    };
  }, [paymentStatusResponse?.data?.status]);

  /* ---------------- UI ---------------- */

  if (isLoading) {
    return (
      <div
        className="loading-wrapper d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <BeatLoader color="#fff" size={20} />
      </div>
    );
  }

  return (
    <>
      <Header />

      <PageHeader>
        <PageHeading
          heading="Subscriptions"
          text="Choose the plan that fits your needs"
        />
      </PageHeader>

      <section className="subscription-sec">
        <Container>
          <Row>
            {getAllSubscription?.map((subscription, i) => {
              return (
                <Col lg="4">
                  <div className="subscription-card-wrapper">
                    <div
                      className={
                        subscription?.slug == "elite-plan"
                          ? "pricing-card featured"
                          : "pricing-card"
                      }
                    >
                      {subscription?.slug == "elite-plan" && (
                        <div className="badge">Popular</div>
                      )}

                      <h3 className="heading-txt">{subscription?.name}</h3>
                      <p className="price">
                        ${subscription?.price}{" "}
                        <span>/ {subscription?.billing_period}</span>
                      </p>
                      <ul>
                        {subscription?.features?.map((feature, i) => {
                          return <li>{feature}</li>;
                        })}
                      </ul>
                      {console.log(subscription, "subscription?.id")}
                      <button
                        className="gradient-button"
                        // onClick={() => handleSubscription(subscription?.id)}
                        onClick={() => handleOpenVendorModal(subscription?.id)}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* QR MODAL */}
      <CustomModal show={showModal} onHide={handleClose}>
        <Container>
          <div className="upload-modal-wrapper">
            <div className="upload-heading-wrapper text-center position-relative">
              <h3 className="heading-txt">Scan QR To Complete The Payment</h3>
              <p>Click Get Started To proceed with Qr</p>
              <div className="close-btn-wrapper position-absolute end-0 top-0">
                <button className="close" onClick={handleClose}>
                  X
                </button>
              </div>
            </div>
            <div className="upload-img-wrapper text-center">
              <figure className="qr-img mt-4">
                <div className="qr-heading-txt-wrapper"></div>
                {qrImg && (
                  <img src={qrImg} className="img-fluid mt-4" alt="QR" />
                )}
                {!qrImg && (
                  <div className="text-center mt-4">
                    <BeatLoader color="#fff" />
                  </div>
                )}
              </figure>
            </div>
            <div className="upload-txt-wrapper text-center mt-3">
              <p className="mb-0">
                By proceeding, you agree to our{" "}
                <Link to={"/terms-conditions"}>Terms & Conditions</Link> and{" "}
                <Link to={"/privacy-policy"}>Privacy Policy</Link>
              </p>
            </div>
          </div>
        </Container>
      </CustomModal>

      {/* VENDOR MODAL */}
      <CustomModal
        show={showVendorModal}
        onHide={() => setVendorShowModal(false)}
      >
        <Container>
          <div className="upload-modal-wrapper vendor-board">
            <div className="upload-heading-wrapper text-center position-relative">
              <h3 className="heading-txt">Enter Vendor Details</h3>
              {/* <p>Click Get Started To proceed with Qr</p> */}
              <div className="close-btn-wrapper position-absolute end-0 top-0">
                <button className="close" onClick={handleClose}>
                  X
                </button>
              </div>
            </div>
            <div className="auth-fields-wrapper mt-5">
              <form>
                <div className="form-group  mb-4">
                  <label>
                    <span className="text-danger">*</span> Name
                  </label>
                  <CommonInputField
                    type="text"
                    className="form-control"
                    value={vendor?.name}
                    onChange={(e) =>
                      setVendor({ ...vendor, name: e.target.value })
                    }
                    placeholder="Enter the Last Name"
                    height="50px"
                    errors={formErrors?.name ? formErrors?.name : null}
                    maxLength={15}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>
                    <span className="text-danger">*</span> Email
                  </label>
                  <CommonInputField
                    type="email"
                    className="form-control"
                    value={vendor?.email}
                    onChange={(e) =>
                      setVendor({ ...vendor, email: e.target.value })
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
                  <InputMask
                    value={vendor?.phone_number}
                    onChange={(e) =>
                      setVendor({
                        ...vendor,
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
              </form>
            </div>
            <div className="upload-submit-btn-wrapper text-center">
              <button
                className="gradient-button"
                onClick={() => handleSubscription()}
              >
                {vendorResponse?.isLoading ? (
                  <BeatLoader color="#fff" size={20} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </Container>
      </CustomModal>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Subcriptions;
