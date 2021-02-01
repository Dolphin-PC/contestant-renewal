import {
  Button,
  Chip,
  Divider,
  makeStyles,
  Select,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { ArrowBack, ViewList } from "@material-ui/icons";
import { DeleteTeamMember } from "actions/dbActions";
import { SET_TEAM } from "actions/types";
import AddNewLogDialogComp from "components/dialogs/AddNewLogDialogComp";
import AddNewTeamMemberDialogComp from "components/dialogs/AddNewTeamMemberDialogComp";
import TeamCardComp from "components/TeamCardComp";
import { a11yProps, TabPanel } from "functions/functions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Col, Row } from "reactstrap";
import LogWrapper from "./LogWrapper";

const Log = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const activity = useSelector((state) => state.activity);
  const user = useSelector((state) => state.user);
  const [teamList, setTeamList] = useState([]);
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);
  const [openAddLogDialog, setOpenAddLogDialog] = useState(false);

  // 팀 리스트 불러오기
  useEffect(() => {
    if (activity.currentSeason === "") return;

    const activeTeam = activity.seasons.find((season) => {
      return season.seasonName === activity.currentSeason;
    });

    if (activeTeam.hasOwnProperty("teamList")) {
      setTeamList(Object.values(activeTeam.teamList));
    } else {
      setTeamList([]);
    }
  }, [activity.currentSeason, activity.seasons]);

  const handleClose = (dialogName) => {
    switch (dialogName) {
      case "teamMember":
        return setOpenAddMemberDialog(false);
      case "log":
        return setOpenAddLogDialog(false);
      default:
        return;
    }
  };

  const handleToTeamList = () => {
    dispatch({
      type: SET_TEAM,
      payload: "",
    });
  };

  const handleDeleteMember = (member) => {
    let teamName = activity.currentTeam.teamName;
    let currentSeason = activity.currentSeason;
    if (user.userInfo.isSupporter) {
      if (window.confirm(`[${member.name}]님을 삭제하시겠습니까?`)) {
        DeleteTeamMember(currentSeason, teamName, member);
      }
    }
  };

  // * 뒤로가기 시, 팀이 선택되어있다면 => 팀 리스트로
  window.onpopstate = () => {
    if (activity.currentTeam !== "") {
      handleToTeamList();
      history.go(1);
    }
  };

  const Wrapper = (props) => {
    return (
      <div className="Log">
        <h3>회의록</h3>
        <hr />
        {props.children}
      </div>
    );
  };

  // * 선택된 팀이 없다면, 팀 목록 출력
  if (activity.currentTeam === "") {
    return (
      <Wrapper>
        <Row>
          {teamList.map((team, index) => (
            <Col lg="3" xs="12" style={{ marginBottom: 10 }} key={index}>
              <TeamCardComp {...team} />
            </Col>
          ))}
        </Row>
        {activity.currentSeason === "" ? <h5>시즌을 선택해주세요.</h5> : ""}
        {activity.currentSeason !== "" && teamList.length === 0 ? (
          <h5>생성된 팀이 없네요... 서포터즈가 추가할 겁니다!</h5>
        ) : (
          ""
        )}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div className="fixed-r60 z1200">
          <Tooltip title="팀 목록으로" placement="left">
            <Button
              variant="contained"
              color="primary"
              onClick={handleToTeamList}
            >
              <ViewList />
            </Button>
          </Tooltip>
        </div>
        <Row>
          <Col lg="2">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleToTeamList}
            >
              <ViewList />
              &ensp;팀 목록으로
            </Button>
          </Col>
          <Col lg="2">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setOpenAddMemberDialog(true)}
            >
              팀원추가
            </Button>
            <AddNewTeamMemberDialogComp
              open={openAddMemberDialog}
              handleClose={() => handleClose("teamMember")}
            />
          </Col>
          <Col lg="2">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setOpenAddLogDialog(true)}
            >
              회의록 작성
            </Button>
            <AddNewLogDialogComp
              open={openAddLogDialog}
              handleClose={() => handleClose("log")}
            />
          </Col>
          <Col lg="6">
            <Button fullWidth variant="contained" color="primary">
              #
            </Button>
          </Col>
        </Row>
        <br />
        <h1>{activity.currentTeam.teamName}</h1>
        {activity.currentTeam.teamMember &&
          Object.values(
            activity.currentTeam.teamMember
          ).map((member, index) => (
            <Chip
              clickable
              color="primary"
              label={member.name}
              key={index}
              style={{ margin: 3 }}
              onClick={() => handleDeleteMember(member)}
            />
          ))}

        <hr />
        <LogTabRender activity={activity} />
      </Wrapper>
    );
  }
};

const LogTabRender = ({ activity }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { teamLog } = activity.currentTeam;

  return (
    <div className="Log-VerticalTabs">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
      >
        {teamLog &&
          Object.values(teamLog).map((log, i) => (
            <Tab label={log.logName} {...a11yProps(i)} key={i} />
          ))}
      </Tabs>
      {teamLog &&
        Object.values(teamLog).map((log, i) => (
          <TabPanel value={value} index={i} className="w1">
            <LogWrapper {...log} />
          </TabPanel>
        ))}
    </div>
  );
};

export default Log;
