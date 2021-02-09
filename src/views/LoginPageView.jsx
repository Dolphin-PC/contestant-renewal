import { Paper, Tab, Tabs, TextField, Button } from "@material-ui/core";
import { RegisterNewUser, SignInUser } from "actions/firebaseActions";
import { a11yProps, TabPanel } from "functions/functions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const LoginPageView = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.status) {
      history.goBack();
    }
  }, [user]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="Center">
      <Paper elevation={3} className="login-form">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="로그인" {...a11yProps(0)} />
          <Tab label="회원가입" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <LoginRender />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegisterRender />
        </TabPanel>
      </Paper>
    </div>
  );
};

const LoginRender = () => {
  const [info, setInfo] = useState({
    id: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(SignInUser(info));
    alert(result.message);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form onSubmit={handleLogin}>
        <TextField
          required
          onChange={handleOnChange}
          fullWidth
          id="id"
          label="아이디"
          placeholder="ID"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          required
          onChange={handleOnChange}
          fullWidth
          type="password"
          id="password"
          label="비밀번호"
          placeholder="PASSWORD"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          로그인
        </Button>
      </form>
    </div>
  );
};

const RegisterRender = () => {
  const [info, setInfo] = useState({
    id: "",
    password: "",
    name: "",
    property: "",
    authCode: "",
  });
  const handleOnChange = (e) => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    RegisterNewUser(info);
  };

  return (
    <div className="RegisterForm">
      <form onSubmit={handleRegister}>
        <TextField
          required
          onChange={handleOnChange}
          fullWidth
          type="email"
          id="id"
          label="아이디"
          placeholder="ID"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          required
          onChange={handleOnChange}
          fullWidth
          type="password"
          id="password"
          label="비밀번호"
          placeholder="PASSWORD"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          required
          onChange={handleOnChange}
          fullWidth
          type="text"
          id="name"
          label="이름"
          placeholder="예) 홍길동"
          helperText="회의록에 표시되오니, 본명을 입력하기 바랍니다."
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          required
          onChange={handleOnChange}
          fullWidth
          type="text"
          id="property"
          label="학교/학번"
          placeholder="예) 한림대학교/20211234"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          required
          onChange={handleOnChange}
          fullWidth
          type="text"
          id="authCode"
          label="인증코드"
          placeholder="공모자들 인증코드를 입력해주세요."
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
          type="submit"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default LoginPageView;
