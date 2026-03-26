import React from "react";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import PageHeading from "../components/PageHeading";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import { lockIcon, playIcon, vault1 } from "../constant/Index";
import "../assets/css/video.css";
import { videosData } from "../constant/Data";
import VideoCard from "../components/VideoCard";
const Videos = () => {
  return (
    <>
      <Header />
      {/* page Header starts here */}
      <PageHeader>
        <PageHeading
          heading={"Videos"}
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
            {videosData?.map((video, i) => {
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
      <Newsletter />
      <Footer />
    </>
  );
};

export default Videos;
