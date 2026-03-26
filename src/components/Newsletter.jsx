import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { starIcon } from "../constant/Index";
import { BeatLoader } from "react-spinners";
import { useNewletterMutation } from "../redux/services/HomeServices";
import Alert from "./Alert/Alert";
import { newsletterValidation } from "../helper/HelperValidation";

const Newsletter = () => {
  const [Newletter, response] = useNewletterMutation();
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState(null);
  const handleSubmit = () => {
    if (newsletterValidation(email, setFormErrors)) {
      let data = new FormData();
      data.append("email", email);
      Newletter({ data: data });
    }
  };

  useEffect(() => {
    if (response?.isSuccess) {
      console.log(response?.data?.data, "asdcjnsacj");
      Alert({
        title: "Success",
        text: response?.data?.message,
        // text: "Submitted Successfully",
      });
      setEmail("");
    }
    if (response?.isError) {
      Alert({
        title: "Error",
        text: response?.error?.data?.message,
        iconStyle: "error",
      });
    }
  }, [response]);
  return (
    <>
      {/* newsletter starts here */}
      <section className="newsletter-sec">
        <Container>
          <Row>
            <Col lg="2" />
            <Col lg="8">
              <div className="newsletter-row-heading text-center">
                <div className="newsletter-tag-wrapper d-inline-flex gap-3 justify-content-center align-items-center mb-4">
                  <h6 className="mb-0">Newsletter</h6>
                  <img src={starIcon} className="img-fluid" alt="" />
                </div>
                <div className="newsletter-heading-wrap">
                  <h3 className="heading-txt">
                    Sign Up To Our Daily Newsletter
                  </h3>
                  <p>ces tailored to meet the unique needs of your busine</p>
                </div>
              </div>
              <div className="newsletter-fields-wrapper w-75 mx-auto">
                <Form className="d-flex justify-content-between">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email here"
                    className="me-2 bg-dark text-white border-secondary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="gradient-button"
                    type="button"
                    onClick={handleSubmit}
                    disabled={response?.isLoading}
                  >
                    {response?.isLoading ? (
                      <BeatLoader color="#fff" size={20} />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </Form>
              </div>
              {formErrors?.email ? (
                <p
                  className="error"
                  style={{
                    color: "red",
                    fontSize: "17px",
                    marginBottom: "0",
                    marginTop: "10px",
                    textAlign:"center"
                  }}
                >
                  {formErrors?.email}
                </p>
              ) : null}
            </Col>
          </Row>
        </Container>
      </section>
      {/* newsletter ends here */}
    </>
  );
};

export default Newsletter;
