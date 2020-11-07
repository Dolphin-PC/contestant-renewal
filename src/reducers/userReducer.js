import { TEST } from "./type";

const initialState = {
   test: "init test",
};

const user = (state = initialState, action = {}) => {
   switch (action.type) {
      case TEST:
         return {
            ...state,
            test: action.payload,
         };
      default:
         return state;
   }
};

export default user;
