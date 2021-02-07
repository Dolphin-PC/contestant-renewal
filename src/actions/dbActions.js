import { fireAuth, fireDatabase, fireStorage } from "../app/initFirebase.js";
import * as TYPE from "actions/types";
import { getCurrentDateFormat, GetCurrentTime } from "functions/functions.js";
import { useCallback } from "react";

// @param   loading : true/false
// @param   payload : String
const Loading = (loading, payload) => {
  return {
    type: TYPE.LOADING,
    loading,
    payload,
  };
};

export const AddNewSeason = (seasonName) => async (dispatch) => {
  dispatch({
    type: TYPE.LOADING,
    loading: true,
    payload: "새로운 시즌을 추가하고 있습니다...",
  });
  // 중복 체크
  let existsCheck = false;

  await fireDatabase.ref(`seasons/${seasonName}`).on("value", (snapShot) => {
    if (snapShot.val() !== null) {
      existsCheck = snapShot.val().seasonName === seasonName ? true : false;
    }
    // return snapShot.val().seasonName === seasonName ? true : false;
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
      if (snapShot.val() !== null) {
        dispatch({
          type: TYPE.GET_SEASONS,
          payload: Object.values(snapShot.val()),
        });
      }
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
  let existsCheck = false;

  dispatch(Loading(true, "새로운 회의록을 추가하고 있습니다..."));

  await fireDatabase
    .ref(`seasons/${currentSeason}/teamList/${teamName}/teamLog/${currentDate}`)
    .on("value", (snapShot) => {
      if (snapShot.val() !== null) {
        existsCheck = snapShot.val().logName === currentDate ? true : false;
      }
    });

  if (existsCheck) {
    dispatch(Loading(false, "중복된 회의록입니다."));
    if (
      window.prompt(
        "중복된 회의록이 있습니다.\n\n기존 회의록에 덮어씌우시려면 [확인]을 입력해주세요."
      ) !== "확인"
    ) {
      return;
    }
  }

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
  const createStamp = new Date().getTime();

  dispatch({
    type: TYPE.LOADING,
    loading: true,
    message: "피드백을 업로드하고 있습니다...",
  });

  await fireDatabase
    .ref(
      `seasons/${currentSeason}/teamList/${teamName}/teamLog/${logName}/feedbacks`
    )
    .child(createStamp)
    .set({
      createStamp,
      currentDate,
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

// * LogWrapper - return local State
export const GetFeedbacks = async (logName, activity) => {
  const { currentSeason, currentTeam } = activity;
  let result = null;

  await fireDatabase
    .ref(
      `seasons/${currentSeason}/teamList/${currentTeam.teamName}/teamLog/${logName}/feedbacks`
    )
    .on("value", (snapShot) => {
      if (snapShot.val() !== null) {
        return (result = snapShot.val());
      }
    });

  return result;
};

export const DeleteLog = (activity, logName) => async (dispatch) => {
  const { currentSeason, currentTeam } = activity;
  const { teamName } = currentTeam;

  dispatch(Loading(true, "삭제 중입니다..."));

  await fireDatabase
    .ref(`seasons/${currentSeason}/teamList/${teamName}/teamLog`)
    .child(logName)
    .remove()
    .then(() => {
      dispatch(Loading(false, "삭제 완료!"));
      alert("회의록이 삭제되었습니다.");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Loading(false, "삭제 실패!"));
      alert("회의록 삭제 오류");
    });
};

export const DeleteTeam = (currentSeason, teamName) => async (dispatch) => {
  dispatch(Loading(true, "삭제 중입니다..."));

  await fireDatabase
    .ref(`seasons/${currentSeason}/teamList`)
    .child(teamName)
    .remove()
    .then(() => {
      dispatch(Loading(false, "삭제 완료!"));
      alert("해당 팀이 삭제되었습니다.");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Loading(false, "삭제 실패!"));
      alert("팀 삭제 오류");
    });
};

export const DeleteFeedback = (activity, logName, feed) => async (dispatch) => {
  const { currentSeason, currentTeam } = activity;
  const { teamName } = currentTeam;
  const { createStamp } = feed;

  dispatch(Loading(true, "피드백 삭제 중입니다..."));

  await fireDatabase
    .ref(
      `seasons/${currentSeason}/teamList/${teamName}/teamLog/${logName}/feedbacks`
    )
    .child(createStamp)
    .remove()
    .then(() => {
      dispatch(Loading(false), "피드백 삭제 완료");
      alert("피드백이 삭제되었습니다.");
    })
    .catch((err) => {
      dispatch(Loading(false), "피드백 삭제 실패");
      alert("피드백 삭제 실패...");
    });
};

export const EditFeedbackContent = (
  activity,
  logName,
  feed,
  editText
) => async (dispatch) => {
  const { currentSeason, currentTeam } = activity;
  const { teamName } = currentTeam;
  const { createStamp } = feed;

  let editObject = {
    ...feed,
    content: editText,
  };

  dispatch(Loading(true, "피드백 수정 중입니다..."));

  await fireDatabase
    .ref(
      `seasons/${currentSeason}/teamList/${teamName}/teamLog/${logName}/feedbacks`
    )
    .child(createStamp)
    .update(editObject)
    .then(() => {
      dispatch(Loading(false), "피드백 수정 완료");
      alert("피드백이 수정되었습니다.");
    })
    .catch((err) => {
      dispatch(Loading(false), "피드백 수정 실패");
      alert("피드백 수정 실패...");
    });
};

export const AddNewSchedule = (scheduleName, scheduleTime) => async (
  dispatch
) => {
  if (scheduleName === "") return alert("일정 이름을 입력해주세요.");
  if (scheduleTime === "") return alert("일정/시간을 입력해주세요.");
  dispatch(Loading(true, "새로운 일정을 만들고 있습니다..."));

  await fireDatabase
    .ref("attendance")
    .child(scheduleTime)
    .update({
      scheduleName,
      scheduleTime,
      createStamp: new Date().getTime(),
    })
    .then(() => {
      dispatch(Loading(false, "새로운 일정 추가 완료!"));
      alert("일정 추가 완료!");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Loading(false, "새로운 일정 추가 실패!"));
      alert("일정 추가 실패...");
    });
};

export const GetSchedules = () => async (dispatch) => {
  dispatch(Loading(true, "출석 일정을 불러오고 있습니다..."));

  let schedules = null;
  await fireDatabase.ref("attendance").on("value", (snapShot) => {
    if (snapShot.val() !== null) {
      dispatch({
        type: TYPE.GET_SCHEDULES,
        payload: snapShot.val(),
      });
    }
  });
  dispatch(Loading(false, "로딩 완료"));

  return schedules;
};

export const DeleteSchedules = (scheduleTime) => async (dispatch) => {
  dispatch(Loading(true, "일정을 삭제하고 있습니다..."));

  await fireDatabase
    .ref("attendance")
    .child(scheduleTime)
    .remove()
    .then(() => {
      alert("일정이 삭제되었습니다.");
    })
    .catch((err) => {
      console.error(err);
      alert("일정 삭제 오류");
    })
    .then(() => {
      dispatch(Loading(false, "일정 삭제 처리 완료"));
    });
};

// export const AddNewAttend = (scheduleTime, attend) => async (dispatch) => {
//   dispatch(Loading(true, "출석할 인원을 추가하고 있습니다..."));

//   await fireDatabase
//     .ref(`attendance/${scheduleTime}`)
//     .child("scheduleAttend")
//     .update({
//       attend,
//     })
//     .then(() => {
//       alert("일정 출석 인원 추가 완료!");
//     })
//     .catch((err) => {
//       alert("오류!");
//     })
//     .then(() => {
//       dispatch(Loading(false, "일정 출석 인원 처리 완료"));
//     });
// };

export const SaveAttends = (currentAttend, scheduleAttends) => async (
  dispatch
) => {
  dispatch(Loading(true, "출석 인원을 추가하고 있습니다..."));
  var Attends = {};

  scheduleAttends.map((item) => {
    Object.assign(item, { isAttend: "not" });
    var keyObj = new Object({ [item.id]: item });
    Attends = Object.assign(Attends, keyObj);
  });

  await fireDatabase
    .ref(`attendance/${currentAttend.scheduleTime}/scheduleAttends`)
    .set(Attends)
    .then(() => {
      alert("출석 인원을 저장했습니다!");
    })
    .catch((err) => {
      console.error(err);
      alert("출석 인원 저장에 실패했습니다...");
    })
    .then(() => dispatch(Loading(false, "출석 인원 처리 완료")));
};

export const UpdateAttend = (scheduleTime, id, isAttend) => async (
  dispatch
) => {
  // dispatch(Loading(true, "출결 처리 중입니다..."));

  let scheduledTime = scheduleTime.split("T")[1].split(":");
  scheduledTime = scheduledTime.map((item) => Number(item));
  const currentTime = GetCurrentTime();
  const currentMinute = currentTime[0] * 60 + currentTime[1];
  const scheduledMinute = scheduledTime[0] * 60 + scheduledTime[1];
  const betweenTime = currentMinute - scheduledMinute;

  let setAttend = "";
  if (isAttend !== "not") setAttend = "not";
  else {
    console.info(currentTime, currentMinute, scheduledMinute, betweenTime);

    if (scheduledMinute > currentMinute)
      return alert("아직 출석 시간이 아닙니다.");
    else if (betweenTime <= 10) setAttend = "attend";
    else if (betweenTime >= 10 && betweenTime < 20) setAttend = "late";
    else if (betweenTime >= 20) setAttend = "absent";
  }

  await fireDatabase
    .ref(`attendance/${scheduleTime}/scheduleAttends/${id}`)
    .update({
      isAttend: setAttend,
    })
    .then(() => {
      dispatch(Loading(false, "출결 처리 완료"));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Loading(false, ""));
    });
};
