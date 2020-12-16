import { Switch, BrowserRouter, Route } from "react-router-dom";
import CommonFooter from "./components/CommonFooter";
import CommonNavbar from "./components/CommonNavbar";
import LandingView from "./views/LandingView";

import "./styles/app.css";

const App = () => {
   return (
      <div>
         <BrowserRouter>
            <CommonNavbar />
            <Switch>
               <Route exact path="/" component={LandingView} />
            </Switch>
            <CommonFooter />
         </BrowserRouter>
      </div>
   );
};

export default App;
