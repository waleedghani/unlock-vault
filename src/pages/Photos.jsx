import React, { useState } from "react";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import PageHeading from "../components/PageHeading";
import { Button, Col, Container, Row } from "react-bootstrap";
import { photoData, videosData } from "../constant/Data";
import VideoCard from "../components/VideoCard";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import CustomModal from "../components/CustomModal";
import { identityImg } from "../constant/Index";

const Photos = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Header />
      {/* page Header starts here */}
      <PageHeader>
        <PageHeading
          heading={"photos"}
          text={
            "Lorem ipsum dolor sit amet consectetur. Augue commodo elementum augue placerat eleifend placer"
          }
        />
        <section
          className="placeholder-sec"
          style={{ height: "500px" }}
        ></section>
      </PageHeader>
      {/* video section starts here */}
      <section className="page-video-sec">
        <Container>
          <Row className="video-row">
            {photoData?.map((video, i) => {
              return (
                <Col lg="4" className="p-0">
                  <VideoCard video={video} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      {/* video section ends here */}

      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        // title="My Reusable Modal"
      >
        <Container>
          <div className="upload-modal-wrapper">
            <div className="upload-heading-wrapper text-center">
              <h3 className="heading-txt">Identity Verification</h3>
              <p>
                Your identity will be verified using a document issued by a
                country/authority
              </p>
            </div>
            <div className="upload-flow-wrapper">
              <Row className="align-items-center">
                <Col
                  md="4"
                  className="step-title-col align-items-center text-end d-flex justify-content-end"
                >
                  <div className="step-title">
                    <h4 className="heading-txt mb-0">ID Upload</h4>
                  </div>
                  <div className="vertical-line" />
                </Col>

                <Col md="4">
                  <div className="step-box d-flex align-items-center gap-3 ">
                    <div className="step-number">
                      <h5 className="heading-txt mb-0">1</h5>
                    </div>
                    <div>
                      <div className="step-label">
                        <h6 className="heading-txt mb-0">Security</h6>
                      </div>
                      <div className="step-desc">
                        <p className="mb-0">Confirm your identity</p>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md="4">
                  <div className="step-box d-flex align-items-center gap-3">
                    <div className="step-number">
                      <h5 className="heading-txt mb-0">2</h5>
                    </div>
                    <div>
                      <div className="step-label">
                        <h6 className="heading-txt mb-0">Id Upload</h6>
                      </div>
                      <div className="step-desc">
                        <p className="mb-0">Confirm your identity</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="upload-img-wrapper text-center">
              <figure>
                <img src={identityImg} className="img-fluid" alt="" />
              </figure>
            </div>
            <div className="upload-submit-btn-wrapper text-center">
              <button className="gradient-button">Get Started</button>
            </div>
            <div className="upload-txt-wrapper text-center mt-3">
              <p className="mb-0">
                By proceeding, you agree to our{" "}
                <a href="#">Terms & Conditions</a> and{" "}
                <a href="#">Privacy Policy</a>
              </p>
            </div>
          </div>
        </Container>
      </CustomModal>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Photos;
