import { LOADING, LOGIN, LOGOUT } from "actions/types";

const initialState = {
  status: false,
  userInfo: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        status: true,
        userInfo: action.payload,
        loading: false,
      };

    case LOGOUT:
      return {
        userInfo: null,
        status: false,
        loading: false,
      };

    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      };

    default:
      return state;
  }
};
