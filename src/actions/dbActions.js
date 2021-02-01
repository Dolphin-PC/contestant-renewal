import { fireAuth, fireDatabase, fireStorage } from "../app/initFirebase.js";
import * as TYPE from "actions/types";
import { getCurrentDateFormat } from "functions/functions.js";

export const AddNewSeason = (seasonName) => async (dispatch) => {
  dispatch({
    type: TYPE.LOADING,
    loading: true,
    payload: "새로운 시즌을 추가하고 있습니다...",
  });
  // 중복 체크
  const existsCheck = await fireDatabase
    .ref(`seasons/${seasonName}`)
    .on("value", (snapShot) => {
      return snapShot.val().seasonName === seasonName ? true : false;
    });

  if (existsCheck) {
    alert("시즌 이름이 중복됩니다.");
    dispatch({
      type: TYPE.LOADING,
      payload: "추가 실패!",
    });
    return;
  }

  const toAddData = {
    seasonName,
    createStamp: new Date().getTime(),
    teamList: [],
  };

  await fireDatabase
    .ref("/seasons/" + seasonName)
    .set(toAddData)
    .then((res) => {
      alert("시즌 추가가 완료되었습니다.");
      dispatch({
        type: TYPE.LOADING,
        loading: false,
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
    loading: true,
    payload: "시즌 정보를 불러오고 있습니다...",
  });
  await fireDatabase
    .ref("seasons")
    .orderByChild("createStamp")
    .on("value", (snapShot) => {
      dispatch({
        type: TYPE.GET_SEASONS,
        payload: Object.values(snapShot.val()),
      });
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        payload: "로딩 완료!",
      });
    });
};

export const GetMembers = () => async (dispatch) => {
  dispatch({
    type: TYPE.LOADING,
    loading: true,
    payload: "회원 정보를 불러오고 있습니다...",
  });
  await fireDatabase.ref("users").on("value", (snapShot) => {
    dispatch({
      type: TYPE.GET_MEMBERS,
      payload: Object.values(snapShot.val()),
    });
    dispatch({
      type: TYPE.LOADING,
      loading: false,
      payload: "로딩 완료!",
    });
  });
};

export const AddTeam = (seasonName, teamName) => async (dispatch) => {
  dispatch({
    type: TYPE.LOADING,
    loading: true,
    message: "새로운 팀을 추가하고 있습니다...",
  });

  await fireDatabase
    .ref(`seasons/${seasonName}/teamList`)
    .update({
      [teamName]: {
        teamName,
      },
    })
    .then(() => {
      alert("새로운 팀이 생성되었습니다.");
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        message: "추가 완료!",
      });
    })
    .catch((err) => {
      console.error(err);
      alert("팀 생성에 실패했습니다.\n반복 증상시, 개발자에게 문의바랍니다.");
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        message: "추가 실패!",
      });
    });
};

export const AddNewMember = (currentSeason, teamName, member) => async (
  dispatch
) => {
  dispatch({
    type: TYPE.LOADING,
    loading: true,
    payload: "새로운 멤버를 추가하고 있습니다...",
  });

  await fireDatabase
    .ref(`seasons/${currentSeason}/teamList/${teamName}/teamMember`)
    .child(`${member.name}(${member.property.split("/")[1]})`)
    .update(member)
    .then((res) => {
      alert(
        `${teamName}(${currentSeason}) 팀에 ${member.name}님을 추가했습니다.`
      );
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        payload: "추가 완료!",
      });
    })
    .catch((err) => {
      alert("팀원 추가 오류 발생");
    })
    .then(() => {
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        payload: "",
      });
    });
};

export const DeleteTeamMember = async (currentSeason, teamName, member) => {
  await fireDatabase
    .ref(`seasons/${currentSeason}/teamList/${teamName}/teamMember`)
    .child(`${member.name}(${member.property.split("/")[1]})`)
    .remove()
    .then(() => {
      alert("정상적으로 삭제되었습니다.");
    });
};

export const AddNewLog = (currentSeason, teamName, currentDate) => async (
  dispatch
) => {
  dispatch({
    type: TYPE.LOADING,
    loading: true,
    payload: "새로운 회의록을 추가하고 있습니다...",
  });

  await fireDatabase
    .ref(`seasons/${currentSeason}/teamList/${teamName}/teamLog`)
    .child(currentDate)
    .update({
      createStamp: new Date().getTime(),
      logName: currentDate,
      log: "",
      feedback: "",
      feedbacks: [],
    })
    .then((res) => {
      alert("새 회의록이 추가되었습니다.");
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        payload: "추가 완료!",
      });
    })
    .catch((err) => {
      alert("회의록 추가 오류 발생");
    })
    .then(() => {
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        payload: "",
      });
    });
};

export const UpdateLogContent = (
  activity,
  logName,
  tab,
  updateContent
) => async (dispatch) => {
  const { currentSeason, currentTeam } = activity;

  console.info(updateContent);

  dispatch({
    type: TYPE.LOADING,
    loading: true,
    payload: "회의록 내용을 수정하고 있습니다...",
  });

  await fireDatabase
    .ref(`seasons/${currentSeason}/teamList/${currentTeam.teamName}/teamLog`)
    .child(logName)
    .update({
      [tab]: updateContent,
    })
    .then((res) => {
      alert("회의록이 수정되었습니다.");
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        payload: "수정 완료!",
      });
    })
    .catch((err) => {
      alert("회의록 수정 오류 발생");
    })
    .then(() => {
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        payload: "",
      });
    });
};

export const AddNewFeedback = (
  currentSeason,
  teamName,
  logName,
  user,
  content
) => async (dispatch) => {
  const currentDate = getCurrentDateFormat();

  dispatch({
    type: TYPE.LOADING,
    loading: true,
    message: "피드백을 업로드하고 있습니다...",
  });

  await fireDatabase
    .ref(
      `seasons/${currentSeason}/teamList/${teamName}/teamLog/${logName}/feedbacks`
    )
    .push({
      createStamp: new Date().getTime(),
      currentDate: currentDate,
      content,
      user: user.userInfo,
    })
    .then(() => {
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        message: "피드백 업로드 성공!",
      });
      alert("피드백 작성이 완료되었습니다.");
    })
    .catch(() => {
      dispatch({
        type: TYPE.LOADING,
        loading: false,
        message: "피드백 업로드 실패...",
      }).then(() => {
        dispatch({
          type: TYPE.LOADING,
          loading: false,
        });
      });
    });
};

export const SetCurrentTeam = (currentSeason, teamName) => async (dispatch) => {
  await fireDatabase
    .ref(`seasons/${currentSeason}/teamList/${teamName}`)
    .on("value", (snapShot) => {
      dispatch({
        type: TYPE.SET_TEAM,
        payload: snapShot.val(),
      });
    });
};
