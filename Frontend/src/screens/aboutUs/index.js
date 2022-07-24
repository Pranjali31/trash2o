import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textStyle}>
        Tras.h2O is a one stop solution for getting to know the refill stations
        that are avaible nearby as well as recording the data of the usage and
        frequency of the refilling ,For each activity perfomred few points are
        added into the users account which could be used to redeem for a coupon
        from the ones that are availble. Our Mission
      </Text>
      <Text style={styles.text2Style}>
        Tras.h2O's objective is to provide a platform and service that could
        contribute to the reusability of containers as well as motivate users to
        go green as well as encourage others to join in.
      </Text>
      <Text style={styles.text2Style}>Get to Know our team: </Text>
      <Text style={styles.text3Style}>Ayush Kaushik Mistry </Text>
      <Text style={styles.text3Style}>Harsh Bharath Nimmakuri </Text>
      <Text style={styles.text3Style}>Karan Amitkumar Zaveri</Text>
      <Text style={styles.text3Style}>Marc Smith</Text>
      <Text style={styles.text3Style}>Parth Ashokbhai Patel </Text>
      <Text style={styles.text3Style}>Pranjali Mukeshkumar Prajapati</Text>
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#5da9f0',
    flex: 1,
    paddingHorizontal: 10,
  },
  textStyle: {
    paddingHorizontal: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
  },
  text2Style: {
    paddingTop: 20,
    paddingHorizontal: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
  },
  text3Style: {
    paddingTop: 20,
    paddingHorizontal: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
  },
});
