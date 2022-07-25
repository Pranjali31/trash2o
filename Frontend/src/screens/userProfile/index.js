import database from '@react-native-firebase/database';
import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const UserProfile = () => {
  const userAuth = useSelector(state => state.trashApp.userAuth);
  const [logs, setlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [highestPoint, setHighestPoint] = useState(0);
  const [totalCups, setTotalCups] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getLogsFromDB();
    }, []),
  );

  useEffect(() => {
    let totalPoints = 0;
    let highestPoints = 0;
    let cups = 0;
    logs?.length > 0 &&
      logs.map((item, index) => {
        cups = cups + item?.totalCups;
        totalPoints = totalPoints + item.pointsEarned;
        if (highestPoints < item.pointsEarned) {
          highestPoints = item.pointsEarned;
        }
      });
    setTotal(totalPoints);
    setHighestPoint(highestPoints);
    setTotalCups(cups);
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
    <View style={styles.conatiner}>
      <Text style={styles.labelStyle}>First Name</Text>
      <Text style={styles.valueStyle}>{userAuth.firstName}</Text>
      <Text style={styles.labelStyle}>Last Name</Text>
      <Text style={styles.valueStyle}>{userAuth.lastName}</Text>
      <Text style={styles.labelStyle}>Email</Text>
      <Text style={styles.emailStyle}>{userAuth.email}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          paddingTop: 130,
        }}>
        <Text style={styles.statsLabelStyle}>Total Points Earned :</Text>
        <Text style={styles.statsValueStyle}>{total} oz</Text>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
        <Text style={styles.statsLabelStyle}>Highest Comsumption :</Text>
        <Text style={styles.statsValueStyle}>{highestPoint} oz</Text>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
        <Text style={styles.statsLabelStyle}>Total Cups used:</Text>
        <Text style={styles.statsValueStyle}>{totalCups} times</Text>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  conatiner: {
    paddingTop: 30,
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelStyle: {
    color: '#31c7cc',
    fontSize: 20,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    fontWeight: '900',
  },
  valueStyle: {
    paddingTop: 10,
    paddingBottom: 30,
    fontSize: 40,
    fontStyle: 'italic',
  },
  emailStyle: {
    paddingTop: 10,
    paddingBottom: 30,
    fontSize: 20,
    fontStyle: 'italic',
  },
  statsValueStyle: {
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 25,
    fontStyle: 'italic',
  },
  statsLabelStyle: {
    color: '#31c7cc',
    paddingTop: 10,
    paddingLeft: 20,
    fontSize: 25,
    fontStyle: 'italic',
  },
});
