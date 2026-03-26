import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import PageHeading from "../components/PageHeading";
import Newsletter from "../components/Newsletter";
import { Col, Container, Form, Row } from "react-bootstrap";
import { contactImg } from "../constant/Index";
import "../assets/css/contactus.css";
import { useContactMutation } from "../redux/services/HomeServices";
import CommonInputField from "../components/CommonInputField/CommonInputField";
import InputMask from "react-input-mask";
import { contactValidation } from "../helper/HelperValidation";
import { BeatLoader } from "react-spinners";
import Alert from "../components/Alert/Alert";
import { useHomeQuery } from "../redux/services/HomeServices";

const ContactUs = () => {
  const [Contact, response] = useContactMutation();
  const [contact, setContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState(null);

  const handleSubmit = (e) => {
    if (contactValidation(contact, setFormErrors)) {
      let data = new FormData();
      data.append("first_name", contact?.first_name);
      data.append("last_name", contact?.last_name);
      data.append("email", contact?.email);
      data.append("phone", contact?.phone);
      data.append("message", contact?.message);
      Contact({ data: data });
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
      setContact({
        first_name: "",
        last_name: "",
        message: "",
        email: "",
        phone: "",
      });
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
      <Header />
      {/* page Header starts here */}
      <PageHeader>
        <PageHeading
          heading={"Contact Us"}
          text={
            "Lorem ipsum dolor sit amet consectetur. Augue commodo elementum augue placerat eleifend placer"
          }
        />
        {/* contact starts here */}
        <section className="contact-sec">
          <Container>
            <Row>
              <Col lg="6">
                <div className="contact-img-wrapper text-center mb-lg-0 mb-5">
                  <figure>
                    <img src={contactImg} className="img-fluid" alt="" />
                  </figure>
                </div>
              </Col>
              <Col lg="6">
                <div className="contact-form-wrapper">
                  <Form>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          {/* <Form.Control type="text" /> */}
                          <CommonInputField
                            value={contact?.first_name}
                            onChange={(e) =>
                              setContact({
                                ...contact,
                                first_name: e.target.value,
                              })
                            }
                            errors={
                              formErrors?.first_name
                                ? formErrors?.first_name
                                : null
                            }
                            maxLength={15}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="firstName2">
                          <Form.Label>Last Name</Form.Label>

                          <CommonInputField
                            value={contact?.last_name}
                            onChange={(e) =>
                              setContact({
                                ...contact,
                                last_name: e.target.value,
                              })
                            }
                            errors={
                              formErrors?.last_name
                                ? formErrors?.last_name
                                : null
                            }
                            maxLength={15}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="lastName">
                          <Form.Label>Enter Email</Form.Label>

                          <CommonInputField
                            value={contact?.email}
                            type={"email"}
                            onChange={(e) =>
                              setContact({
                                ...contact,
                                email: e.target.value,
                              })
                            }
                            errors={
                              formErrors?.email ? formErrors?.email : null
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="lastName2">
                          <Form.Label>Enter PhoneNumber</Form.Label>
                          <InputMask
                            value={contact?.phone}
                            onChange={(e) =>
                              setContact({
                                ...contact,
                                phone: e.target.value,
                              })
                            }
                            style={{ height: "50px" }}
                            mask="999-999-9999"
                            // placeholder="Enter the Phone Number"
                            className={
                              formErrors?.phone
                                ? "border-danger form-control dashboard-input"
                                : "form-control dashboard-input"
                            }
                            maskChar=""
                          />
                          {formErrors?.phone ? (
                            <p
                              className="error"
                              style={{
                                color: "red",
                                fontSize: "13px",
                                marginBottom: "0",
                                marginTop: "10px",
                              }}
                            >
                              {formErrors?.phone}
                            </p>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <Form.Group controlId="email">
                          <Form.Label>Enter Message</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={contact?.message}
                            onChange={(e) =>
                              setContact({
                                ...contact,
                                message: e.target.value,
                              })
                            }
                          />
                          {formErrors?.message ? (
                            <p
                              className="error"
                              style={{
                                color: "red",
                                fontSize: "13px",
                                marginBottom: "0",
                                marginTop: "10px",
                              }}
                            >
                              {formErrors?.message}
                            </p>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <div className="contact-btn-wrapper text-end">
                          <button
                            className="gradient-button"
                            onClick={handleSubmit}
                            disabled={response?.isLoading}
                          >
                            {response?.isLoading ? (
                              <BeatLoader color="#fff" size={20} />
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* contact ends here */}
      </PageHeader>
      {/* page Header ends here */}
      <Newsletter />
      <Footer />
    </>
  );
};

export default ContactUs;
