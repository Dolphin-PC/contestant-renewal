import { Button, Chip, Tab, Tabs, Tooltip } from "@material-ui/core";
import { ViewList } from "@material-ui/icons";
import { DeleteTeamMember } from "actions/dbActions";
import { SET_LOG, SET_LOG_PAGE, SET_TEAM } from "actions/types";
import { CatBallPlayAnimation } from "assets/animation/Animations";
import AddNewLogDialogComp from "components/dialogs/AddNewLogDialogComp";
import AddNewTeamMemberDialogComp from "components/dialogs/AddNewTeamMemberDialogComp";
import TeamCardComp from "components/TeamCardComp";
import {
  a11yProps,
  IsHavePermissionLog,
  TabPanel,
  IsSupporter,
} from "functions/functions";
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

  const handleOpenDialog = (dialogName) => {
    switch (dialogName) {
      case "teamMember":
        if (IsSupporter(user)) return setOpenAddMemberDialog(true);
        else return alert("팀원 추가 권한이 없습니다.");

      case "log":
        if (IsHavePermissionLog(user, activity))
          return setOpenAddLogDialog(true);
        else return alert("회의록 작성 권한이 없습니다.");

      default:
        return;
    }
  };

  const handleCloseDialog = (dialogName) => {
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
    if (IsSupporter(user)) {
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
          <div className="notExistTeam">
            <h5>생성된 팀이 없네요... 서포터즈가 추가할 겁니다!</h5>
            <CatBallPlayAnimation height={300} />
          </div>
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
              onClick={() => handleOpenDialog("teamMember")}
            >
              팀원추가
            </Button>
            <AddNewTeamMemberDialogComp
              open={openAddMemberDialog}
              handleClose={() => handleCloseDialog("teamMember")}
              user={user}
            />
          </Col>
          <Col lg="2">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog("log")}
            >
              회의록 작성
            </Button>
            <AddNewLogDialogComp
              open={openAddLogDialog}
              handleClose={() => handleCloseDialog("log")}
              user={user}
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
        <LogVerticalTabRender activity={activity} />
      </Wrapper>
    );
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

const LogVerticalTabRender = ({ activity }) => {
  const dispatch = useDispatch();

  const handleChange = (event, newPage) => {
    dispatch({
      type: SET_LOG_PAGE,
      payload: newPage,
    });
  };

  const { teamLog } = activity.currentTeam;

  return (
    <div className="Log-VerticalTabs">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={activity.logPage}
        onChange={handleChange}
      >
        {teamLog &&
          Object.values(teamLog).map((log, index) => (
            <Tab
              label={log.logName}
              {...a11yProps(index)}
              key={index}
              className="TabButton"
            />
          ))}
      </Tabs>
      {teamLog &&
        Object.values(teamLog).map((log, i) => (
          <TabPanel value={activity.logPage} key={i} index={i} className="w1">
            <LogWrapper {...log} />
          </TabPanel>
        ))}
    </div>
  );
};

export default Log;
