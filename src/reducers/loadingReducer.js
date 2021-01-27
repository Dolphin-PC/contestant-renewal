import { LOADING } from "actions/types";

const initialState = {
  loading: false,
  message: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.loading,
        message: action.payload,
      };

    default:
      return state;
  }
};
