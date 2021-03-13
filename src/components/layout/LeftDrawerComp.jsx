import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AccountCircle,
  AssignmentTurnedIn,
  Group,
  InsertInvitation,
  SupervisedUserCircle,
} from "@material-ui/icons";
import CreateTeamDialogComp from "components/dialogs/CreateTeamDialogComp";
import SeasonDialogComp from "components/dialogs/SeasonDialogComp";
import VoteDialogComp from "components/dialogs/VoteDialogComp";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LeftDrawerComp = ({ open, handleOnOpen, user, handleOnLogout }) => {
  const history = useHistory();
  return (
    <Drawer
      className="LeftDrawer"
      variant="persistent"
      anchor="left"
      open={open}
      onClose={() => handleOnOpen(false)}
    >
      <div className="LeftMenu">
        <div className="header">
          <ListItem>
            <h4>{user.userInfo.name} 님, 안녕하세요</h4>
          </ListItem>

          <Divider />
        </div>

        <div className="content">
          <List>
            <ListItem button onClick={() => history.push("/my")}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="내 정보" />
            </ListItem>
            <ListItem button onClick={() => history.push("/activity")}>
              <ListItemIcon>
                <AssignmentTurnedIn />
              </ListItemIcon>
              <ListItemText primary="활동하기" />
            </ListItem>
          </List>
          <SupporterMenu user={user} />
        </div>

        <div className="Bottom">
          <Divider />
          <Button
            color="primary"
            variant="outlined"
            fullWidth
            onClick={() => handleOnOpen(false)}
          >
            돌아가기
          </Button>
          &emsp;
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleOnLogout}
          >
            로그아웃
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

const SupporterMenu = ({ user }) => {
  const initialSettingOpen = {
    season: false,
    team: false,
    vote: false,
  };
  const [open, setOpen] = useState(initialSettingOpen);

  const handleOnMenuClick = (id) => {
    setOpen({
      ...open,
      [id]: true,
    });
  };
  const handleClose = () => {
    console.info(open);
    setOpen(initialSettingOpen);
  };

  if (user.userInfo.isSupporter) {
    return (
      <div>
        <List>
          <p>서포터즈 전용메뉴</p>

          <ListItem button onClick={() => handleOnMenuClick("season")}>
            <ListItemIcon>
              <InsertInvitation />
            </ListItemIcon>
            <ListItemText primary="시즌 추가" />
          </ListItem>
          <ListItem button onClick={() => handleOnMenuClick("team")}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="팀 생성" />
          </ListItem>
          {/* <ListItem button onClick={() => handleOnMenuClick("vote")}>
            <ListItemIcon>
              <SupervisedUserCircle />
            </ListItemIcon>
            <ListItemText primary="동아리원 관리" />
          </ListItem> */}
        </List>

        <SeasonDialogComp
          id="season"
          open={open.season}
          handleClose={handleClose}
        />
        <CreateTeamDialogComp
          id="team"
          open={open.team}
          handleClose={handleClose}
        />
        <VoteDialogComp id="vote" open={open.vote} handleClose={handleClose} />
      </div>
    );
  }
  return "";
};
export default LeftDrawerComp;
