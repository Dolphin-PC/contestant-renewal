import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
} from "@material-ui/core";
import { GetMembers, GetSeasons } from "actions/dbActions";
import { SET_SEASON } from "actions/types";
import { a11yProps, TabPanel } from "functions/functions";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Attention from "./Activity/Attention";
import Log from "./Activity/Log";
import TeamBuilding from "./Activity/TeamBuilding";
import Lottie from "react-lottie";
import Discussion from "assets/animation/discussion.json";

const ActivityPageView = () => {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);

  const [page, setPage] = useState(0);
  const [season, setSeason] = useState(activity.currentSeason);

  // * 시즌 정보, 회원 정보 불러오기
  useEffect(() => {
    if (activity.seasons.length === 0) {
      dispatch(GetSeasons());
    }
    if (activity.memberList.length === 0) {
      dispatch(GetMembers());
    }
  }, []);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const onChangeSeason = (e) => {
    setSeason(e.target.value);
    dispatch({
      type: SET_SEASON,
      payload: e.target.value,
    });
  };

  const animationOption = {
    loop: true,
    autoplay: true,
    animationData: Discussion,
  };

  return (
    <div style={{ marginTop: "10%" }}>
      {season === "" ? (
        <div className="Center">
          <h5>활동할 시즌을 선택해주세요.</h5>
          <SeasonSelectBox
            activity={activity}
            season={season}
            onChangeSeason={onChangeSeason}
          />
          <br />
          <Lottie
            isClickToPauseDisabled={true}
            options={animationOption}
            height={200}
          />
        </div>
      ) : (
        <div className="ActivityWrapper">
          <SeasonSelectBox
            activity={activity}
            season={season}
            onChangeSeason={onChangeSeason}
          />

          <div style={{ marginTop: 20 }}>
            <Paper elevation={3}>
              <Tabs value={page} onChange={handleChangePage}>
                <Tab label="회의록" {...a11yProps(0)} />
                <Tab label="출석부" {...a11yProps(1)} />
                <Tab label="팀 빌딩(투표)" {...a11yProps(2)} />
              </Tabs>
            </Paper>
            <br />
            <Paper elevation={3}>
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
      )}
    </div>
  );
};

const SeasonSelectBox = ({ season, onChangeSeason, activity }) => {
  return (
    <FormControl color="primary" style={{ minWidth: 200 }}>
      <InputLabel id="season-select-label">시즌 선택</InputLabel>
      <Select
        fullWidth
        labelId="season-select-label"
        value={season}
        onChange={onChangeSeason}
      >
        {activity.seasons.map((item, index) => (
          <MenuItem key={index} value={item.seasonName}>
            <h5>{item.seasonName}</h5>
          </MenuItem>
        ))}
        1
      </Select>
    </FormControl>
  );
};

export default ActivityPageView;
