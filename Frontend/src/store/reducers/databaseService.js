import database from '@react-native-firebase/database';
import moment from 'moment';

export const addWaterToDB = item => {
  database()
    .ref('/trash/userRecords')
    .push({
      email: item.email,
      waterQty: item.waterQty,
      totalCups: item.totalCups,
      totalWaterSaved: item.totalWaterSaved,
      date: moment().format(),
      pointsEarned: item.totalWaterSaved,
    })
    .then(() => console.log('Data updated.'));
};

export const getUserRecords = item => {
  // database()
  //   .ref('/trash/userRecords')
  //   .once('value')
  //   .then(value => console.log('value', value.val()));
};
