import {
  RESET_WATER,
  APP_READY,
  ADJUST_WATER,
  USER_AUTH,
  ADD_WATER,
  GET_LOGS,
  CREATE_USER,
} from '../Constants';

const initialState = {
  waterProgress: 0,
  userAuth: false,
};

const CountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADJUST_WATER:
      return {
        ...state,
        waterProgress: action.payload,
      };
    case RESET_WATER:
      return {
        ...state,
        waterProgress: 0,
      };
    case APP_READY:
      return {
        ...state,
        isAppReady: true,
      };
    case USER_AUTH:
      return {
        ...state,
        userAuth: action.payload,
      };
    case ADD_WATER:
      return {
        ...state,
        addWater: action.payload,
      };
    case GET_LOGS:
      return {
        ...state,
        addWater: action.payload,
      };
    default:
      return state;
  }
};

export default CountReducer;
