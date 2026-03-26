import React from "react";
import ProfileLayout from "../../components/layout/ProfileLayout";
import { Button, Card } from "react-bootstrap";

const MySubscriptions = () => {
  return (
    <>
      <ProfileLayout type={"My Subscription"}>
        <section className="subscription-sec">
          <div className="row">
            <div className="col-lg-12">
              <div className="alert alert-danger" role="alert">
                <p className="mb-0 text-dark">
                  Your membership has expired, and access to the application is
                  currently restricted. To continue using all features, please
                  upgrade your membership.
                </p>
              </div>
              <Card className="p-4 shadow-sm">
                <h4 className="mb-3 heading-txt">Package Name</h4>

                <h5 className="text-white">Premium Plan</h5>

                <p className="mb-2 text-white">Free Trial of 14 days</p>

                <p className="mb-2 text-white">
                  Access to all premium features including advanced analytics,
                  listing highlights, and priority support.
                </p>

                <p className="mb-2 text-white">
                  <strong>Start Date of your Subscription:</strong> July 1, 2025
                </p>

                <p className="mb-2 text-white">
                  <strong>End Date of your Subscription:</strong> July 15, 2025
                </p>

                <p className="mb-2 text-danger">
                  Click Here to Buy a Paid Membership
                </p>

                <p className="text-white">
                  <strong>Price:</strong> $49.99
                </p>
                <button className="gradient-button mb-2">
                  Cancel Subscription
                </button>
                {/* Example alternate button for subscribing */}
                {/* <Button className="w-100 mt-3 mb-2 btn-primary">
                  Click Here to Subscribe to Premium Plan
                </Button> */}
                <button className="gradient-button">
                  Click Here to Subscribe to Premium Plan
                </button>
              </Card>
            </div>
          </div>
        </section>
      </ProfileLayout>
    </>
  );
};

export default MySubscriptions;
