import React from "react";
import { Col, Row, Container, Button } from "reactstrap";

import main from "../assets/images/main.png";
import Lottie from "react-lottie";

import Team from "assets/animation/Team.json";

const LandingView = () => {
   const height = window.innerHeight;
   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Team,
   };

   return (
      <div>
         <Row
            style={{
               height: height,
               width: "100%",
            }}
         >
            <Col
               lg="6"
               xs="6"
               style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
               }}
            >
               <h1>춘천연합공모전동아리</h1>
            </Col>
            <Col lg="6" xs="6">
               <Lottie options={defaultOptions} height="100%" />
            </Col>
         </Row>
         <hr />
      </div>
   );
};

export default LandingView;
