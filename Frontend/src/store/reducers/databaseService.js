import database from '@react-native-firebase/database';
import moment from 'moment';
import {calculateRewardPoints} from '../../utils/functions';

export const addWaterToDB = item => {
  database()
    .ref('/trash/userRecords')
    .push({
      email: item.email,
      waterQty: item.waterQty,
      totalCups: item.totalCups,
      totalWaterSaved: item.totalWaterSaved,
      date: moment().format(),
      pointsEarned: calculateRewardPoints(item.category),
      brand: item.brand,
      category: item.category,
      firstName: item.firstName,
      lastName: item.lastName,
    })
    .then(() => console.log('Data updated.'));
};

export const createUserToDB = item => {
  database()
    .ref('/trash/users')
    .push({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      password: item.password,
    })
    .then(() => console.log('Created New User.'));
};
