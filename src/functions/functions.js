import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
// * description : 새로고침, 나가기 방지
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
  let currentDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }); // * 2020.01.01
  currentDate = currentDate
    .split(".")
    .join("-")
    .replace(/\-$/, "")
    .replace(/(\s*)/g, "");
  return currentDate;
};

export const IsSupporter = (user) => {
  // * false = No permission, true = permission
  return user.userInfo.isSupporter;
};

export const IsHavePermissionLog = (user, activity) => {
  // * false = No permission, true = permission
  const { id, isSupporter } = user.userInfo;
  const { teamMember } = activity.currentTeam;

  if (isSupporter) return true;

  if (teamMember === undefined) return false;

  if (
    Object.values(teamMember).find((member) => member.id === id) === undefined
  )
    return false;
  else {
    return true;
  }
};

export const GetTodaySchedule = (schedules) => {
  const result = Object.values(schedules).filter(
    (schedule) => schedule.scheduleTime.split("T")[0] === getCurrentDateFormat()
  );

  return result;
};

export const GetCurrentTime = () => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();

  return [hour, minute];
};

export const TranslateArrTokeyObject = (items) => {
  var result = {};

  items.map((item) => {
    Object.assign(item, { isAttend: "not" });
    var keyObj = new Object({ [item.id]: item });
    result = Object.assign(result, keyObj);
  });

  return result;
};
