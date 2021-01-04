import { Switch, BrowserRouter, Route } from "react-router-dom";
import CommonFooter from "./components/CommonFooter";
import CommonNavbar from "./components/CommonNavbar";
import LandingView from "./views/LandingView";

import "./styles/app.css";
import IntroductPageView from "views/IntroductPageView";
import LoginPageView from "views/LoginPageView";
import { useEffect } from "react";
import { DB_LoadUserInfo } from "actions/firebaseActions";
import { fireAuth } from "app/initFirebase";
import { useDispatch, useSelector } from "react-redux";
import { Add, Menu } from "@material-ui/icons";
import { Drawer, Fab } from "@material-ui/core";
import { useState } from "react";
import UserActionButton from "components/layout/UserActionButton";

const App = () => {
   const user = useSelector((state) => state.user);

   const dispatch = useDispatch();
   useEffect(() => {
      fireAuth.onAuthStateChanged((user) => {
         if (user) {
            dispatch(DB_LoadUserInfo(user.email.split("@")[0]));
         }
      });
   }, []);

   return (
      <div>
         <BrowserRouter>
            <CommonNavbar />
            <Switch>
               <Route exact path="/" component={LandingView} />
               <Route exact path="/introduce" component={IntroductPageView} />
               <Route exact path="/login" component={LoginPageView} />
            </Switch>
            {user.status ? <UserActionButton /> : ""}

            <CommonFooter />
         </BrowserRouter>
      </div>
   );
};

export default App;
