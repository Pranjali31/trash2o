import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Button} from '@rneui/themed';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateUserAuthentication} from '../../../store/actions';

const Authentication = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToHome = () => {
    navigation.navigate('Root');
  };

  const navigateToCreateUser = () => {
    navigation.navigate('CreateUser');
  };

  const updateUserLogState = async (userEmail, userPassword) => {
    let userData = {};
    await database()
      .ref('/trash/users')
      .once('value')
      .then(value => {
        userData = Object.values(value.val())?.find(item => {
          return item.email === userEmail;
        });
        console.log('value', value, userData);
      });
    let user = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userEmail,
      password: userPassword,
    };
    await dispatch(updateUserAuthentication(user));
  };

  const signin = async () => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert('Success', 'Login Successfull');
          updateUserLogState(email, password);
          navigateToHome();
        });
    } catch (error) {
      console.log('error', error.code);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Authentication Error',
          'That email address is already in use!',
        );
      } else if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert(
          'Authentication Error',
          'That email address or password is invalid!',
        );
      } else {
        Alert.alert(
          'Error',
          'There is Something wrong with the Server, Please try again later',
        );
      }
    }
  };

  const onSkipPress = () => {
    updateUserLogState('test@123.com', '123');
    navigateToHome();
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tras.2ho</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Please enter e-mail Id"
        keyboardType="email-address"
        autoCompleteType="off"
        placeholderTextColor={'gray'}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Please enter Password"
        secureTextEntry={true}
        placeholderTextColor={'gray'}
      />
      <View style={styles.buttons}>
        <Button
          buttonStyle={{
            borderRadius: 10,
            borderWidth: 5,
            borderColor: 'black',
          }}
          raised
          titleStyle={{paddingVertical: 5, paddingHorizontal: 10}}
          size="md"
          title="Sign In"
          onPress={() => signin(email, password, navigateToHome)}
        />
        <Button
          buttonStyle={{
            borderRadius: 10,
            borderWidth: 5,
            borderColor: 'black',
          }}
          style
          raised
          titleStyle={{paddingVertical: 5, paddingHorizontal: 10}}
          size="md"
          title="Sign Up"
          onPress={() => navigateToCreateUser()}
        />
      </View>
      <TouchableHighlight
        style={{paddingTop: 10}}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          onSkipPress();
        }}>
        <Text style={{color: 'black', paddingTop: 10, fontSize: 10}}>SKIP</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe2f0',
  },
  title: {
    color: '#143b7a',
    fontSize: 40,
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
    width: 230,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
