import { Button, Chip, Paper, TextField } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { UpdateAskPermission, UpdateUserInfo } from "actions/dbActions";
import { fireAuth } from "app/initFirebase";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";

const MyInfoPageView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [isEditable, setIsEditable] = useState(false);
  const [info, setInfo] = useState({
    id: "",
    name: "",
    property: "",
    isAuth: false,
    isSupporter: false,
  });

  const handleOnModify = () => {
    if (isEditable) {
      if (info.name === "") return alert("[이름]을 입력해주세요.");
      if (info.property === "") return alert("학교/학과를 입력해주세요.");
      if (!info.property.includes("/"))
        return alert("/(슬래시)로 학교와 학과를 구분하여 입력해주세요.");

      if (window.confirm("내 정보를 수정하시겠습니까?")) {
        dispatch(UpdateUserInfo(info));
        setIsEditable(false);
      }
    } else {
      setIsEditable(true);
    }
  };

  const handleOnChangeModifyInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnAskPermission = (code) => {
    dispatch(UpdateAskPermission(info, code));
  };

  const handleOnPasswordReset = () => {
    if (window.confirm("비밀번호 재설정 이메일을 발송하시겠습니까?")) {
      const emailAddress = user.userInfo.id + "@" + user.userInfo.mail;

      fireAuth
        .sendPasswordResetEmail(emailAddress)
        .then(() => {
          alert("비밀번호 재설정 이메일을 전송했습니다.");
        })
        .catch((err) => {
          console.error(err);
          alert("비밀번호 재설정 이메일 발송에 실패하였습니다.");
        });
    }
  };

  const handleBack = () => {
    setIsEditable(false);
  };

  useEffect(() => {
    if (user.userInfo !== null) {
      setInfo(user.userInfo);
    } else {
      history.push("/");
    }
  }, [user]);

  return (
    <div className="Center">
      <Paper elevation={3} className="My-Paper">
        <header>
          {isEditable ? <ArrowBack onClick={handleBack} /> : ""}
          <Chip label="내 정보" color="primary" />
        </header>

        <hr />

        <article>
          <TextFormat
            name="id"
            isEditable={isEditable}
            title="ID"
            content={info.id}
            handleOnChange={handleOnChangeModifyInfo}
          />
          <TextFormat
            name="name"
            isEditable={isEditable}
            title="이름"
            content={info.name}
            handleOnChange={handleOnChangeModifyInfo}
          />
          <TextFormat
            name="property"
            isEditable={isEditable}
            title="학교/학과"
            content={info.property}
            handleOnChange={handleOnChangeModifyInfo}
          />
          <AuthFormat
            name="isAuth"
            isEditable={isEditable}
            title="인증"
            content={info.isAuth ? "인증" : "미인증"}
            handleOnAskPermission={handleOnAskPermission}
          />
          <AuthFormat
            name="isSupporter"
            isEditable={isEditable}
            title="서포터즈"
            content={info.isSupporter ? "인증" : "미인증"}
            handleOnAskPermission={handleOnAskPermission}
          />
        </article>

        <hr />

        <footer>
          <Button variant="contained" color="primary" onClick={handleOnModify}>
            {isEditable ? "저장하기" : "수정하기"}
          </Button>
          &emsp;
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOnPasswordReset}
          >
            비밀번호 재설정
          </Button>
        </footer>
      </Paper>
    </div>
  );
};

const TextFormat = ({ name, title, content, isEditable, handleOnChange }) => {
  if (isEditable) {
    switch (title) {
      case "ID":
        return (
          <div className="Text-Format">
            <small>{title}</small>
            <TextField
              disabled
              name={name}
              value={content}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        );
      case "이름":
      case "학교/학과":
        return (
          <div className="Text-Format">
            <small>{title}</small>
            <TextField
              name={name}
              value={content}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        );

      default:
        return;
    }
  } else {
    return (
      <div className="Text-Format">
        <small>{title}</small>
        <h5>{content}</h5>
      </div>
    );
  }
};

TextFormat.defaultProps = {
  title: "ID",
  content: "아이디",
};

const AuthFormat = ({
  name,
  title,
  content,
  isEditable,
  handleOnAskPermission,
}) => {
  const [permissionCode, setPermissionCode] = useState("");

  if (isEditable) {
    switch (title) {
      case "인증":
      case "서포터즈":
        if (content === "미인증") {
          return (
            <div className="Text-Format">
              <small>{title}</small>
              <TextField
                value={permissionCode}
                onChange={(e) => setPermissionCode(e.target.value)}
                placeholder="인증코드를 입력해주세요."
              />
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => handleOnAskPermission(permissionCode)}
              >
                인증
              </Button>
            </div>
          );
        }
        return (
          <div className="Text-Format">
            <small>{title}</small>
            <h5>{content}</h5>
          </div>
        );

      default:
        return;
    }
  } else {
    return (
      <div className="Text-Format">
        <small>{title}</small>
        <h5>{content}</h5>
      </div>
    );
  }
};

export default MyInfoPageView;
