import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import PageHeader from "../components/PageHeader";
import PageHeading from "../components/PageHeading";
import { Col, Container, Row, Table } from "react-bootstrap";
import { functionImg, token1, vault1 } from "../constant/Index";
import { token } from "../constant/Data";
import "../assets/css/tokens.css";
import { useHomeQuery } from "../redux/services/HomeServices";
import { BeatLoader } from "react-spinners";

const Tokens = () => {
  const { data, isLoading } = useHomeQuery({ id: 4 });
  let TokenData = data?.data;
  console.log(TokenData, "TokenData");

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
        {TokenData?.sections?.map((section, i) => {
          return (
            section?.section_type?.id == 15 && (
              <PageHeading
                heading={section?.content?.section_heading}
                text={section?.content?.content}
              />
            )
          );
        })}
        {/* service starts here */}
        <section className="serv-sec">
          <Container>
            <Row className="token-row">
              {TokenData?.sections?.map((section, i) => {
                return (
                  section?.section_type?.id == 13 &&
                  section?.content?.items?.map((item, i) => {
                    return (
                      <Col key={i} lg="4" className="p-lg-0">
                        <div className="token-card-wrapper p-4">
                          <div className="token-img-wrapper">
                            <figure>
                              <img
                                src={item?.image}
                                alt={item?.image}
                                className="img-fluid"
                              />
                            </figure>
                          </div>
                          <div className="token-content-wrapper">
                            <h4 className="heading-txt">{item?.name}</h4>
                            <p>{item?.content}</p>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                );
              })}
              {/* {token?.map((v, _) => {
                return (
                  <Col key={_} lg="4" className="p-lg-0">
                    <div className="token-card-wrapper p-4">
                      <div className="token-img-wrapper">
                        <figure>
                          <img
                            src={v?.image}
                            alt={v?.image}
                            className="img-fluid"
                          />
                        </figure>
                      </div>
                      <div className="token-content-wrapper">
                        <h4 className="heading-txt">{v?.title}</h4>
                        <p>{v?.des}</p>
                      </div>
                    </div>
                  </Col>
                );
              })} */}
            </Row>
          </Container>
        </section>
        {/* service ends here */}
      </PageHeader>
      {/* Function starts here */}
      {TokenData?.sections?.map((section, i) => {
        return (
          section?.section_type?.id == 14 && (
            <section className="functions-sec">
              <Container>
                <Row className="align-items-center">
                  <Col lg="8">
                    <div className="function-content-wrapper me-lg-5">
                      <h3 className="heading-txt mb-5">
                        {section?.content?.section_heading}
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: section?.content?.content,
                        }}
                      ></p>
                    </div>
                  </Col>
                  <Col lg="4">
                    <div className="function-img-wrapper">
                      <figure>
                        <img
                          src={section?.content?.image}
                          alt=""
                          className="img-fluid w-100"
                        />
                      </figure>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          )
        );
      })}
      {/* Function ends here */}
      {/* breakdown starts here */}
      <section className="break-sec">
        <Container>
          <Row className="mb-5">
            <Col lg="2" />
            <Col lg="8">
              {TokenData?.sections?.map((section, i) => {
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
                      {TokenData?.sections?.map((section, i) => {
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
                    {TokenData?.sections?.map((section) => {
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

export default Tokens;
