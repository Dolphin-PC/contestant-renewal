import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TEST } from "../reducers/type";
import { testFunc, testFuncAsync } from "../actions/index";

const LandingView = () => {
   const reduxData = useSelector((state) => state.user.test);
   const dispatch = useDispatch();

   const onClickButton = () => {
      dispatch(testFuncAsync("test 시발 됐다"));
   };

   return (
      <div>
         Landing Page View
         <p>{reduxData}</p>
         <button onClick={onClickButton}>CLICK ME</button>
      </div>
   );
};

export default LandingView;
