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
    if (user.userInfo.isSupporter) {
      dispatch(UpdateAttend(scheduleTime, id, isAttend));
    }
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
  const attendClass = (isAttend) => {
    switch (isAttend) {
      case "not":
        return "MuiChip-not";
      case "attend":
        return "MuiChip-attend";
      case "late":
        return "MuiChip-late";
      case "absent":
        return "MuiChip-absent";
      default:
        return "MuiChip-default";
    }
  };

  return (
    <div>
      <Chip
        className={attendClass(isAttend)}
        label={name}
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
