import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
   Collapse,
   Nav,
   Navbar,
   NavbarText,
   NavbarToggler,
   NavItem,
} from "reactstrap";
import { Button } from "@material-ui/core";
import logo from "../assets/images/logo.png";
import * as Color from "../assets/colors";

const CommonNavbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   return (
      <div
         style={{
            backgroundColor: Color.mainColor,
            position: "fixed",
            top: 0,
            width: "100%",
         }}
      >
         <Navbar
            dark
            expand="lg"
            style={{
               margin: "0 10%",
               padding: "10px 0px",
            }}
         >
            <Link to="/">
               <img src={logo} alt="로고" style={{ height: 30 }} />
            </Link>
            <NavbarToggler onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <Collapse isOpen={isMenuOpen} navbar>
               <Nav className="m-auto" navbar style={{ color: "white" }}>
                  <NavItem>공모자들</NavItem>
                  &emsp;
                  <NavItem>동아리소개</NavItem>
                  &emsp;
                  <NavItem>활동하기</NavItem>
               </Nav>
               <NavbarText>
                  <Button variant="contained" color="primary">
                     로그인
                  </Button>
               </NavbarText>
            </Collapse>
         </Navbar>
      </div>
   );
};

export default CommonNavbar;
