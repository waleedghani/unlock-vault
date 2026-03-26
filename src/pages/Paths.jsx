import React from "react";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import PageHeading from "../components/PageHeading";
import { Col, Container, Row, Table } from "react-bootstrap";
import { functionImg, vault2 } from "../constant/Index";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useHomeQuery } from "../redux/services/HomeServices";
import { BeatLoader } from "react-spinners";
const Paths = () => {
  const { data, isLoading } = useHomeQuery({ id: 5 });
  let PathData = data?.data;
  console.log(PathData, "PathData");

  const firstSection14 = PathData?.sections?.find(
    (section) => section?.section_type?.id === 14
  );

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
        {PathData?.sections?.map((section, i) => {
          return (
            section?.section_type?.id == 15 && (
              <PageHeading
                heading={section?.content?.section_heading}
                text={section?.content?.content}
              />
            )
          );
        })}
        {/* Function starts here */}
        {firstSection14 && (
          <section className="functions-sec">
            <Container>
              <Row className="align-items-center">
                <Col lg="8">
                  <div className="function-content-wrapper me-lg-5">
                    <h3 className="heading-txt mb-5">
                      {firstSection14?.content?.section_heading}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: firstSection14?.content?.content,
                      }}
                    ></p>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="function-img-wrapper">
                    <figure>
                      <img
                        src={firstSection14?.content?.image}
                        alt=""
                        className="img-fluid w-100"
                      />
                    </figure>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        )}
        {/* Function ends here */}
      </PageHeader>
      {/* Function starts here */}
      {firstSection14 && (
        <section className="functions-sec">
          <Container>
            <Row className="align-items-center">
              <Col lg="4">
                <div className="function-img-wrapper">
                  <figure>
                    <img
                      src={firstSection14?.content?.image}
                      alt=""
                      className="img-fluid w-100"
                    />
                  </figure>
                </div>
              </Col>
              <Col lg="8">
                <div className="function-content-wrapper me-lg-5">
                  <h3 className="heading-txt mb-5">
                    {firstSection14?.content?.section_heading}
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: firstSection14?.content?.content,
                    }}
                  ></p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      {/* Function ends here */}
      {/* breakdown starts here */}
      <section className="break-sec">
        <Container>
          <Row className="mb-5">
            <Col lg="2" />
            <Col lg="8">
              {PathData?.sections?.map((section, i) => {
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
                      {PathData?.sections?.map((section, i) => {
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
                    {PathData?.sections?.map((section) => {
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

export default Paths;
