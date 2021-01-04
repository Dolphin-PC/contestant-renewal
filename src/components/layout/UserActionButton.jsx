import { Drawer, Fab, List, ListItem, ListItemText } from "@material-ui/core";
import { Inbox, Mail, Menu } from "@material-ui/icons";
import React, { useState } from "react";

const UserActionButton = () => {
   const [open, setOpen] = useState(false);

   return (
      <div>
         <div className="FAB">
            <Fab color="primary" onClick={() => setOpen(true)}>
               <Menu />
            </Fab>
         </div>

         <div className="Drawer">
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
               dfdff
            </Drawer>
         </div>
      </div>
   );
};

export default UserActionButton;
