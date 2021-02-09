import { Fab } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { Logout } from "actions/firebaseActions";
import React from "react";
import { useSelector } from "react-redux";
import LeftDrawerComp from "./LeftDrawerComp";

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
    <div className="User-Action-Btn">
      <div className="FAB">
        <Fab color="primary" onClick={() => handleOnOpen(true)}>
          <Menu />
        </Fab>
      </div>

      <LeftDrawerComp
        open={open}
        handleOnOpen={handleOnOpen}
        user={user}
        handleOnLogout={handleOnLogout}
      />
    </div>
  );
};
export default UserActionButton;
