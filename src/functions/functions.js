import { Box } from "@material-ui/core";
import React from "react";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}
// * discription : 새로고침, 나가기 방지
export const usePreventLeave = () => {
  const listener = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  const onPreventLeave = () =>
    window.addEventListener("beforeunload", listener);
  const offPreventLeave = () =>
    window.removeEventListener("beforeunload", listener);

  return { onPreventLeave, offPreventLeave };
};

export const getCurrentDateFormat = () => {
  let currentDate = new Date().toLocaleDateString("ko-KR"); // * 2020.01.01
  currentDate = currentDate.split(".").join("-").replace(/\-$/g, "");
  return currentDate;
};
