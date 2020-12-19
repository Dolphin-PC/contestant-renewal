import React from "react";
import { useState } from "react";
import { Button, Col } from "reactstrap";

import carousel1 from "assets/images/carousel1.jpg";
import carousel2 from "assets/images/carousel2.jpg";
import carousel3 from "assets/images/carousel3.jpg";
import { Fab } from "@material-ui/core";
import { Close, List } from "@material-ui/icons";

import styled from "styled-components";

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
            return <h1>Left</h1>;
         case "center":
            return <h1>center</h1>;
         case "right":
            return <h1>right</h1>;
         default:
            return <h1>DEFAULT</h1>;
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
               }}
               id="left"
               onClick={handleEnter}
            >
               <div className="InnerText">
                  <h1>동아리 소개</h1>
                  <hr />
                  <h5>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Maxime, earum asperiores. Debitis architecto placeat non
                     quisquam magni dolorum. Ex cumque quidem iure esse amet
                     deserunt dicta harum ut obcaecati fugiat.
                  </h5>
               </div>
            </div>
            <div
               className="Center"
               style={{
                  width: width.center,
                  zIndex: zIndex.center,
                  backgroundImage: `url(${carousel2})`,
               }}
               id="center"
               onClick={handleEnter}
            >
               <div className="InnerText">
                  <h1>운영방침</h1>
                  <hr />
                  <h5>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Maxime, earum asperiores. Debitis architecto placeat non
                     quisquam magni dolorum. Ex cumque quidem iure esse amet
                     deserunt dicta harum ut obcaecati fugiat.
                  </h5>
               </div>
            </div>
            <div
               className="Center"
               style={{
                  width: width.right,
                  zIndex: zIndex.right,
                  backgroundImage: `url(${carousel3})`,
               }}
               id="right"
               onClick={handleEnter}
            >
               <div className="InnerText">
                  <h1>활동 내역</h1>
                  <hr />
                  <h5>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Maxime, earum asperiores. Debitis architecto placeat non
                     quisquam magni dolorum. Ex cumque quidem iure esse amet
                     deserunt dicta harum ut obcaecati fugiat.
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
