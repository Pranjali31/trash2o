import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';
import {Chip, PricingCard} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {couponData} from '../../utils/data';
import {useSelector} from 'react-redux';

const Rewards = () => {
  const [logs, setlogs] = useState([]);
  const [total, setTotal] = useState(0);

  const userAuth = useSelector(state => state.trashApp.userAuth);

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
        let userLogs = Object.values(value.val())?.filter(item => {
          return item.email === userAuth.email;
        });
        setlogs(userLogs);
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
      <ScrollView style={{marginBottom: 50}}>
        {couponData.map((item, index) => {
          return (
            <View key={index}>
              <PricingCard
                color={item?.color}
                title={item?.title}
                price={item?.price}
                info={item?.info}
                button={item?.button}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Rewards;
