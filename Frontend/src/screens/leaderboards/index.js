import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';

const LeaderBoards = () => {
  const [logs, setlogs] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const userAuth = useSelector(state => state.trashApp.userAuth);

  useFocusEffect(
    React.useCallback(() => {
      getLogsFromDB();
    }, []),
  );

  useEffect(() => {
    let oldDirectory = logs;
    let newDirectory = [];
    let tempDirectory =
      logs?.length > 0
        ? Object.values(
            oldDirectory?.reduce((acc, item) => {
              if (!acc[item.email]) {
                acc[item.email] = {
                  email: item.email ? item.email : 'others',
                  firstName: item.firstName,
                  lastName: item.lastName,
                  data: [],
                };
              }
              acc[item.email].data.push(item.pointsEarned);
              return acc;
            }, {}),
          )
        : [];

    tempDirectory.map(item => {
      let result = item?.data?.reduce(
        (total, point) => (total = total + point),
      );
      newDirectory = [...newDirectory, {...item, total: result}];
    });
    newDirectory = newDirectory?.sort((a, b) => {
      return b.total - a.total;
    });
    setSortedData(newDirectory);
  }, [logs]);

  const getLogsFromDB = () => {
    database()
      .ref('/trash/userRecords')
      .once('value')
      .then(value => {
        let userLogs = Object.values(value.val());
        setlogs(userLogs);
      });
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View style={styles.titleStyle}>
        <Text style={{flex: 1}}>Sr.</Text>
        <Text style={{flex: 5}}>Name</Text>
        <Text style={{flex: 2}}>Total Points</Text>
      </View>
      {sortedData?.map((item, index) => (
        <View
          key={index}
          style={styles.listContainer(item?.email === userAuth.email)}>
          <Text style={{flex: 1}}>
            {index + 1}
            {').'}
          </Text>
          <Text style={{flex: 5}}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={{flex: 2}}>{item.total}</Text>
        </View>
      ))}
    </View>
  );
};

export default LeaderBoards;

const styles = StyleSheet.create({
  listContainer: isUser => {
    return {
      flexDirection: 'row',
      backgroundColor: isUser ? '#4f7dc9' : '#162030',
      padding: '5%',
      marginVertical: 1,
    };
  },
  titleStyle: {
    flexDirection: 'row',
    backgroundColor: '#08224d',
    padding: '5%',
    marginVertical: 1,
  },
});
