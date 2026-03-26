import React from "react";
import ProfileLayout from "../../components/layout/ProfileLayout";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useMyTokensQuery } from "../../redux/services/AuthServices";
import { Alert as AlertBootstrap } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
const MyTokens = () => {
  const user = useSelector((state) => state?.AuthReducer?.user);
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useMyTokensQuery();
  let AllTokensData = data?.data;
  console.log(AllTokensData, data, error, "allToken");
  const tokens = [
    // {
    //   name: "XRP",
    //   //   symbol: "BTC",
    //   total: user?.xrp_tokens,
    //   image:
    //     "https://altcoinsbox.com/wp-content/uploads/2023/01/xrp-logo-600x600.webp",
    // },
    {
      name: "A17C",
      //   symbol: "ETH",
      total: user?.a17c_tokens,
      image:
        "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
    },
    {
      name: "obisky",
      //   symbol: "SOL",
      total: user?.obisky_tokens,
      image:
        "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
    },
  ];
  const handleLinks = () => {
    navigate("/connect-xumm");
  };

  return (
    <>
      <ProfileLayout type={"My Tokens"}>
        <section className="token-sec">
          <Row>
            <Col lg="12">
              {/* <Card className="p-4 shadow-sm">
                <h4 className="mb-4 heading-txt">Tokens</h4>

                <ListGroup variant="flush">
                  {tokens.map((token, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center gap-3">
                        {token.image && (
                          <Image
                            src={token.image}
                            alt={token.name}
                            width={30}
                            height={30}
                            roundedCircle
                          />
                        )}
                        <div>
                          <strong className="text-white">{token.name}</strong>{" "}
                          {token?.symbol && (
                            <span className="text-white">
                              {"(" + token?.symbol + ")"}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="fw-semibold">
                        {token.total > 0 ? token.total : "$0000"}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card> */}
              {isLoading ? (
                <div
                  className="loading-wrapper d-flex align-items-center justify-content-center"
                  style={{ height: "40vh" }}
                >
                  <BeatLoader color="#fff" size={20} />
                </div>
              ) : AllTokensData?.tokens ? (
                <Card className="p-4 shadow-sm">
                  <h4 className="mb-4 heading-txt">Tokens</h4>

                  <ListGroup variant="flush">
                    {AllTokensData?.tokens?.map((token, index) => (
                      <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center gap-3">
                          {/* {token.image && (
                          <Image
                            src={token.image}
                            alt={token.name}
                            width={30}
                            height={30}
                            roundedCircle
                          />
                        )} */}
                          <img
                            src="https://altcoinsbox.com/wp-content/uploads/2023/01/xrp-logo-600x600.webp"
                            className="img-fluid"
                            height={30}
                            width={30}
                            alt=""
                          />
                          <div>
                            <strong className="text-white">
                              {token.currency_code}
                            </strong>{" "}
                            {token?.currency_code && (
                              <span className="text-white">
                                {"(" + token?.currency_code + ")"}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="fw-semibold">
                          {token.balance > 0 ? token.balance : "$0000"}
                        </span>
                      </ListGroup.Item>
                    ))}
                    {/* {tokens?.map((token, i) => {
                    return (
                      <ListGroup.Item
                        key={i}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center gap-3">
                          {token.image && (
                            <Image
                              src={token.image}
                              alt={token.name}
                              width={30}
                              height={30}
                              roundedCircle
                            />
                          )}

                          <div>
                            <strong className="text-white">{token.name}</strong>{" "}
                            {token?.name && (
                              <span className="text-white">
                                {"(" + token?.name + ")"}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="fw-semibold">
                          {token.total > 0 ? token.total : "$0000"}
                        </span>
                      </ListGroup.Item>
                    );
                  })} */}
                  </ListGroup>
                </Card>
              ) : (
                <AlertBootstrap
                  variant="success"
                  className="mt-3 connect-to-xumm"
                >
                  <strong className="my-3 d-block">{error?.data?.error}</strong>
                  <button
                    onClick={handleLinks}
                    className="gradient-button d-block"
                  >
                    Connect To Xumm
                  </button>
                </AlertBootstrap>
              )}
              {}
            </Col>
          </Row>
        </section>
      </ProfileLayout>
    </>
  );
};

export default MyTokens;
