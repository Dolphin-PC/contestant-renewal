import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  IconButton,
  Paper,
  Tooltip,
} from "@material-ui/core";
import {
  Add,
  ExpandMore,
  Settings,
  TrendingUpRounded,
} from "@material-ui/icons";
import { GetSchedules } from "actions/dbActions";
import AddNewAttendanceDialogComp from "components/dialogs/AddNewAttendanceDialogComp";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";

const Attend = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(GetSchedules());
  }, []);

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
            <div className="Schedule-Action-Button">
              <Tooltip title="출석인원 프리셋 만들기">
                <IconButton
                  className="Schedule-Add-Button"
                  onClick={() => setOpenDialog(TrendingUpRounded)}
                >
                  <Settings />
                </IconButton>
              </Tooltip>
              <Tooltip title="일정 추가">
                <IconButton
                  className="Schedule-Add-Button"
                  onClick={() => setOpenDialog(TrendingUpRounded)}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            </div>
            <AddNewAttendanceDialogComp
              open={openDialog}
              handleClose={() => setOpenDialog(false)}
            />
          </div>
          <hr />
          {Object.values(schedule.schedules).map((schedule) => (
            <AttendAccordion {...schedule} />
          ))}
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

const AttendAccordion = ({ scheduleName, scheduleTime }) => {
  return (
    <Accordion className="Attend-Accordion">
      <AccordionSummary expandIcon={<ExpandMore />}>
        <p>
          {scheduleTime}&ensp;{scheduleName}
        </p>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};
AttendAccordion.defaultProps = {
  scheduleName: "정기회의",
  scheduleTime: "2020-02-06T19:00",
};

export default Attend;
