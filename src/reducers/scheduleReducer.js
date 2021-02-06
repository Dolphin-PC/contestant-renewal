import { GET_SCHEDULES } from "actions/types";

const initialState = {
  schedules: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULES:
      return {
        schedules: action.payload,
      };

    default:
      return state;
  }
};
