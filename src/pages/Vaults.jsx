import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import PageHeader from "../components/PageHeader";
import PageHeading from "../components/PageHeading";
import { Col, Container, Row, Table } from "react-bootstrap";
import { vault1, vault2 } from "../constant/Index";
import { partners } from "../constant/Data";
import Slider from "react-slick";
import "../assets/css/vault.css";
import { useHomeQuery } from "../redux/services/HomeServices";
import { BeatLoader } from "react-spinners";

const Vaults = () => {
  const { data, isLoading } = useHomeQuery({ id: 3 });
  let VaultData = data?.data;
  console.log(VaultData, "VaultData");
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
        <div
          className="loading-wrapper d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
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
        {VaultData?.sections?.map((section, i) => {
          return (
            section?.section_type?.id == 15 && (
              <PageHeading
                heading={section?.content?.section_heading}
                text={section?.content?.content}
              />
            )
          );
        })}
        {/* vault starts here */}
        <section className="vault-sec">
          <Container>
            <Row>
              {VaultData?.sections?.map((section, i) => {
                return (
                  section?.section_type?.id == 10 &&
                  section?.content?.items?.map((item, i) => {
                    return (
                      <Col lg="6">
                        <div className="vault-img-wrapper">
                          <figure>
                            <img
                              src={item?.image}
                              className="img-fluid w-100"
                              alt=""
                            />
                          </figure>
                        </div>
                      </Col>
                    );
                  })
                );
              })}
            </Row>
          </Container>
        </section>
        {/* vault ends here */}
      </PageHeader>
      {/* Partners starts here */}
      <section className="partners-sec mt-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={12}>
              <div className="partner-heading-wrapper text-center">
                <h4 className="mb-0 heading-txt">
                  {VaultData?.sections?.map((section, i) => {
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
                {VaultData?.sections?.map((section, i) => {
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
      <section className="transform-sec vault-transform-sec">
        <Container>
          <Row>
            <Col lg="2" />
            <Col lg="8">
              {VaultData?.sections?.map((section, i) => {
                return (
                  section?.section_type?.id == 11 && (
                    <div className="transform-text-wrapper">
                      <h3 className="text-center heading-txt">
                        {section?.content?.section_heading}
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: section?.content?.content,
                        }}
                      ></p>
                    </div>
                  )
                );
              })}
            </Col>
          </Row>
        </Container>
      </section>
      {/* transform ends here */}
      {/* counter starts here */}
      <section className="counter-sec">
        <Container>
          <Row>
            {VaultData?.sections?.map((section, i) => {
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
      {/* breakdown starts here */}
      <section className="break-sec">
        <Container>
          <Row className="mb-5">
            <Col lg="2" />
            <Col lg="8">
              {VaultData?.sections?.map((section, i) => {
                return (
                  section?.section_type?.id == 12 && (
                    <div className="break-heading-wrapper text-center">
                      <h3 className="heading-txt">
                        {section?.content?.section_heading}
                      </h3>
                      <p>{section?.content?.content}</p>
                    </div>
                  )
                );
              })}
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div className="break-table-wrapper">
                <Table responsive borderless className="vault-table text-white">
                  <thead>
                    <tr>
                      {VaultData?.sections?.map((section, i) => {
                        console.log(
                          section?.section_type?.id == 12 &&
                            section?.content?.table,
                          "sdjndv"
                        );
                        return (
                          section?.section_type?.id == 12 &&
                          section?.content?.items[0]?.map((tableHead, i) => {
                            return (
                              <th>
                                <h4 className="heading-txt">{tableHead}</h4>
                              </th>
                            );
                          })
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {VaultData?.sections?.map((section) => {
                      if (section?.section_type?.id !== 12) return null;
                      return Object.entries(section?.content?.table || {}).map(
                        ([rowKey, rowValues]) => (
                          <tr key={rowKey}>
                            {rowValues.map((cell, index) => (
                              <td key={index}>
                                {index == 0 ? (
                                  <h4 className="heading-txt">{cell}</h4>
                                ) : (
                                  <p>{cell}</p>
                                )}
                              </td>
                            ))}
                          </tr>
                        )
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* breakdown ends here */}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Vaults;
