import { IconButton, Tooltip } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import React from "react";

const CommonFooter = () => {
  const handleOnClickGitHub = () => {
    window.open("https://github.com/Dolphin-PC/contestant-renewal/");
  };
  return (
    <div className="CommonFooter">
      <p>춘천연합공모전동아리 '공모자들'</p>
      <small>
        Copyright&copy; 2021. all rights reserved by 공모자들
        <br />
        Made by 박찬영
      </small>
      <br />
      <Tooltip title="Dolphin-PC Git Repo." placement="top">
        <IconButton onClick={() => handleOnClickGitHub()}>
          <GitHub />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CommonFooter;
