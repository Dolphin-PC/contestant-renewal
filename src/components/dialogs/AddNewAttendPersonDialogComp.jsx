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
import AttendTransferComp from "components/transfer/AttendTransferComp";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddNewAttendPersonDialogComp = ({ open, handleClose }) => {
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
        <h5>출석 인원 추가</h5>
      </DialogTitle>
      <DialogContent>
        <AttendTransferComp />
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

export default AddNewAttendPersonDialogComp;
