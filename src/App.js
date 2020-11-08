import { Switch, BrowserRouter, Route } from "react-router-dom";
import CommonFooter from "./components/CommonFooter";
import CommonNavbar from "./components/CommonNavbar";
import LandingView from "./views/LandingView";

const App = () => {
   return (
      <div>
         <CommonNavbar />
         <BrowserRouter>
            <Switch>
               <Route exact path="/" component={LandingView} />
            </Switch>
         </BrowserRouter>
         <CommonFooter />
      </div>
   );
};

export default App;
