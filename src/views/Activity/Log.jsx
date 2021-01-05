import { Divider } from "@material-ui/core";
import TeamCardComp from "components/TeamCardComp";
import React from "react";
import { Badge, Col, Row } from "reactstrap";

const Log = () => {
   return (
      <>
         <div className="Log">
            <h3>회의록</h3>
            <hr />
            <h5>
               Projects <Badge>10</Badge>
            </h5>
            <br />
            <Row>
               <Col lg="3" xs="12" style={{ marginBottom: 10 }}>
                  <TeamCardComp />
               </Col>
               <Col lg="3" xs="12">
                  <TeamCardComp />
               </Col>
               <Col lg="3" xs="12">
                  <TeamCardComp />
               </Col>
               <Col lg="3" xs="12">
                  <TeamCardComp />
               </Col>
               <Col lg="3" xs="12">
                  <TeamCardComp />
               </Col>
            </Row>
         </div>
      </>
   );
};

export default Log;
