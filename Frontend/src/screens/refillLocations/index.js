import {Text} from '@rneui/themed';
import React from 'react';
import {ScrollView, StyleSheet, TouchableHighlight} from 'react-native';
import {showLocation} from 'react-native-map-link';
import {refillLocationsData} from '../../utils/data';

const RefillLocations = () => {
  const onLocationPress = item => {
    showLocation({
      latitude: item?.Latitude,
      longitude: item?.Longitude,
      alwaysIncludeGoogle: true,
      directionsMode: 'walk',
    });
  };

  return (
    <ScrollView style={styles.screen}>
      {refillLocationsData?.map((item, index) => {
        return (
          <TouchableHighlight
            key={index}
            style={styles.container}
            onPress={() => {
              onLocationPress(item);
            }}>
            <>
              <Text style={styles.titleStyle}>{item?.Location}</Text>
              <Text style={styles.descriptionStyle}>{item?.Description}</Text>
            </>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
};

export default RefillLocations;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: 'black'},
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    marginVertical: 3,
  },
  titleStyle: {
    color: 'white',
    fontSize: 25,
  },
  descriptionStyle: {
    color: 'white',
    fontStyle: 'italic',
  },
});
