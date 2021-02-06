import { Chip } from "@material-ui/core";
import {
  Adjust,
  Done,
  SentimentSatisfied,
  SentimentVeryDissatisfied,
} from "@material-ui/icons";
import React from "react";

const AttendChip = ({ id, name, property, isAttend }) => {
  const handleAttend = () => {
    // * 출결 처리 하기
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
