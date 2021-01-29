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

  const loading = useSelector((state) => state.loading);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(loading.loading);
  }, [loading.loading]);

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress color="inherit" />
      <br />
      <p>{loading.message}</p>
    </Backdrop>
  );
};

export default Loading;
