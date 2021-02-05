import "date-fns";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@material-ui/core";
import { AddNewSchedule } from "actions/dbActions";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddNewAttendanceDialogComp = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [scheduleName, setScheduleName] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const handleCreate = () => {
    dispatch(AddNewSchedule(scheduleName, scheduleTime));
    handleClose();
    setScheduleName("");
    setScheduleTime("");
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <h5>새 출석 일정 만들기</h5>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>
            새로운 출석 일정을 만들어주세요.&ensp;
            <small>#정기회의</small>
          </p>
        </DialogContentText>
        <div className="Row">
          <TextField
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
            label="출석 일정 이름"
            type="text"
            placeholder="정기 회의"
            InputLabelProps={{
              shrink: true,
            }}
          />
          &emsp;
          <TextField
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            label="일정/시간 선택"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleCreate} color="primary" variant="contained">
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewAttendanceDialogComp;
