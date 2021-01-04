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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UserActionButton = () => {
   const [open, setOpen] = useState(false);
   const user = useSelector((state) => state.user);

   const handleOnLogout = () => {
      if (user.status) {
         setOpen(false);
         Logout();
         window.location.reload();
      }
   };

   return (
      <div>
         <div className="FAB">
            <Fab color="primary" onClick={() => setOpen(true)}>
               <Menu />
            </Fab>
         </div>

         <div className="Drawer">
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
               <div className="LeftMenu">
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

                  <div className="Bottom">
                     <Divider />
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
