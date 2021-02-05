import { combineReducers } from "redux";
import user from "./userReducer";
import loading from "./loadingReducer";
import activity from "./activityReducer";
import schedule from "./scheduleReducer";

export default combineReducers({
  user,
  loading,
  activity,
  schedule,
});
