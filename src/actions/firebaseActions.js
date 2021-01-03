import { fireAuth, fireDatabase, fireStorage } from "../app/initFirebase.js";
import { LOGIN, LOGOUT, LOAD } from "actions/types";

// 함수 반환 값
let resResult = {
   res: null,
   message: "",
};

// DB 에서 인증코드 불러오기(일반코드, 서포터즈코드)
const loadAuthCode = async () => {
   const _authCode = await fireDatabase
      .ref("/authCode")
      .once("value")
      .then((snapShot) => {
         return snapShot.val();
      });

   const _authCode_supporter = await fireDatabase
      .ref("/authCode_Supporter")
      .once("value")
      .then((snapShot) => {
         return snapShot.val();
      });

   return { _authCode, _authCode_supporter };
};

// 회원가입(Authentification)
export const RegisterNewUser = async (props) => {
   const { id, password, name, authCode } = props;
   const { _authCode } = await loadAuthCode();

   if (authCode !== _authCode) {
      resResult.message = "인증코드를 확인해주세요.";
      return resResult;
   }

   await fireAuth
      .createUserWithEmailAndPassword(id + "@gongmoja.com", password)
      .then(async (user) => {
         resResult.res = user;
         resResult.message = "회원가입이 완료되었습니다.";
         await DB_NewUserInfo(id, name);
      })
      .catch((err) => {
         console.error(err);
         resResult.res = err;
         switch (err.code) {
            case "auth/email-already-in-use":
               return (resResult.message = "이미 존재하는 아이디입니다.");
            case "auth/weak-password":
               return (resResult.message =
                  "6자리 이상의 비밀번호를 입력해주세요.");
            default:
               return (resResult.message =
                  "오류 발생\n서포터즈에게 문의바랍니다.");
         }
      });

   return resResult;
};

export const SignInUser = (props) => async (dispatch) => {
   const { id, password } = props;

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
               return (resResult.message =
                  "비밀번호를 다시 한번 확인해주세요.");
            default:
               return (resResult.message =
                  "오류 발생\n서포터즈에게 문의바랍니다.");
         }
      });

   return resResult;
};

const DB_NewUserInfo = async (id, name) => {
   await fireDatabase
      .ref("users/" + id)
      .set({
         id,
         name,
         isSupporter: false,
         isAuth: true,
      })
      .then((res) => {
         console.info("회원가입 데이터 업로드 성공");
      })
      .catch((err) => {
         console.error(err);
         alert("데이터 업로드 실패");
      });
};

// DB 에서 유저 정보 불러오기
export const DB_LoadUserInfo = (id) => async (dispatch) => {
   await fireDatabase
      .ref(`users/${id}`)
      .once("value")
      .then((snapShot) => {
         console.info(snapShot.val());
         dispatch({
            type: LOGIN,
            payload: snapShot.val(),
         });
      });
};
