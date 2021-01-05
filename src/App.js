import { Switch, BrowserRouter, Route } from "react-router-dom";
import CommonFooter from "./components/CommonFooter";
import CommonNavbar from "./components/CommonNavbar";
import LandingView from "./views/LandingView";

import "./styles/app.css";
import IntroductPageView from "views/IntroductPageView";
import LoginPageView from "views/LoginPageView";
import { useEffect, useState } from "react";
import { DB_LoadUserInfo } from "actions/firebaseActions";
import { fireAuth } from "app/initFirebase";
import { useDispatch, useSelector } from "react-redux";
import UserActionButton from "components/layout/UserActionButton";
import Loading from "components/layout/Loading";
import ActivityPageView from "views/ActivityPageView";

const App = () => {
   const [menuOpen, setMenuOpen] = useState(false);
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);

   const handleOnOpen = (open) => {
      setMenuOpen(open);
   };

   useEffect(() => {
      fireAuth.onAuthStateChanged((user) => {
         if (user) {
            dispatch(DB_LoadUserInfo(user.email.split("@")[0]));
         }
      });
   }, []);

   return (
      <div style={{ marginLeft: menuOpen ? "20%" : 0, transition: "0.2s" }}>
         <BrowserRouter>
            <CommonNavbar />
            <Switch>
               <Route exact path="/" component={LandingView} />
               <Route exact path="/introduce" component={IntroductPageView} />
               <Route exact path="/login" component={LoginPageView} />
               <Route exact path="/activity" component={ActivityPageView} />
            </Switch>
            {user.status ? (
               <UserActionButton open={menuOpen} handleOnOpen={handleOnOpen} />
            ) : (
               ""
            )}

            <CommonFooter />
         </BrowserRouter>

         <Loading />
      </div>
   );
};

export default App;
