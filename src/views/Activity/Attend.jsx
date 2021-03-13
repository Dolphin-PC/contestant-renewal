import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Chip,
  IconButton,
  Paper,
  Tooltip,
} from "@material-ui/core";
import {
  Add,
  DeleteForever,
  ExpandMore,
  PersonAdd,
  Settings,
} from "@material-ui/icons";
import { DeleteSchedules, GetSchedules } from "actions/dbActions";
import AttendChip from "components/chip/AttendChip";
import AddNewAttendanceDialogComp from "components/dialogs/AddNewAttendanceDialogComp";
import AddNewAttendPersonDialogComp from "components/dialogs/AddNewAttendPersonDialogComp";
import { GetTodaySchedule, IsSupporter } from "functions/functions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";

const Attend = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule);
  const user = useSelector((state) => state.user);
  const [openNewAttendDialog, setOpenNewAttendDialog] = useState(false);
  const [openNewPersonDialog, setOpenNewPersonDialog] = useState(false);
  const [currentAttend, setCurrentAttend] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);

  const [isPreset, setIsPreset] = useState(false);

  const handleOpenPresetDialog = () => {
    // * 출석 인원 추가 dialog 재사용
    setIsPreset(true);
    setCurrentAttend(null);
    setOpenNewPersonDialog(true);
  };

  const handleOpenAddDialog = (schedule) => {
    setIsPreset(false);
    setCurrentAttend(schedule);
    setOpenNewPersonDialog(true);
  };

  useEffect(() => {
    dispatch(GetSchedules());
  }, []);

  useEffect(() => {
    setTodaySchedule(GetTodaySchedule(schedule.schedules));
  }, [schedule]);

  console.log(IsSupporter(user));

  return (
    <div className="Attend-tab">
      <div className="Row Attend-Schedule">
        <Col lg="4" className="Today-Attend-Schedule">
          <h5>오늘 출석 일정</h5>
          <hr />
          {todaySchedule &&
            todaySchedule.map((today, index) => {
              return <AttendAccordion {...today} today key={index} />;
            })}
        </Col>
        <Col lg="4" className="Plan-Attend-Schedule">
          <div className="Row Space-Between Vertical-Center">
            <h5>예정 출석 일정</h5>
            {IsSupporter(user) ? (
              <div className="Schedule-Action-Button">
                <Tooltip title="출석인원 프리셋 만들기">
                  <IconButton
                    className="Schedule-Add-Button"
                    onClick={handleOpenPresetDialog}
                  >
                    <Settings />
                  </IconButton>
                </Tooltip>
                <Tooltip title="일정 추가">
                  <IconButton
                    className="Schedule-Add-Button"
                    onClick={() => setOpenNewAttendDialog(true)}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              ""
            )}
            <AddNewAttendanceDialogComp
              open={openNewAttendDialog}
              handleClose={() => setOpenNewAttendDialog(false)}
            />
            <AddNewAttendPersonDialogComp
              open={openNewPersonDialog}
              handleClose={() => setOpenNewPersonDialog(false)}
              currentAttend={currentAttend}
              isPreset={isPreset}
            />
          </div>
          <hr />
          {Object.values(schedule.schedules).map((schedule, index) => (
            <AttendAccordion
              key={index}
              {...schedule}
              handleOpenAddDialog={() => handleOpenAddDialog(schedule)}
            />
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

const AttendAccordion = ({
  today,
  scheduleName,
  scheduleTime,
  scheduleAttends,
  handleOpenAddDialog,
}) => {
  const dispatch = useDispatch();
  const handleDeleteSchedule = () => {
    if (
      window.prompt("해당 일정을 삭제하시려면,\n[삭제]를 입력해주세요.") ===
      "삭제"
    ) {
      //   *삭제 이벤트 실행
      dispatch(DeleteSchedules(scheduleTime));
    }
  };
  const time = scheduleTime.split("T");

  if (today) {
    return (
      <Accordion className="Attend-Accordion">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <p>
            {time[0]}&ensp;{time[1]}&ensp;{scheduleName}
          </p>
        </AccordionSummary>
        <AccordionDetails>
          {scheduleAttends ? (
            Object.values(scheduleAttends).map((attend, index) => (
              <AttendChip {...attend} scheduleTime={scheduleTime} key={index} />
            ))
          ) : (
            <p>출석 인원을 추가해주세요.</p>
          )}
        </AccordionDetails>
      </Accordion>
    );
  } else {
    return (
      <Accordion className="Attend-Accordion">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <p>
            {time[0]}&ensp;{time[1]}&ensp;{scheduleName}
          </p>
        </AccordionSummary>
        <AccordionDetails>
          {scheduleAttends ? (
            Object.values(scheduleAttends).map((attend, index) => (
              <Chip label={attend.name} color="primary" key={index} />
            ))
          ) : (
            <p>출석 인원을 추가해주세요.</p>
          )}
        </AccordionDetails>
        <AccordionActions>
          <IconButton onClick={handleOpenAddDialog}>
            <Tooltip title="출석 인원 추가">
              <PersonAdd />
            </Tooltip>
          </IconButton>
          <IconButton onClick={handleDeleteSchedule}>
            <Tooltip title="일정 삭제">
              <DeleteForever />
            </Tooltip>
          </IconButton>
        </AccordionActions>
      </Accordion>
    );
  }
};
AttendAccordion.defaultProps = {
  scheduleName: "정기회의",
  scheduleTime: "2020-02-06T19:00",
};

export default Attend;
