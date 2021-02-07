import { GET_PRESETS, GET_SCHEDULES } from "actions/types";

const initialState = {
  schedules: [],
  presets: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
      };

    case GET_PRESETS:
      return {
        ...state,
        presets: action.payload,
      };

    default:
      return state;
  }
};
