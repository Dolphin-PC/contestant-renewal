import { Card, Divider, Button, IconButton, Tooltip } from "@material-ui/core";
import {
  AssignmentInd,
  Chat,
  DeleteForever,
  Group,
  HighlightOff,
  KeyboardTab,
} from "@material-ui/icons";
import { DeleteTeam, SetCurrentTeam } from "actions/dbActions";
import { SET_TEAM } from "actions/types";
import { IsSupporter } from "functions/functions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TeamCardComp = (props) => {
  const { teamName, teamLog, teamMember } = props;
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);
  const user = useSelector((state) => state.user);

  const handleOnClickTeam = () => {
    dispatch(SetCurrentTeam(activity.currentSeason, teamName));
  };

  const handleOnDelteTeam = () => {
    if (
      window.prompt(
        `(주의)\n팀 삭제시, 팀 회의록 및 피드백 내용이 모두 삭제되며, 복구가 불가능합니다.\n\n[${teamName}] 팀을 삭제하시려면 [삭제] 라고 입력해주세요.`,
        ""
      ) === "삭제"
    ) {
      dispatch(DeleteTeam(activity.currentSeason, teamName));
    } else {
      alert("팀 삭제 취소");
    }
  };
  return (
    <Card className="TeamCard">
      <div className="CardHeader">
        <div className="Row Space-between vertical-center">
          <Divider style={{ width: 50, height: 10 }} />
          {IsSupporter(user) ? (
            <Tooltip title="해당 팀 삭제" placement="bottom">
              <IconButton onClick={handleOnDelteTeam}>
                <HighlightOff />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
        </div>
        <br />
        <h4>{teamName}</h4>
        <div className="Row vertical-center">
          <Chat />
          &ensp;
          {teamLog && Object.values(teamLog).length}
          &emsp;
          <Group />
          &ensp;
          {teamMember && Object.values(teamMember).length}
        </div>
      </div>

      <div className="CardBottom">
        <Tooltip title="참가하기" placement="right">
          <Button
            color="primary"
            variant="contained"
            onClick={handleOnClickTeam}
          >
            <KeyboardTab />
          </Button>
        </Tooltip>
      </div>
    </Card>
  );
};

TeamCardComp.defaultProps = {
  teamName: "팀 이름",
  deadLine: "2020/01/01",
  countLog: 0,
  countMember: 0,
};
export default TeamCardComp;
