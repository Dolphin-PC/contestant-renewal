import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  IconButton,
  Paper,
} from "@material-ui/core";
import { Add, ExpandMore } from "@material-ui/icons";
import React from "react";
import { Col } from "reactstrap";

const Attend = () => {
  return (
    <div className="Attend-tab">
      <div className="Row Attend-Schedule">
        <Col lg="4" className="Today-Attend-Schedule">
          <h5>오늘 출석 일정</h5>
          <hr />
          <AttendAccordion />
        </Col>
        <Col lg="4" className="Plan-Attend-Schedule">
          <div className="Row Space-Between Vertical-Center">
            <h5>예정 출석 일정</h5>
            <IconButton className="Schedule-Add-Button">
              <Add />
            </IconButton>
          </div>
          <hr />
          <AttendAccordion />
        </Col>
        <Col lg="4" className="Attend-Standard">
          <h5>출석 인정 기준 / 차감 점수</h5>
          <hr />
          <Paper elevation={3}>
            <div className="Standard-card">
              <Chip label="정상" className="Chip-Normal" />
              &emsp;
              <p>[출석 시간] +10분 까지</p>
            </div>
            <div className="Standard-card">
              <Chip label="지각" className="Chip-Late" />
              &emsp;
              <p>[출석 시간] +10분 이후 / -5점 차감</p>
            </div>
            <div className="Standard-card">
              <Chip label="결석" className="Chip-Absent" />
              &emsp;
              <p>[출석 시간] +20분 이후 / -10점 차감</p>
            </div>
          </Paper>
        </Col>
      </div>
    </div>
  );
};

const AttendAccordion = () => {
  return (
    <Accordion style={{ width: "100%" }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <p>2020-02-05 정기회의</p>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export default Attend;
