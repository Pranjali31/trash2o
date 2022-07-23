import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const Report = () => {
  const [logs, setlogs] = useState([]);

  const screenWidth = Dimensions.get('window').width;

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

  const getLogsFromDB = () => {
    database()
      .ref('/trash/userRecords')
      .limitToLast(7)
      .once('value')
      .then(value => {
        setlogs(Object.values(value.val()));
      });
  };

  return (
    <View style={{backgroundColor: 'black'}}>
      <View style={{padding: '2%'}}>
        <Text>Your latest 7 Logs </Text>
      </View>

      {logs.length > 0 && (
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
                data: logs.map(item => {
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
    </View>
  );
};

export default Report;
