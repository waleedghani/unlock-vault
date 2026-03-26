import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import PageHeader from "../components/PageHeader";
import PageHeading from "../components/PageHeading";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  test1,
  test2,
  test3,
  test4,
  vaultbg,
  videoImg,
} from "../constant/Index";
import { partners, vaults } from "../constant/Data";
import Slider from "react-slick";
import { useHomeQuery } from "../redux/services/HomeServices";
import { BeatLoader } from "react-spinners";

const About = () => {
  const { data, isLoading } = useHomeQuery({ id: 2 });
  let HomeData = data?.data;
  console.log(HomeData, "HomeData");
  const settings = {
    dots: false,
    infinite: true, // Ensures looping with duplicates
    centerMode: true, // Helps with smooth transitions
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1, // ✅ Updated to 1
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Below 1024px
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1, // ✅ Ensuring slidesToScroll is 1
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 768, // Below 768px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 480, // Below 480px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
        },
      },
    ],
  };
  if (isLoading) {
    return (
      <>
        <div className="loading-wrapper d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
          <BeatLoader color="#fff" size={20} />
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      {/* page Header starts here */}
      <PageHeader>
        {HomeData?.sections?.map((section, i) => {
          return (
            section?.section_type?.id == 15 && (
              <PageHeading
                heading={section?.content?.section_heading}
                text={section?.content?.content}
              />
            )
          );
        })}
        {/* video starts here */}
        <section className="video-sec">
          <Container>
            <Row>
              <Col lg="12">
                <div className="video-card-wrapper position-relative">
                  <div className="video-img-wrapper">
                    <figure>
                      <img src={videoImg} className="img-fluid" alt="" />
                    </figure>
                    <div className="video-btn-wrapper d-block d-lg-none">
                      <Button className="video-btn">
                        <i className="fa-solid fa-play"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="video-content-wrapper position-absolute top-0">
                    <div className="video-testimonials-wrapper d-flex align-items-center justify-content-lg-end gap-2">
                      <div className="testimonails-list-img-wrapper">
                        <ul className="d-flex list-unstyled">
                          <li>
                            <img src={test1} className="img-fluid" alt="" />
                          </li>
                          <li>
                            <img src={test2} className="img-fluid" alt="" />
                          </li>
                          <li>
                            <img src={test3} className="img-fluid" alt="" />
                          </li>
                          <li className="test-icon">
                            <img src={test4} className="img-fluid" alt="" />
                          </li>
                        </ul>
                      </div>
                      <div className="testionails-txt-wrapper">
                        <p>32k Happy customers</p>
                      </div>
                    </div>
                    <div className="video-btn-wrapper d-none d-lg-block">
                      <Button className="video-btn">
                        <i className="fa-solid fa-play"></i>
                      </Button>
                    </div>
                    <div className="video-down-content-wrapper d-block d-lg-flex justify-content-between">
                      <h3 className="heading-txt">Relic Access Guide</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Elit orci enim
                        aliquam neque nascetur amet vivamus dictum. Nulla cras
                        scelerisque placerat et ultrices commodo in vitae.
                        Tincidunt consequat risus sit suspendisse sed volutpat
                        etiam. Tortor ullamcorper urna eget feugiat massa sed
                        non.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* video ends here */}
      </PageHeader>
      {/* page Header ends here */}
      {/* Partners starts here */}
      <section className="partners-sec mt-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={12}>
              <div className="partner-heading-wrapper text-center">
                <h4 className="mb-0 heading-txt">
                  {HomeData?.sections?.map((section, i) => {
                    return (
                      section?.section_type?.id == 2 &&
                      section?.content?.section_heading
                    );
                  })}
                </h4>
              </div>
            </Col>
            <Col lg={12} className="mt-lg-5 mt-5">
              <Slider {...settings}>
                {HomeData?.sections?.map((section, i) => {
                  return (
                    section?.section_type?.id == 2 &&
                    section?.content?.items?.map((logo, i) => {
                      return (
                        <div key={i} className="partner-logo-wrapper">
                          <img src={logo?.image} className="img-fluid" alt="" />
                        </div>
                      );
                    })
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Partners ends here */}
      {/* transform starts here */}
      <section className="transform-sec">
        <Container>
          <Row>
            <Col lg="2" />
            <Col lg="8">
              <div className="transform-text-wrapper">
                <h3 className="text-center heading-txt">
                  {HomeData?.sections?.map((section, i) => {
                    return (
                      section?.section_type?.id == 3 &&
                      section?.content?.section_heading
                    );
                  })}
                </h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* transform ends here */}
      {/* counter starts here */}
      <section className="counter-sec">
        <Container>
          <Row>
            {HomeData?.sections?.map((section, i) => {
              return (
                section?.section_type?.id == 4 &&
                section?.content?.items?.map((txt, i) => {
                  return (
                    <Col lg="3" className="p-0">
                      <div className="counter-text-wrapper text-center">
                        <h2 className="heading-txt">
                          {txt?.count + txt?.symbol}
                        </h2>
                        <p className="mb-0">{txt?.content} </p>
                      </div>
                    </Col>
                  );
                })
              );
            })}
          </Row>
        </Container>
      </section>
      {/* counter ends here */}
      {/* vault starts here */}
      {HomeData?.sections?.map((section, i) => {
        return (
          section?.section_type?.id == 7 && (
            <section className="vault-sec">
              <Container>
                <Row>
                  <Col lg="12">
                    <div className="vault-heading-wrapper text-center">
                      <h3 className="heading-txt">
                        {section?.content?.section_heading}
                      </h3>
                      <p>{section?.content?.title}</p>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-4 vault-row">
                  {section?.content?.items?.map((vault, i) => {
                    return (
                      <Col key={i} lg="4" className="p-0">
                        <div className="vault-card-wrapper">
                          <div className="vault-heading-wrapper d-flex justify-content-between">
                            <h4 className="heading-txt">{vault?.name}</h4>
                            <div className="count-wrapper">
                              <h6 className="heading-txt">{i + 1}</h6>
                            </div>
                          </div>
                          <div className="vault-content-wrapper">
                            <p className="mb-0">{vault?.content}</p>
                          </div>
                          <div className="vault-down-img-wrapper">
                            <figure>
                              <img
                                src={vault?.image}
                                className="img-fluid"
                                alt=""
                              />
                            </figure>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
                <Row className="mt-4">
                  <Col lg="1" />
                  <Col lg="10">
                    <div className="vault-last-para-wrapper text-center">
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Odio nisi et
                        quis aliquam. Adipiscing viverra lorem ligula id id.
                        Diam semper eu volutpat nascetur consectetur. Duis
                        venenatis ornare nisl nisl ornare ultrices suscipit
                        ullamcorper.ng viverra lorem ligula id ialiquam.
                        Adipiscing viverra lorem ligula id id. Diam sem
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          )
        );
      })}
      {/* vault ends here */}
      <Newsletter />
      <Footer />
    </>
  );
};

export default About;
