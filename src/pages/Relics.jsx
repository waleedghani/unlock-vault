import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import PageHeader from "../components/PageHeader";
import PageHeading from "../components/PageHeading";
import { relics1, relics2, relics3, work1, work2, work3 } from "../constant/Index";
import { Col, Container, Row } from "react-bootstrap";

const Relics = () => {
  return (
    <>
      <Header />
      {/* page Header starts here */}
      <PageHeader>
        <PageHeading
          heading={"Relics"}
          text={
            "Lorem ipsum dolor sit amet consectetur. Augue commodo elementum augue placerat eleifend placer"
          }
        />
        {/* works starts here */}
        <section className="works-sec">
          <Container>
            <Row className="work-row-card">
              <Col lg="4" className="p-0">
                <div className="works-card-wrapper">
                  <div className="works-card-heading-wrapper">
                    <h4 className="heading-txt">Photos</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Libero arcu quam
                      ut vitae lectus sit. Diam massa amet ipsum ut nisi dui.
                      Diam faucibus faucibus risus pha
                    </p>
                  </div>
                  <div className="works-card-img-wrapper text-end">
                    <figure>
                      <img src={relics1} className="img-fluid" alt="" />
                    </figure>
                  </div>
                </div>
              </Col>
              <Col lg="4" className="p-0">
                <div className="works-card-wrapper">
                  <div className="works-card-heading-wrapper">
                    <h4 className="heading-txt">Videos</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Libero arcu quam
                      ut vitae lectus sit. Diam massa amet ipsum ut nisi dui.
                      Diam faucibus faucibus risus pha
                    </p>
                  </div>
                  <div className="works-card-img-wrapper text-end">
                    <figure>
                      <img src={relics2} className="img-fluid" alt="" />
                    </figure>
                  </div>
                </div>
              </Col>
              <Col lg="4" className="p-0">
                <div className="works-card-wrapper">
                  <div className="works-card-heading-wrapper">
                    <h4 className="heading-txt">PDF</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Libero arcu quam
                      ut vitae lectus sit. Diam massa amet ipsum ut nisi dui.
                      Diam faucibus faucibus risus pha
                    </p>
                  </div>
                  <div className="works-card-img-wrapper text-end">
                    <figure>
                      <img src={relics3} className="img-fluid" alt="" />
                    </figure>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* works ends here */}
      </PageHeader>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Relics;
