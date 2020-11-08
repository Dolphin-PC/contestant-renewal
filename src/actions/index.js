import { TEST } from "../reducers/type";

export const testFunc = (value) => {
   return {
      type: TEST,
      payload: value,
   };
};

// redux-thunk
export const testFuncAsync = (value) => async (dispatch) => {
   setTimeout(() => {
      dispatch(testFunc(value));
   }, 1000);
};
