import { fireAuth, fireDatabase, fireStorage } from "../app/initFirebase.js";
import * as TYPE from "actions/types";

export const AddNewSeason = (seasonName) => async (dispatch) => {
  await fireDatabase
    .ref("/seasons/" + seasonName)
    .set({
      seasonName,
      createStamp: new Date().getTime(),
    })
    .then((res) => {
      alert("시즌 추가가 완료되었습니다.");
      dispatch({
        type: TYPE.LOADING,
      });
    })
    .catch((err) => {
      alert("시즌 추가 오류 발생");
    });
};

export const GetSeasons = () => async (dispatch) => {
  dispatch({
    type: TYPE.LOADING,
    payload: "시즌 정보를 불러오고 있습니다...",
  });
  await fireDatabase
    .ref("seasons")
    .orderByChild("createStamp")
    .once("value")
    .then((snapShot) => {
      console.log(snapShot.val());

      dispatch({
        type: TYPE.GET_SEASONS,
        payload: snapShot.val(),
      });
      dispatch({
        type: TYPE.LOADING,
        payload: "Complete!",
      });
    });
};
