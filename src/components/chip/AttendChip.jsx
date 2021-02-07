import { Chip } from "@material-ui/core";
import {
  Adjust,
  Done,
  SentimentSatisfied,
  SentimentVeryDissatisfied,
} from "@material-ui/icons";
import { UpdateAttend } from "actions/dbActions";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const AttendChip = ({ id, name, property, isAttend, scheduleTime }) => {
  const user = useSelector((state) => state.user);
  const schedule = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

  const handleAttend = () => {
    dispatch(UpdateAttend(scheduleTime, id));
  };

  const attendIcon = (isAttend) => {
    switch (isAttend) {
      case "not":
        return <Adjust />;
      case "attend":
        return <Done />;
      case "late":
        return <SentimentSatisfied />;
      case "absent":
        return <SentimentVeryDissatisfied />;
      default:
        return <Adjust />;
    }
  };
  return (
    <div>
      <Chip
        label={name}
        clickable
        color="primary"
        onDelete={handleAttend}
        deleteIcon={attendIcon(isAttend)}
      />
    </div>
  );
};

AttendChip.defaultProps = {
  id: "id",
  name: "홍길동",
  property: "학교/학번",
  isAttend: "not",
};

export default AttendChip;
