import React, { useEffect, useRef } from "react";
import { qrImg } from "../constant/Index";
import {
  useLazyXummLoginQuery,
  useLazyXummStatusQuery,
} from "../redux/services/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../redux/reducers/AuthReducer";
import PageHeader from "../components/PageHeader";

const QrScan = () => {
  const dispatch = useDispatch();
  const [xummLogin, response] = useLazyXummLoginQuery();
  const [xummStatus, statuResponse] = useLazyXummStatusQuery();
  const intervalRef = useRef(null);
  const user = useSelector((state) => state?.AuthReducer?.user);
  const userToken = useSelector((state) => state?.AuthReducer?.userToken);

  useEffect(() => {
    xummLogin({ page_type: 0 });
  }, [xummLogin]);

  useEffect(() => {
    if (response?.isSuccess) {
      intervalRef.current = setInterval(() => {
        xummStatus({ id: user?.id });
      }, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [response?.isSuccess, xummStatus, user?.id]);

  useEffect(() => {
    console.log(statuResponse, "statuResponse");

    if (statuResponse?.isSuccess) {
      dispatch(setUserToken({ user: statuResponse?.data?.user }));

      if (statuResponse?.data?.connected === true) {
        // ✅ stop polling when connected
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        Alert({
          title: "Success",
          text: "Your Wallet has been Connected",
        });
      }
    }

    if (statuResponse?.isError) {
      Alert({
        title: "Error",
        text: statuResponse?.error?.data?.error,
        iconStyle: "error",
      });
    }
  }, [statuResponse, dispatch]);
  return (
    <>
      {/* page header starts here */}
      <PageHeader>
        <section className="auth-sec">
          <Container>
            <Row>
              <Col lg="2"></Col>
              <Col lg="8">
                <div className="auth-card-wrapper">
                  <div className="auth-logo-wrapper text-center">
                    <div className="logo-txt-wrapper">
                      <h5 className="heading-txt">Scan QR To Enter a Vault</h5>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                    </div>
                  </div>
                  <div className="auth-fields-wrapper mt-5">
                    <div className="qr-img-wrapper">
                      {response?.isLoading ? (
                        <div className="qr-loader">
                          <BeatLoader color="#fff" size={20} />
                        </div>
                      ) : (
                        <figure>
                          <img
                            src={response?.data?.qr_url}
                            className="img-fluid"
                            alt=""
                          />
                        </figure>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </PageHeader>
      {/* page header ends here */}
    </>
  );
};

export default QrScan;
