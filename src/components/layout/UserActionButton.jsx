import {
  Button,
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AccountCircle,
  AssignmentTurnedIn,
  Group,
  HowToVote,
  InsertInvitation,
  Menu,
} from "@material-ui/icons";
import { Logout } from "actions/firebaseActions";
import CreateTeamDialogComp from "components/dialogs/CreateTeamDialogComp";
import SeasonDialogComp from "components/dialogs/SeasonDialogComp";
import VoteDialogComp from "components/dialogs/VoteDialogComp";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const UserActionButton = ({ open, handleOnOpen }) => {
  const user = useSelector((state) => state.user);

  const handleOnLogout = () => {
    if (user.status) {
      handleOnOpen(false);
      Logout();
      window.location.reload();
    }
  };

  const SupporterMenu = () => {
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
            <ListItem button onClick={() => handleOnMenuClick("vote")}>
              <ListItemIcon>
                <HowToVote />
              </ListItemIcon>
              <ListItemText primary="투표만들기(팀 빌딩)" />
            </ListItem>
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
          <VoteDialogComp
            id="vote"
            open={open.vote}
            handleClose={handleClose}
          />
        </div>
      );
    }
    return "";
  };

  return (
    <div>
      <div className="FAB">
        <Fab color="primary" onClick={() => handleOnOpen(true)}>
          <Menu />
        </Fab>
      </div>

      <div>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          onClose={() => handleOnOpen(false)}
        >
          <div className="LeftMenu">
            <div>
              <ListItem>
                <h4>{user.userInfo.name} 님, 안녕하세요</h4>
              </ListItem>

              <Divider />

              <List>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="내 정보" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <AssignmentTurnedIn />
                  </ListItemIcon>
                  <ListItemText primary="활동하기" />
                </ListItem>
              </List>
              <SupporterMenu />
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
      </div>
    </div>
  );
};

export default UserActionButton;
