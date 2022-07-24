import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ListItem, Avatar} from '@rneui/themed';
import {getBrandName, getCategoryName} from '../../utils/functions';
import {useSelector} from 'react-redux';
import colors from '../../theme/colors';

const Report = () => {
  const [logs, setlogs] = useState([]);
  const [topLogs, setTopLogs] = useState([]);

  const screenWidth = Dimensions.get('window').width;
  const userAuth = useSelector(state => state.trashApp.userAuth);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  useFocusEffect(
    React.useCallback(() => {
      getLogsFromDB();
    }, []),
  );

  useEffect(() => {
    let sortedArray = logs;
    sortedArray = sortedArray?.sort((a, b) => {
      return b.totalWaterSaved - a.totalWaterSaved;
    });
    setTopLogs(sortedArray?.slice(0, 3));
  }, [logs]);

  const getLogsFromDB = () => {
    database()
      .ref('/trash/userRecords')
      .limitToLast(7)
      .once('value')
      .then(value => {
        let userLogs = Object.values(value.val())?.filter(item => {
          return item.email === userAuth.email;
        });
        setlogs(userLogs);
      });
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      {logs?.length > 0 && (
        <View style={{padding: '2%'}}>
          <Text style={{fontSize: 18}}>Your latest {logs?.length} Logs </Text>
        </View>
      )}

      {logs?.length > 0 && (
        <LineChart
          data={{
            labels: [
              'Log 7',
              'Log 6',
              'Log 5',
              'Log 4',
              'Log 3',
              'Log 2',
              'Log 1',
            ],
            datasets: [
              {
                data: logs?.map(item => {
                  return item?.totalWaterSaved;
                }),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2, // optional
              },
            ],
            legend: ['Total Comsumption'], // optional
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
      )}
      <View style={{flex: 1}}>
        {topLogs?.length > 0 ? (
          <Text style={styles.listTitleStyle}>Top #3 Comsumed Items</Text>
        ) : null}
        {topLogs?.length > 0 &&
          topLogs?.map((l, index) => {
            return (
              <ListItem key={index} bottomDivider style={{flex: 1}}>
                <Avatar
                  icon={{
                    name: 'cup',
                    type: 'entypo',
                    color: colors.lightRed,
                    size: 30,
                  }}
                />
                <ListItem.Content>
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
            );
          })}
      </View>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  listTitleStyle: {
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 20,
  },
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
