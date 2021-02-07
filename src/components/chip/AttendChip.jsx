import { Chip, Tooltip } from "@material-ui/core";
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

  const handleAttend = useCallback(() => {
    if (user.userInfo.isSupporter) {
      dispatch(UpdateAttend(scheduleTime, id, isAttend));
    }
  });

  switch (isAttend) {
    case "not":
      return (
        <Tooltip title="미출석">
          <Chip
            className="MuiChip-not"
            label={name}
            onDelete={handleAttend}
            deleteIcon={<Adjust />}
          />
        </Tooltip>
      );
    case "attend":
      return (
        <Tooltip title="정상출석">
          <Chip
            className="MuiChip-attend"
            label={name}
            onDelete={handleAttend}
            deleteIcon={<Done />}
          />
        </Tooltip>
      );
    case "late":
      return (
        <Tooltip title="지각">
          <Chip
            className="MuiChip-late"
            label={name}
            onDelete={handleAttend}
            deleteIcon={<SentimentSatisfied />}
          />
        </Tooltip>
      );
    case "absent":
      return (
        <Tooltip title="결석">
          <Chip
            className="MuiChip-absent"
            label={name}
            onDelete={handleAttend}
            deleteIcon={<SentimentVeryDissatisfied />}
          />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title="미출석">
          <Chip
            className="MuiChip-default"
            label={name}
            onDelete={handleAttend}
            deleteIcon={<Adjust />}
          />
        </Tooltip>
      );
  }
};

AttendChip.defaultProps = {
  id: "id",
  name: "홍길동",
  property: "학교/학번",
  isAttend: "not",
};

export default AttendChip;
