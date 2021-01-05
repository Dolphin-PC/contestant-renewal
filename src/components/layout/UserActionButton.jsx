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
import { AccountCircle, AssignmentTurnedIn, Menu } from "@material-ui/icons";
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
