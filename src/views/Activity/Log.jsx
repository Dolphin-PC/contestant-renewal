import { Button, Divider, Select, TextField } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { SET_TEAM } from "actions/types";
import TeamCardComp from "components/TeamCardComp";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Col, Row } from "reactstrap";

const Log = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activity = useSelector((state) => state.activity);
  const [teamList, setTeamList] = useState([]);

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

  const handleToTeamList = () => {
    dispatch({
      type: SET_TEAM,
      payload: "",
    });
  };

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
        {/* <h5>
          Projects&ensp;<Badge color="primary">{teamList.length}</Badge>
        </h5> */}
        <br />
        {props.children}
      </div>
    );
  };

  // 선택된 팀이 없다면, 팀 목록 출력
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
        <Button variant="contained" color="primary" onClick={handleToTeamList}>
          <ArrowBack />
        </Button>
        <h4>팀 선택한 화면</h4>
      </Wrapper>
    );
  }
};

export default Log;
