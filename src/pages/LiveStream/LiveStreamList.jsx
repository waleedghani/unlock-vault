import React, { useEffect } from "react";
import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";
import PageHeading from "../../components/PageHeading";
import { Col, Container, Row } from "react-bootstrap";
import { streamData, videosData } from "../../constant/Data";
import VideoCard from "../../components/VideoCard";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { useGetAllLiveStreamsQuery } from "../../redux/services/LiveStreamServices";
import StreamCard from "../../components/StreamCard";
import { Link, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const LiveStreamList = () => {
  const location = useLocation();
  const {
    data: liveStream,
    isLoading,
    refetch,
  } = useGetAllLiveStreamsQuery();
  
  let allStream = liveStream?.data;

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <>
      <Header />
      {/* page Header starts here */}
      <PageHeader>
        <PageHeading
          heading={"Live Stream"}
          text={
            "Lorem ipsum dolor sit amet consectetur. Augue commodo elementum augue placerat eleifend placer"
          }
        />
        <section
          className="placeholder-sec"
          style={{ height: "100px" }}
        ></section>
      </PageHeader>
      {/* video section starts here */}
      <section
        className="page-video-sec pt-5"
        style={{ marginTop: location?.pathname == "/live-stream" && "0px" }}
      >
        <Container>
          <Row className="video-row">
            {isLoading ? (
              <div
                className="loader-wrapper d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
              >
                <BeatLoader color="#6b00ff" size={20} />
              </div>
            ) : allStream?.length > 0 ? (
              allStream?.map((video, i) => {
                return (
                  <Col lg="4">
                    <Link
                      to={`/live-stream-detail/${video?.id}`}
                      onClick={() => {
                        localStorage.setItem("host_type", video?.host_type);
                      }}
                    >
                      <StreamCard video={video} />
                    </Link>
                  </Col>
                );
              })
            ) : (
              <div className="live-stream-wrap">
                <h2 className="text-center heading-txt">No Stream Available</h2>
              </div>
            )}
          </Row>
        </Container>
      </section>
      {/* video section ends here */}
      <Newsletter />
      <Footer />
    </>
  );
};

export default LiveStreamList;
