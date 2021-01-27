import {
  GET_SEASONS,
  GET_LOGS,
  GET_ATTENTION,
  GET_VOTES,
  SET_SEASON,
  ADD_SEASONS,
  ADD_LOGS,
} from "actions/types";

const initialState = {
  seasons: [],
  logs: [],
  attention: [],
  votes: [],
  currentSeason: null,
  currentLog: null,
  currentAttention: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEASONS:
      return {
        ...state,
        seasons: action.payload,
      };

    case ADD_SEASONS:
      return {
        ...state,
        seasons: [...state.seasons, action.payload],
      };

    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
      };

    case ADD_LOGS:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };

    case GET_ATTENTION:
      return {
        ...state,
        attention: action.payload,
      };

    case GET_VOTES:
      return {
        ...state,
        votes: action.payload,
      };

    case SET_SEASON:
      return {
        ...state,
        currentSeason: action.payload,
      };

    default:
      return state;
  }
};
