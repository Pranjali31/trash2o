import {APP_READY, ADJUST_WATER, RESET_WATER, USER_AUTH} from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  return {type: USER_AUTH, payload: authState};
};
