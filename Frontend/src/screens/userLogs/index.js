import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';
import {Avatar, ListItem, Chip} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../theme/colors';
import {useSelector} from 'react-redux';
import {getBrandName, getCategoryName} from '../../utils/functions';
import moment from 'moment';

const UserLogs = () => {
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
      <ScrollView style={{marginBottom: '20%'}}>
        {logs?.length > 0 ? (
          logs?.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar
                icon={{
                  name: 'cup',
                  type: 'entypo',
                  color: Colors.lightRed,
                  size: 30,
                }}
              />
              <ListItem.Content>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <ListItem.Title style={styles.titleStyle}>
                    {'Log ' + (logs?.length - i)}
                  </ListItem.Title>
                  <ListItem.Title style={styles.title2Style}>
                    {moment(l.date).format('MMMM Do YYYY, h:mm:ss a')}
                  </ListItem.Title>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <ListItem.Subtitle style={{color: 'blue', fontSize: 20}}>
                    {l.totalCups}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{paddingTop: 5}}>
                    {'x times comsumed  '}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{color: 'blue', fontSize: 20}}>
                    {l.waterQty}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{paddingTop: 5}}>
                    {' ounces'}
                  </ListItem.Subtitle>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <ListItem.Subtitle style={{paddingTop: 5}}>
                    {'Reward Earned: '}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{color: 'red', fontSize: 20}}>
                    {l.pointsEarned}
                  </ListItem.Subtitle>
                </View>
                <View style={styles.subtitleViewStyle}>
                  <ListItem.Subtitle style={styles.subtitleLabelStyle}>
                    {'Brand Name: '}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{fontWeight: 'bold'}}>
                    {getBrandName(l.brand)?.label}
                  </ListItem.Subtitle>
                </View>
                <View style={styles.subtitleViewStyle}>
                  <ListItem.Subtitle style={styles.subtitleLabelStyle}>
                    {'Category Name: '}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{fontWeight: 'bold'}}>
                    {getCategoryName(l.category)?.label}
                  </ListItem.Subtitle>
                </View>
                <View style={styles.subtitleViewStyle}>
                  <ListItem.Subtitle style={styles.subtitleLabelStyle}>
                    {'Total: '}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{fontWeight: 'bold'}}>
                    {l.totalWaterSaved}
                  </ListItem.Subtitle>
                </View>
              </ListItem.Content>
            </ListItem>
          ))
        ) : (
          <Text>No Records Yet </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default UserLogs;

const styles = StyleSheet.create({
  titleStyle: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  subtitleViewStyle: {
    flexDirection: 'row',
  },
  subtitleLabelStyle: {
    fontStyle: 'italic',
  },
  title2Style: {
    paddingLeft: 80,
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 2,
  },
});
