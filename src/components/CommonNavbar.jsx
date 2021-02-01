import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { fireAuth } from "app/initFirebase";
import { LOGOUT } from "actions/types";
import { Logout } from "actions/firebaseActions";

const CommonNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    fireAuth.onAuthStateChanged((user) => {
      if (user) setStatus(true);
    });
  }, []);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = user;

  const handleOnLoginButton = () => {
    if (status) {
      Logout();
      setStatus(false);
      dispatch({
        type: LOGOUT,
      });
    } else {
      history.push("/login");
    }
  };
  return (
    <div
      className="CommonNavbar"
      style={{
        backgroundColor: Color.mainColor,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 5,
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
          <Nav className="m-auto" navbar fill style={{ color: "white" }}>
            <NavItem>
              <NavLink to="/">공모자들</NavLink>
            </NavItem>
            &emsp;
            <NavItem>
              <NavLink to="/introduce">동아리소개</NavLink>
            </NavItem>
            &emsp;
            <NavItem>
              <NavLink to="/activity">활동하기</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOnLoginButton}
            >
              {status ? "로그아웃" : "로그인"}
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CommonNavbar;
