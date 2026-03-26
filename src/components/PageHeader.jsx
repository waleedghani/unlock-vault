import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { video } from "../constant/Index";
import "../assets/css/about.css";
import { useLocation } from "react-router-dom";

const PageHeader = ({ children }) => {
  
  return (
    <>
      <section className="page-header">
        <div className="page-header-bg">
          <video autoPlay loop muted playsInline className="background-video">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="page-header-content-wrapper">{children}</div>
        </div>
      </section>
    </>
  );
};

export default PageHeader;
