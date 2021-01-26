import { MenuItem, Paper, Select, Tab, Tabs } from "@material-ui/core";
import { GetSeasons } from "actions/dbActions";
import { SET_SEASON } from "actions/types";
import { a11yProps, TabPanel } from "functions/functions";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Attention from "./Activity/Attention";
import Log from "./Activity/Log";
import TeamBuilding from "./Activity/TeamBuilding";

const ActivityPageView = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const [season, setSeason] = useState("test");
  const activity = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(GetSeasons());
  }, []);

  const onChangeSeason = (e) => {
    setSeason(e.target.value);
    dispatch({
      type: SET_SEASON,
      payload: e.target.value,
    });
  };

  return (
    <div style={{ width: "95%", marginTop: "10%", marginLeft: "auto" }}>
      <Select autoWidth value={season} onChange={onChangeSeason}>
        {activity.seasons.map((item, index) => (
          <MenuItem key={index} value={item.seasonName}>
            {item.seasonName}
          </MenuItem>
        ))}
      </Select>
      <div>
        <Paper elevation={3}>
          <Tabs value={page} onChange={handleChangePage}>
            <Tab label="회의록" {...a11yProps(0)} />
            <Tab label="출석부" {...a11yProps(1)} />
            <Tab label="팀 빌딩(투표)" {...a11yProps(2)} />
          </Tabs>

          <TabPanel value={page} index={0} className="TabPanel">
            <Log />
          </TabPanel>
          <TabPanel value={page} index={1} className="TabPanel">
            <Attention />
          </TabPanel>
          <TabPanel value={page} index={2} className="TabPanel">
            <TeamBuilding />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default ActivityPageView;
