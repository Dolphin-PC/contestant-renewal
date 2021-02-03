import React from "react";
import { useState } from "react";
import { Button, Col, Container } from "reactstrap";

import carousel1 from "assets/images/carousel1.jpg";
import IntroduceRuleVisualImage from "assets/images/IntroduceRuleVisualImage.jpg";
import IntroduceActivityVisualImage from "assets/images/IntroduceActivityVisualImage.jpg";
import { Fab } from "@material-ui/core";
import { Close, List } from "@material-ui/icons";

import IntroduceTeam from "components/introduce/IntroduceTeam";
import IntroduceRule from "components/introduce/IntroduceRule";
import IntroduceActivity from "components/introduce/IntroduceActivity";

const IntroductPageView = () => {
  const height = window.innerHeight;
  const initialWidth = {
    left: "33.3%",
    center: "33.3%",
    right: "33.3%",
  };

  const [width, setWidth] = useState(initialWidth);
  const [zIndex, setzIndex] = useState({
    left: 1,
    center: 1,
    right: 1,
  });

  const [currentCategory, setCurrentCategory] = useState("");

  const handleEnter = (e) => {
    setWidth({
      left: "0%",
      center: "0%",
      right: "0%",
      [e.currentTarget.id]: "100%",
    });
    setzIndex({
      left: 1,
      center: 1,
      right: 1,
      [e.currentTarget.id]: 2,
    });
    setCurrentCategory(e.currentTarget.id);
  };

  const handleLeave = () => {
    setWidth(initialWidth);
    setCurrentCategory("");
  };

  const BottomListButton = () => {
    return (
      <Fab
        onClick={handleLeave}
        style={{
          position: "fixed",
          bottom: 10,
          left: "50%",
          transform: "translate(-50%,0)",
          zIndex: 10000,
        }}
      >
        {currentCategory === "" ? <List /> : <Close />}
      </Fab>
    );
  };

  const SelectionRender = () => {
    switch (currentCategory) {
      case "left":
        return <IntroduceTeam />;
      case "center":
        return <IntroduceRule />;
      case "right":
        return <IntroduceActivity />;
      default:
        return <hr />;
    }
  };

  return (
    <div className="Introduce">
      <div style={{ height: height, width: "100%" }} className="Row">
        <div
          className="Center"
          style={{
            width: width.left,
            zIndex: zIndex.left,
            backgroundImage: `url(${carousel1})`,
            display: width.left === "0%" ? "none" : "inherit",
          }}
          id="left"
          onClick={handleEnter}
        >
          <div className="InnerText">
            <h1>동아리 소개</h1>
            <h5>
              '공모자들'에서는 경험이 없어도, 잘 하지 못해도 누구든 다양한
              사람들과 함께 공모전에 도전할 수 있습니다.
              <hr />
              {currentCategory === "left"
                ? "#춘천연합동아리 #서포터즈소개"
                : ""}
            </h5>
          </div>
        </div>
        <div
          className="Center"
          style={{
            width: width.center,
            zIndex: zIndex.center,
            backgroundImage: `url(${IntroduceRuleVisualImage})`,
            display: width.center === "0%" ? "none" : "inherit",
          }}
          id="center"
          onClick={handleEnter}
        >
          <div className="InnerText">
            <h1>운영방침</h1>
            <h5>
              운영방안과 규칙 공모자들, 이것만은 꼭! 지켜주세요.
              <hr />
              {currentCategory === "center"
                ? "#회의방침 #예산운영 #운영방침 #채팅방방침"
                : ""}
            </h5>
          </div>
        </div>
        <div
          className="Center"
          style={{
            width: width.right,
            zIndex: zIndex.right,
            backgroundImage: `url(${IntroduceActivityVisualImage})`,
            display: width.right === "0%" ? "none" : "inherit",
          }}
          id="right"
          onClick={handleEnter}
        >
          <div className="InnerText">
            <h1>활동 내역</h1>
            <h5>
              '공모자들'의 활약들을 소개합니다.
              <hr />
              {currentCategory === "right"
                ? "#공모전 #수상/경험 #친목활동"
                : ""}
            </h5>
          </div>
        </div>
      </div>

      <SelectionRender />

      <BottomListButton />
    </div>
  );
};

export default IntroductPageView;
