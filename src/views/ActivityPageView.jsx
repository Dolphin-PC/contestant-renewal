import {
  Chip,
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
import Attend from "./Activity/Attend";
import Log from "./Activity/Log";
import TeamBuilding from "./Activity/TeamBuilding";
import Lottie from "react-lottie";
import Discussion from "assets/animation/discussion.json";
import rocket from "assets/animation/rocket.json";
import { ActivityHeaderAnimation } from "assets/animation/Animations";

const ActivityPageView = () => {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);
  const user = useSelector((state) => state.user);

  const [page, setPage] = useState(0);
  const [season, setSeason] = useState(activity.currentSeason);

  // * 시즌 정보, 회원 정보 불러오기
  useEffect(() => {
    if (user.status) {
      if (activity.seasons.length === 0) {
        dispatch(GetSeasons());
      }
      if (activity.memberList.length === 0) {
        dispatch(GetMembers());
      }
    }
  }, [user.status]);

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

  const discussionAnimationOption = {
    loop: true,
    autoplay: true,
    animationData: Discussion,
  };

  // * 로그인되지 않은 상태
  if (!user.status) {
    return (
      <div>
        <StatusNotLogIn />
      </div>
    );
  }

  return (
    <div className="Activity">
      {season === "" ? (
        <div className="Center">
          <Chip color="primary" label="활동할 시즌을 선택해주세요." />
          <SeasonSelectBox
            activity={activity}
            season={season}
            onChangeSeason={onChangeSeason}
          />
          <br />
          <Lottie
            isClickToPauseDisabled={true}
            options={discussionAnimationOption}
            height={200}
          />
        </div>
      ) : (
        <div className="ActivityWrapper">
          <div className="BackgroundAnimation">
            <ActivityHeaderAnimation />
          </div>
          <div className="ActivityHeader">
            <SeasonSelectBox
              activity={activity}
              season={season}
              onChangeSeason={onChangeSeason}
            />
            <Paper elevation={3} style={{ marginTop: 10 }}>
              <Tabs
                value={page}
                onChange={handleChangePage}
                className="ActivityTabs"
              >
                <Tab label="회의록" {...a11yProps(0)} />
                <Tab label="출석부" {...a11yProps(1)} />
                {/* <Tab label="팀 빌딩(투표)" {...a11yProps(2)} /> */}
              </Tabs>
            </Paper>
          </div>

          <div className="ActivityBody">
            <Paper elevation={3} className="BodyRoot">
              <TabPanel value={page} index={0} className="TabPanel">
                <Log />
              </TabPanel>
              <TabPanel value={page} index={1} className="TabPanel">
                <Attend />
              </TabPanel>
              {/* <TabPanel value={page} index={2} className="TabPanel">
                <TeamBuilding />
              </TabPanel> */}
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

const StatusNotLogIn = () => {
  const rocketAnimationOption = {
    loop: true,
    autoplay: true,
    animationData: rocket,
  };
  return (
    <div className="Activity">
      <div className="Center">
        <Chip
          color="primary"
          label="공모자들 활동을 위해 로그인이 필요합니다."
        />
        <br />
        <Lottie
          isClickToPauseDisabled={true}
          options={rocketAnimationOption}
          height={200}
        />
      </div>
    </div>
  );
};

export default ActivityPageView;
