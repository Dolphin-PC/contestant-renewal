import { Card, Divider, Button } from "@material-ui/core";
import { SetCurrentTeam } from "actions/dbActions";
import { SET_TEAM } from "actions/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TeamCardComp = (props) => {
  const { teamName, deadLine } = props;
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);

  const handleOnClickTeam = () => {
    dispatch(SetCurrentTeam(activity.currentSeason, teamName));
  };
  return (
    <Card
      style={{
        maxWidth: "100%",
        height: 300,
        paddingLeft: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <div>
        <Divider style={{ width: 50, height: 10 }} />
        <br />
        <h4>{teamName}</h4>
        {/* <small>~ {deadLine}</small> */}
      </div>

      <div>
        <Button color="primary" variant="contained" onClick={handleOnClickTeam}>
          입장하기
        </Button>
      </div>
    </Card>
  );
};

TeamCardComp.defaultProps = {
  teamName: "팀 이름",
  deadLine: "2020/01/01",
};
export default TeamCardComp;
