import React from "react";
import ProfileLayout from "../../components/layout/ProfileLayout";
import { Col, Row } from "react-bootstrap";
import { usePaymentHistoryQuery } from "../../redux/services/PaymentServices";

const Payment = () => {
  const { data, isLoading } = usePaymentHistoryQuery();
  console.log(data, "data4567");
  return (
    <>
      <ProfileLayout type={"Payment History"}>
        <section className="payment-history-sec">
          <Row>
            <Col lg="12">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
                soluta!
              </p>
            </Col>
          </Row>
        </section>
      </ProfileLayout>
    </>
  );
};

export default Payment;
