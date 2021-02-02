import { LOADING, LOGIN, LOGOUT } from "actions/types";

const initialState = {
  status: false,
  userInfo: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        status: true,
        userInfo: action.payload,
      };

    case LOGOUT:
      return {
        status: false,
        userInfo: null,
      };

    default:
      return state;
  }
};
