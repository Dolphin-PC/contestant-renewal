import { combineReducers } from "redux";
import data from "./dataReducer";
import user from "./userReducer";

export default combineReducers({
   user,
   data,
});
