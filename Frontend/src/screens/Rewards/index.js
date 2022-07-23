import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';
import {Chip} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

const Rewards = () => {
  const [logs, setlogs] = useState([]);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getLogsFromDB();
    }, []),
  );

  useEffect(() => {
    let totalPoints = 0;
    logs?.length > 0 &&
      logs.map((item, index) => {
        totalPoints = totalPoints + item.pointsEarned;
      });
    setTotal(totalPoints);
  }, [logs]);

  const getLogsFromDB = () => {
    database()
      .ref('/trash/userRecords')
      .once('value')
      .then(value => {
        setlogs(Object.values(value.val()));
      });
  };

  return (
    <View>
      <Chip
        title={'Total Points ' + total}
        icon={{
          name: 'star',
          type: 'entypo',
          size: 20,
          color: 'white',
        }}
        containerStyle={{marginVertical: 15, marginHorizontal: 30}}
      />
    </View>
  );
};

export default Rewards;
