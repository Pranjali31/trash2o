import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const onSendPress = async userEmail => {
    console.log(userEmail);
    if (userEmail?.trim() !== '') {
      try {
        await auth()
          .sendPasswordResetEmail(userEmail)
          .then(() => {
            Alert.alert('Success!!', 'Resend link succesfully sent');
            navigation.navigate('Auth');
          });
      } catch (error) {
        Alert.alert('Validation Error', error?.message);
      }
    } else {
      Alert.alert(
        'Validation Error',
        'Please enter a valid email-id to continue',
      );
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to tras.h2O</Text>
      <Text style={styles.label}>Forgot Password?</Text>
      <TextInput
        placeholderTextColor={'gray'}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your E-mail"
        keyboardType="email-address"
        autoCompleteType="off"
        maxLength={25}
      />
      <View style={styles.buttons}>
        <Button
          title="Send Email"
          titleStyle={{paddingTop: '1%'}}
          onPress={() => onSendPress(email)}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: '5%',
    paddingTop: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: '#143b7a',
    fontSize: 21,
    marginBottom: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  label: {
    alignSelf: 'flex-start',
    color: 'blue',
    fontSize: 16,
    paddingHorizontal: 30,
  },
  input: {
    color: 'black',
    width: 300,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6d69c3',
    marginVertical: 10,
    padding: 15,
  },
  buttons: {
    width: 200,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
