import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import { AddNewLog } from "actions/dbActions";
import { getCurrentDateFormat } from "functions/functions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddNewLogDialogComp = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);
  const currentDate = getCurrentDateFormat();

  const handleAddNewLog = async () => {
    let currentSeason = activity.currentSeason;
    let teamName = activity.currentTeam.teamName;

    dispatch(AddNewLog(currentSeason, teamName, currentDate));

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>새 회의록 추가</DialogTitle>
      <DialogContent>
        <h4>{currentDate}</h4>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleAddNewLog} color="primary" variant="contained">
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewLogDialogComp;
