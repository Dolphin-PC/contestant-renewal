import { Chip } from "@material-ui/core";
import React from "react";

const AttendChip = ({ id, name, property }) => {
  return <Chip label={name} />;
};

export default AttendChip;
