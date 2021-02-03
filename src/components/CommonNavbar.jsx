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
import { Button, Chip, IconButton } from "@material-ui/core";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "actions/types";
import { Logout } from "actions/firebaseActions";
import { Instagram } from "@material-ui/icons";

const CommonNavbar = ({ menuOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnLoginButton = () => {
    if (user.status) {
      Logout();
      dispatch({
        type: LOGOUT,
      });
    } else {
      history.push("/login");
    }
  };

  const handleOnClickInsta = () => {
    window.open("https://www.instagram.com/gongmoja_official/");
  };

  return (
    <div className="CommonNavbar" style={{ width: menuOpen ? "75%" : "100%" }}>
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
            <IconButton onClick={() => handleOnClickInsta()}>
              <Instagram style={{ color: "white" }} />
            </IconButton>
            {user.status ? (
              <Chip color="primary" label={user.userInfo.name} />
            ) : (
              ""
            )}
            &emsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOnLoginButton}
            >
              {user.status ? "로그아웃" : "로그인"}
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CommonNavbar;
