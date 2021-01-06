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
import React from "react";
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
      if (user.userInfo.isSupporter) {
         return (
            <List>
               <p>서포터즈 전용메뉴</p>

               <ListItem button>
                  <ListItemIcon>
                     <InsertInvitation />
                  </ListItemIcon>
                  <ListItemText primary="시즌 추가" />
               </ListItem>
               <ListItem button>
                  <ListItemIcon>
                     <Group />
                  </ListItemIcon>
                  <ListItemText primary="팀 생성" />
               </ListItem>
               <ListItem button>
                  <ListItemIcon>
                     <HowToVote />
                  </ListItemIcon>
                  <ListItemText primary="투표만들기(팀 빌딩)" />
               </ListItem>
            </List>
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

         <div className="Drawer">
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
