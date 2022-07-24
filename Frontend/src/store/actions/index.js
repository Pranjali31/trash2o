import {
  APP_READY,
  ADJUST_WATER,
  RESET_WATER,
  USER_AUTH,
  ADD_WATER,
  GET_LOGS,
} from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addWaterToDB,
  createUserToDB,
  getUserRecords,
} from '../reducers/databaseService';

export const setAppReady = () => {
  return {type: APP_READY};
};

export const updateDailyConsumption = adjustedWater => {
  try {
    AsyncStorage.setItem('waterProgress', JSON.stringify(adjustedWater));
  } catch (err) {
    console.log(err);
  }
  return {type: ADJUST_WATER, payload: adjustedWater};
};

export const resetDailyConsumption = () => {
  try {
    AsyncStorage.setItem('waterProgress', JSON.stringify(0));
  } catch (err) {
    console.log(err);
  }
  return {type: RESET_WATER};
};

export const updateUserAuthentication = authState => {
  if (authState.new) {
    createUserToDB(authState);
  }
  return {type: USER_AUTH, payload: authState};
};

export const addWater = data => {
  addWaterToDB(data);
  return {type: ADD_WATER, payload: data};
};

export const getLogs = data => {
  const reference = getUserRecords(data);
  return {type: GET_LOGS, payload: reference};
};
