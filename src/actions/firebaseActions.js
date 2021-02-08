import { fireAuth, fireDatabase, fireStorage } from "../app/initFirebase.js";
import { LOGIN, LOGOUT, LOADING } from "actions/types";

// 함수 반환 값
let resResult = {
  res: null,
  message: "",
};

// DB 에서 인증코드 불러오기(일반코드, 서포터즈코드)
const loadAuthCode = async () => {
  const _authCode = await fireDatabase
    .ref("authCode")
    .once("value")
    .then((snapShot) => {
      return snapShot.val();
    });

  const _authCode_Supporter = await fireDatabase
    .ref("authCode-Supporter")
    .once("value")
    .then((snapShot) => {
      return snapShot.val();
    });

  return [_authCode, _authCode_Supporter];
};

// 회원가입(Authentification)
export const RegisterNewUser = async (props) => {
  const { id, password, name, property, authCode } = props;

  if (id === "") return alert("아이디를 입력해주세요.");
  else if (password.length < 6)
    return alert("6자리 이상의 비밀번호를 입력해주세요.");
  else if (name === "") return alert("이름을 입력해주세요.");
  else if (property === "") return alert("학교/학번을 입력해주세요.");
  else if (!property.includes("/"))
    return alert("/(슬래시)로 학교와 학번을 구분하여 입력해주세요.");
  else if (authCode === "") return alert("인증코드를 입력해주세요.");

  const code = await loadAuthCode();
  const _authCode = code[0];
  const _authCode_Supporter = code[1];

  let auth = "";

  if (authCode === _authCode) auth = "normal";
  else if (authCode === _authCode_Supporter) auth = "supporter";

  if (auth === "") return alert("인증코드를 확인해주세요.");

  await fireAuth
    .createUserWithEmailAndPassword(id + "@gongmoja.com", password)
    .then(async (user) => {
      resResult.res = user;
      alert("회원가입이 완료되었습니다.");
      if (auth === "normal") DB_NewUserInfo(id, name, property, false);
      else if (auth === "supporter") DB_NewUserInfo(id, name, property, true);
    })
    .catch((err) => {
      console.error(err);
      resResult.res = err;
      switch (err.code) {
        case "auth/email-already-in-use":
          return alert("이미 존재하는 아이디입니다.");
        case "auth/weak-password":
          return alert("6자리 이상의 비밀번호를 입력해주세요.");
        default:
          return alert("오류 발생\n서포터즈에게 문의바랍니다.");
      }
    });
};

export const SignInUser = (props) => async (dispatch) => {
  const { id, password } = props;

  if (id === "") return alert("아이디를 입력해주세요.");
  else if (password === "") return alert("패스워드를 입력해주세요.");

  dispatch({
    type: LOADING,
    loading: true,
    payload: "로그인 중입니다...",
  });

  await fireAuth
    .signInWithEmailAndPassword(id + "@gongmoja.com", password)
    .then((user) => {
      resResult.res = user;
      resResult.message = "로그인 성공";
    })
    .catch((err) => {
      resResult.res = err;
      switch (err.code) {
        case "auth/user-not-found":
          return (resResult.message = "아이디를 다시 한번 확인해주세요.");
        case "auth/wrong-password":
          return (resResult.message = "비밀번호를 다시 한번 확인해주세요.");
        default:
          return (resResult.message = "오류 발생\n서포터즈에게 문의바랍니다.");
      }
    });

  dispatch({
    type: LOADING,
    loading: false,
    payload: "",
  });

  return resResult;
};

const DB_NewUserInfo = async (id, name, property, isSupporter) => {
  await fireDatabase
    .ref("users/" + id)
    .set({
      id,
      name,
      isSupporter,
      property,
      isAuth: true,
    })
    .then(() => {
      console.info("회원가입 데이터 업로드 성공");
    })
    .catch((err) => {
      console.error(err);
      alert("데이터 업로드 실패");
    });
};

// DB 에서 유저 정보 불러오기
export const DB_LoadUserInfo = (id) => async (dispatch) => {
  await fireDatabase.ref(`users/${id}`).on("value", (snapShot) => {
    dispatch({
      type: LOGIN,
      payload: snapShot.val(),
    });
  });
};

export const Logout = () => {
  fireAuth.signOut();
};
