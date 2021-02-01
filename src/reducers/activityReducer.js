import {
  GET_SEASONS,
  GET_TEAMS,
  GET_ATTENTION,
  GET_VOTES,
  SET_SEASON,
  ADD_SEASONS,
  ADD_TEAMS,
  SET_TEAM,
  GET_MEMBERS,
  SET_LOG,
} from "actions/types";

const initialState = {
  seasons: [],
  teams: [],
  attention: [],
  votes: [],
  memberList: [],
  currentSeason: "",
  currentTeam: "",
  currentAttention: "",
  currentLog: "",
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

    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };

    case ADD_TEAMS:
      return {
        ...state,
        teams: [...state.teams, action.payload],
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

    case SET_TEAM:
      return {
        ...state,
        currentTeam: action.payload,
      };

    case GET_MEMBERS:
      return {
        ...state,
        memberList: action.payload,
      };

    case SET_LOG:
      return {
        ...state,
        currentLog: action.payload,
      };

    default:
      return state;
  }
};
