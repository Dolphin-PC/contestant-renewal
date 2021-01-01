import { Paper, Tab, Tabs, TextField, Button } from "@material-ui/core";
import { a11yProps, TabPanel } from "functions/functions";
import React, { useState } from "react";

const LoginPageView = () => {
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <div className="Center">
         <Paper elevation={3} style={{ padding: 50 }}>
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
   const handleOnChange = (e) => {
      setInfo({
         ...info,
         [e.target.id]: e.target.value,
      });
   };
   const handleLogin = () => {
      console.info(info);
   };

   return (
      <div style={{ display: "flex", flexDirection: "column" }}>
         <TextField
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
         <Button variant="contained" color="primary" onClick={handleLogin}>
            로그인
         </Button>
      </div>
   );
};

const RegisterRender = () => {
   const [info, setInfo] = useState({
      id: "",
      password: "",
      name: "",
      authCode: "",
   });
   const handleOnChange = (e) => {
      setInfo({
         ...info,
         [e.target.id]: e.target.value,
      });
   };
   const handleRegister = () => {
      console.info(info);
   };

   return (
      <div style={{ display: "flex", flexDirection: "column" }}>
         <TextField
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
         <Button variant="contained" color="primary" onClick={handleRegister}>
            회원가입
         </Button>
      </div>
   );
};

export default LoginPageView;
