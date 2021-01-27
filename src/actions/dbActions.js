import { fireAuth, fireDatabase, fireStorage } from "../app/initFirebase.js";
import * as TYPE from "actions/types";

export const AddNewSeason = (seasonName) => async (dispatch) => {
  dispatch({
    type: TYPE.LOADING,
    payload: "새로운 시즌을 추가하고 있습니다...",
  });
  // 중복 체크
  const existsCheck = await fireDatabase
    .ref(`seasons/${seasonName}`)
    .once("value")
    .then((snapShot) => {
      if (snapShot.val().seasonName === seasonName) {
        return true;
      }
    })
    .catch(() => {
      return false;
    });

  if (existsCheck) {
    alert("시즌 이름이 중복됩니다.");
    dispatch({
      type: TYPE.LOADING,
      payload: "추가 실패!",
    });
    return;
  }

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
        payload: "추가 완료!",
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
      dispatch({
        type: TYPE.GET_SEASONS,
        payload: Object.values(snapShot.val()),
      });
      dispatch({
        type: TYPE.LOADING,
        payload: "로딩 완료!",
      });
    });
};

export const AddTeam = (seasonName, teamName) => async (dispatch) => {
  dispatch({
    type: TYPE.LOADING,
    message: "새로운 팀을 추가하고 있습니다...",
  });

  await fireDatabase
    .ref(`seasons/${seasonName}`)
    .update({
      [teamName]: {
        teamName,
      },
    })
    .then(() => {
      alert("새로운 팀이 생성되었습니다.");
      dispatch({
        type: TYPE.LOADING,
        message: "추가 완료!",
      });
    })
    .catch((err) => {
      console.error(err);
      alert("팀 생성에 실패했습니다.\n반복 증상시, 개발자에게 문의바랍니다.");
      dispatch({
        type: TYPE.LOADING,
        message: "추가 실패!",
      });
    });
};
