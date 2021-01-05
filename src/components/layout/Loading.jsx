import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
   backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      display: "flex",
      flexDirection: "column",
   },
}));

const Loading = () => {
   const classes = useStyles();

   const user = useSelector((state) => state.user);
   const [open, setOpen] = useState(false);

   useEffect(() => {
      setOpen(user.loading);
   }, [user.loading]);

   return (
      <Backdrop className={classes.backdrop} open={open}>
         <CircularProgress color="inherit" />
         <br />
         <p>로딩 중입니다...</p>
      </Backdrop>
   );
};

export default Loading;
