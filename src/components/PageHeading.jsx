import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const PageHeading = ({ heading, text }) => {
  return (
    <>
      <section className="page-heading pt-5">
        <Container>
          <Row>
            <Col lg="3"></Col>
            <Col lg="6">
              <div className="page-heading-wrapper text-center">
                <h2 className="heading-txt">{heading}</h2>
                <p dangerouslySetInnerHTML={{ __html: text }}></p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PageHeading;
