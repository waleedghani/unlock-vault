import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";
import PageHeading from "../../components/PageHeading";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import { client1Img, client2Img, vault1 } from "../../constant/Index";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCoursePurchaseMutation,
  useGetCourseDetailsQuery,
} from "../../redux/services/CourseServices";
import { BeatLoader } from "react-spinners";
import Alert from "../../components/Alert/Alert";
import CustomModal from "../../components/CustomModal";
import { useLazyCheckPaymentStatusQuery } from "../../redux/services/PaymentServices";

const CoursesDetail = () => {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const { data: singleCourse, isLoading } = useGetCourseDetailsQuery(
    params?.id
  );
  const intervalRef = useRef(null);
  const [checkPaymentStatus, checkPaymentResponse] =
    useLazyCheckPaymentStatusQuery();
  const [qrImg, setQrImg] = useState(null);
  const [coursePurchase, paymentResponse] = useCoursePurchaseMutation();
  let singleData = singleCourse?.data;
  console.log(params, singleCourse, singleData, "ahscbas");

  const navigate = useNavigate();

  const handleModal = (section_id, isFree, lesson_id) => {
    console.log("Clicked section:", section_id, "Free:", isFree);

    if (Number(isFree) === 1) {
      navigate(`/chapter/${section_id}?lesson=${lesson_id}`);
    } else {
      Alert({
        iconStyle: "warning",
        title: "Subscription Required",
        text: "This lesson is available only to subscribed users. Please purchase a subscription to access this course.",
      });
    }
  };

  const handlePayment = (courseId) => {
    coursePurchase({ id: courseId });
  };
  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (paymentResponse?.isSuccess) {
      console.log(paymentResponse?.data?.data?.qr_url, "paymentResponse");
      Alert({
        title: "Success",
        text: paymentResponse?.data?.message,
        // text: "Submitted Successfully",
      });
      setQrImg(paymentResponse?.data?.data?.qr_url);
      setShowModal(true);
    }
    if (paymentResponse?.isError) {
      Alert({
        title: "Error",
        text: paymentResponse?.error?.data?.message,
        iconStyle: "error",
      });
    }
  }, [paymentResponse]);

  useEffect(() => {
    if (paymentResponse?.isSuccess) {
      intervalRef.current = setInterval(() => {
        checkPaymentStatus({ uuid: paymentResponse?.data?.data?.uuid });
      }, 10000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paymentResponse?.isSuccess]);

  useEffect(() => {
    if (checkPaymentResponse?.isSuccess) {
      const isComplete = checkPaymentResponse?.data?.status;
      console.log(isComplete, checkPaymentResponse?.data?.status, "isComplete");
      if (isComplete === "completed") {
        // Stop polling immediately
        if (intervalRef.current) clearInterval(intervalRef.current);

        Alert({
          title: "Success",
          text: "Payment Completed",
        });

        setShowModal(false); // ✅ closes modal
      }
    }
  }, [checkPaymentResponse?.isSuccess]);

  return (
    <>
      <Header />
      {/* page Header starts here */}
      <PageHeader>
        <PageHeading
          heading={singleData?.title}
          text={singleData?.short_description}
        />
        {isLoading ? (
          <div
            className="loader-wrapper d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <BeatLoader color="#6b00ff " size={20} />
          </div>
        ) : (
          <section className="course-detail-section my-5">
            <Container>
              {/* <div
                className="row"
                style={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="rounded_img">
                    <img
                      src={singleData?.thumbnail_url}
                      alt="Course"
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "327px",
                        objectFit: "cover",
                        border: "1px solid rgb(146 144 144)",
                        outlineColor: "rgba(0, 0, 0, 0.5)",
                        padding: "5px",
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="pt-3 course-heading-wrapper">
                    <h3 className="text-capitalized heading-txt">
                      {singleData?.title}
                    </h3>
                  </div>
                  <div className="py-3">
                    <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                    <span className="ms-2 rating">{singleData?.rating}</span>
                  </div>
                  <div className="col-lg-10">
                    <p className="reg-font level-8 text-white">
                      {singleData?.short_description}
                    </p>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-lg-4 setmarging">
                      <span className="reg-font level-8 text-white">Price</span>
                      <h4 className="text-uppercase text-white">
                        {Number(singleData?.price).toFixed(2) +
                          " " +
                          singleData?.currency_token?.currency_code}
                      </h4>
                    </div>
                    <div className="col-lg-12 my-3">
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              </div> */}
              <div
                className="row"
                style={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="my-0">
                    {/* <h3 className="text-capitalized heading-txt mb-3">
                      Introductory Video
                    </h3> */}
                    <div className="video-player-wrapper position-relative">
                      <video
                        src={singleData?.intro_video_url}
                        width="100%"
                        height={"400px"}
                        style={{ objectFit: "cover" }}
                        poster={singleData?.thumbnail_url}
                        controls
                      ></video>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  {/* <div className="pt-3 course-heading-wrapper">
                    <h3 className="text-capitalized heading-txt">
                      {singleData?.title}
                    </h3>
                  </div> */}
                  {/* <div className="py-3">
                    <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                    <span className="ms-2 rating">{singleData?.rating}</span>
                  </div> */}
                  <div className="col-lg-10">
                    <p className="reg-font level-8 text-white">
                      {singleData?.short_description}
                    </p>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-lg-4 setmarging">
                      <span className="reg-font level-8 text-white">Price</span>
                      <h4 className="text-uppercase text-white">
                        {Number(singleData?.price).toFixed(5) +
                          " " +
                          singleData?.currency_token?.currency_code}
                      </h4>
                    </div>
                    <div className="col-lg-12 my-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => handlePayment(singleData?.id)}
                        disabled={paymentResponse?.isLoading}
                      >
                        {paymentResponse?.isLoading ? (
                          <BeatLoader color="#fff" size={20} />
                        ) : (
                          " Buy Now"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <h3 className="text-capitalized heading-txt">Description</h3>
                <p className="reg-font level-8 dark-color text-white">
                  {singleData?.description}
                </p>
              </div>

              {singleData?.requirements > 0 && (
                <div className="my-5">
                  <h3 className="text-capitalized heading-txt">Requirements</h3>
                  <ul className="learn-list">
                    {singleData?.requirements?.map((single, i) => {
                      return (
                        <li key={i} className="text-white">
                          {single}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {/* <div className="my-5">
                <h3 className="text-capitalized heading-txt">
                  This Course Includes
                </h3>
                <div className="row mt-3">
                  {singleData?.lessons?.map((single, i) => {
                    return (
                      <div className="col-md-6 col-sm-6">
                        <p className="text-white">
                          <span className="me-3">
                            <img src="/icons/icon1.png" alt="" />
                          </span>
                          {single?.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div> */}
              {/* <div className="my-5">
                <h3 className="text-capitalized heading-txt mb-3">
                  Introductory Video
                </h3>
                <div className="video-player-wrapper position-relative">
                  <video
                    src={singleData?.intro_video_url}
                    width="100%"
                    poster={singleData?.thumbnail_url}
                    controls
                  ></video>
                </div>
              </div> */}
              {/* <div className="video_listing_sec">
                <h3 className="text-capitalized heading-txt mb-3">
                  Video Listing
                </h3>
                <div className="row">
                  {singleData?.lessons?.map((single, i) => {
                    console.log(single, "singlewejbfwe");
                    return (
                      <div className="col-md-6">
                        <div className="chapter-card-wrapper">
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleModal(single?.section_id, single?.is_free);
                            }}
                          >
                            <h6 className="semi-b-font level-6 text-uppercase text-white">
                              {single?.title}
                              {single?.is_free == 1 ? (
                                <span className="badge badge-primary ms-3">
                                  Free
                                </span>
                              ) : (
                                <span className="badge badge-secondary ms-3">
                                  Paid
                                </span>
                              )}
                            </h6>
                          </Link>

                          <p className="med-font level-7">
                            {single?.description?.length > 0
                              ? single?.description
                              : "Learn about the basics of the course."}
                          </p>
                          <span>
                            <img
                              src="/icons/video_icon.png"
                              alt=""
                              width="20"
                            />
                            <span className="med-font level-8 secondary-3 ps-2">
                              {Number(single?.video_duration).toFixed(2)}{" "}
                              Minutes
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div> */}
              <div className="learn-section py-5">
                <h3 className="text-capitalized heading-txt">
                  What You Will Learn
                </h3>
                <div className="row">
                  <div className="col-lg-12 px-lg-0">
                    <ul className="learn-list">
                      {singleData?.what_you_learn?.map((single, i) => {
                        return (
                          <li key={i} className="text-white">
                            {single}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="video_listing_sec">
                <h3 className="text-capitalized heading-txt mb-3">
                  Video Listing
                </h3>
                {singleData?.sections?.map((chapter, i) => {
                  return (
                    <>
                      <div key={i} className="row">
                        <div className="col-lg-12">
                          <div className="chapter-heading-wrapper">
                            <h4 className="text-capitalized heading-txt">
                              {chapter?.title}
                            </h4>
                          </div>
                        </div>
                        {chapter?.lessons?.map((single, i) => {
                          return (
                            <div className="col-md-6 my-3">
                              <div className="chapter-card-wrapper">
                                <Link
                                  to="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleModal(
                                      single?.section_id,
                                      single?.is_free,
                                      single?.id
                                    );
                                  }}
                                >
                                  <h6 className="semi-b-font level-6 text-uppercase text-white">
                                    {single?.title}
                                    {single?.is_free == 1 ? (
                                      <span className="badge badge-primary ms-3">
                                        Free
                                      </span>
                                    ) : (
                                      <span className="badge badge-secondary ms-3">
                                        Paid
                                      </span>
                                    )}
                                  </h6>
                                </Link>
                                <p className="med-font level-7">
                                  {single?.description?.length > 0
                                    ? single?.description
                                    : "Learn about the basics of the course."}
                                </p>
                                <span>
                                  <img
                                    src="/icons/video_icon.png"
                                    alt=""
                                    width="20"
                                  />
                                  <span className="med-font level-8 secondary-3 ps-2">
                                    {Number(single?.video_duration).toFixed(2)}{" "}
                                    Minutes
                                  </span>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </div>
              {/* <div className="my-5">
                <h3 className="text-capitalized heading-txt mb-3">
                  Featured Reviews
                </h3>
                <div className="row">
                  <div className="col-md-4">
                    <div className="feedback-card">
                      <img
                        src={client1Img}
                        alt="User"
                        className="img-fluid mb-2"
                      />
                      <h5 className="semi-b-font heading-txt">John Doe</h5>
                      <p className="reg-font level-8">
                        "Excellent course! Very detailed and well-structured."
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feedback-card">
                      <img
                        src={client2Img}
                        alt="User"
                        className="img-fluid mb-2"
                      />
                      <h5 className="semi-b-font heading-txt">Jane Smith</h5>
                      <p className="reg-font level-8">
                        "Loved the examples and the pacing of the lessons."
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </Container>
          </section>
        )}
        <CustomModal
          // show={showModal}
          // onHide={() => setShowModal(false)}
          show={showModal}
          onHide={handleClose}
          // title="My Reusable Modal"
        >
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
                  {/* {response?.isLoading ? (
                    <div className="qr-loader">
                      <BeatLoader color="#fff" size={20} />
                    </div>
                  ) : ( */}
                  <img src={qrImg} className="img-fluid" alt="" />
                  {/* )} */}
                </figure>
              </div>

              {/* <div className="upload-submit-btn-wrapper text-center">
                <button onClick={handleNext} className="gradient-button">
                  Get Started
                </button>
              </div> */}

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
      </PageHeader>
      <Footer />
    </>
  );
};

export default CoursesDetail;
