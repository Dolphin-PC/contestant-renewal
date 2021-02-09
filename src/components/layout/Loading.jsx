import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const loading = useSelector((state) => state.loading);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(loading.loading);
  }, [loading.loading]);

  return (
    <Backdrop open={open} className="BackDrop-Loading">
      <CircularProgress color="inherit" />
      <br />
      <p>{loading.message}</p>
    </Backdrop>
  );
};

export default Loading;
