import {RESET_WATER, APP_READY, ADJUST_WATER, USER_AUTH} from '../Constants';

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
    default:
      return state;
  }
};

export default CountReducer;
