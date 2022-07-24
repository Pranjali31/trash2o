import {View, Text} from 'react-native';
import React from 'react';

const AboutUs = () => {
  return (
    <View style={{paddingVertical: 20, backgroundColor: '#5da9f0', flex: 1}}>
      <Text
        style={{
          paddingHorizontal: 10,
          fontStyle: 'italic',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        Tras.h20 is a one stop solution for getting to know the refill stations
        that are avaible nearby as well as recording the data of the usage and
        frequency of the refilling ,For each activity perfomred few points are
        added into the users account which could be used to redeem for a coupon
        from the ones that are availble.
      </Text>
    </View>
  );
};

export default AboutUs;
