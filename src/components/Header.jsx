import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { WebLogo } from "../constant/Index";
import { Link, useLocation } from "react-router-dom";
import { MdGeneratingTokens, MdWindow } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert/Alert";
import { setlogoutUser } from "../redux/reducers/AuthReducer";
import { CgProfile } from "react-icons/cg";
import { IoIosContact, IoMdClose } from "react-icons/io";
import { FaBook } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userToken = useSelector((state) => state?.AuthReducer?.userToken);
  const [mobileScreen, setMobileScreen] = useState(null);
  const [open, setOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setlogoutUser());
    Alert({
      title: "success",
      text: "Logout successfully",
    });
    navigate("/");
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setMobileScreen(true);
      } else {
        setMobileScreen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <header id="top">
        <Container fluid>
          <Row>
            {/* <Col lg="1"></Col> */}
            <Col lg="12">
              <div className="header-wrapper">
                <nav
                  className={
                    !userToken
                      ? `navbar ${mobileScreen && "mobile-header"}`
                      : `navbar no-sign-in ${mobileScreen && "mobile-header"}`
                  }
                >
                  {/* <ul className="nav-left">
                    <li>
                      <a href="#" className="active">
                        <i className="icon-grid"></i> Home
                      </a>
                    </li>
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Vaults</a>
                    </li>
                    <li>
                      <a href="#">Builders</a>
                    </li>
                  </ul> */}
                  {!mobileScreen ? (
                    <ul className="nav-left">
                      <li>
                        <Link
                          to="/"
                          className={location?.pathname == "/" && "active"}
                        >
                          {location?.pathname == "/" && (
                            <MdWindow size={17} className="me-1" />
                          )}{" "}
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/about"}
                          className={location?.pathname == "/about" && "active"}
                        >
                          {location?.pathname == "/about" && (
                            <MdWindow size={17} className="me-1" />
                          )}
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/vaults"}
                          className={
                            location?.pathname == "/vaults" && "active"
                          }
                        >
                          {location?.pathname == "/vaults" && (
                            <MdWindow size={17} className="me-1" />
                          )}
                          Vaults
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/live-stream"
                          className={
                            location?.pathname == "/live-stream" && "active"
                          }
                        >
                          Builders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/courses"}
                          className={
                            location?.pathname == "/courses" && "active"
                          }
                        >
                          {location?.pathname == "/courses" && (
                            <FaBook size={17} className="me-1" />
                          )}
                          Relics
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}

                  <div className="logo-container">
                    <Link to={"/"}>
                      <img src={WebLogo} alt="Logo" className="center-logo" />
                    </Link>
                  </div>

                  {!mobileScreen ? (
                    <ul className="nav-right">
                      <li>
                        <Link
                          to={"/token"}
                          className={location?.pathname == "/token" && "active"}
                        >
                          {location?.pathname == "/token" && (
                            <MdGeneratingTokens size={17} className="me-1" />
                          )}
                          Tokens
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/path"}
                          className={location?.pathname == "/path" && "active"}
                        >
                          {location?.pathname == "/path" && (
                            <MdWindow size={17} className="me-1" />
                          )}
                          Paths
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/contact-us"}
                          className={
                            location?.pathname == "/contact-us" && "active"
                          }
                        >
                          {location?.pathname == "/contact-us" && (
                            <IoIosContact size={17} className="me-1" />
                          )}
                          Contact us
                        </Link>
                      </li>
                      {!userToken ? (
                        <li>
                          <Link
                            to={"/sign-in"}
                            className={
                              location?.pathname == "/sign-in" && "active"
                            }
                          >
                            {location?.pathname == "/sign-in" && (
                              <MdWindow size={17} className="me-1" />
                            )}
                            Sign In
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}
                      {userToken ? (
                        <>
                          <li>
                            <Link
                              to={"/my-profile"}
                              className={
                                location?.pathname == "/my-profile" && "active"
                              }
                            >
                              {location?.pathname == "/my-profile" && (
                                <CgProfile size={17} className="me-1" />
                              )}
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              // to={"/my-profile"}
                              onClick={handleLogout}
                            >
                              Logout
                              {/* <span>
                              <i className="fa fa-sign-out" aria-hidden="true"></i>
                            </span> */}
                            </Link>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                    </ul>
                  ) : (
                    <div className="toggle-wrapper">
                      <button
                        class="open-can bg-transparent border-0"
                        onClick={handleToggle}
                      >
                        <svg
                          width="26"
                          height="19"
                          viewBox="0 0 26 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="26"
                            height="3"
                            rx="1.5"
                            fill="white"
                          ></rect>
                          <rect
                            y="8"
                            width="22"
                            height="3"
                            rx="1.5"
                            fill="white"
                          ></rect>
                          <rect
                            y="16"
                            width="17"
                            height="3"
                            rx="1.5"
                            fill="white"
                          ></rect>
                        </svg>
                      </button>
                    </div>
                  )}
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
        {open && (
          <div className="off-canvas-header-wrapper">
            <div className="close-icon-wrapper">
              <button
                class="open-can bg-transparent border-0"
                onClick={handleToggle}
              >
                <IoMdClose size={40} color="#fff" />
              </button>
            </div>
            <Container>
              <Row>
                <Col lg="12">
                  <div className="off-canvas-links-wrapper">
                    <ul className="nav-links">
                      <li className="nav-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/about">About Us</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/vaults">Vaults</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/">Builders</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/courses">Relics</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/token">Tokens</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/path">Paths</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/contact-us">Contact us</Link>
                      </li>
                      {userToken ? (
                        <>
                          <li className="nav-item">
                            <Link to="/my-profile">Profile</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/">Logout</Link>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
