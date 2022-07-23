import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {updateUserAuthentication} from '../../../store/actions';
import {useDispatch} from 'react-redux';

const Authentication = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToHome = () => {
    navigation.navigate('Root');
  };

  const updateUserLogState = async (userEmail, userPassword) => {
    let user = {
      email: userEmail,
      password: userPassword,
    };
    await dispatch(updateUserAuthentication(user));
  };

  const createUser = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // navigation.naviagte('Root');
    } catch (error) {
      Alert.alert('', JSON.stringify(error));
    }
  };

  const signin = async () => {
    try {
      console.log('email', email);
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success');
      navigateToHome();
    } catch (error) {
      console.log('error', error);
      Alert.alert('', JSON.stringify(error));
    }
  };

  const onSkipPress = () => {
    updateUserLogState('test@123.com', '123');
    navigateToHome();
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Login/Sigup to tras.2ho</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCompleteType="off"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.buttons}>
        <Button
          title="signin"
          onPress={() => signin(email, password, navigateToHome)}
        />
        <Button title="Create" onPress={() => createUser(email, password)} />
      </View>
      <TouchableHighlight
        underlayColor={'blue'}
        activeOpacity={0.1}
        onPress={() => {
          onSkipPress();
        }}>
        <Text style={{color: 'black', paddingTop: 10}}>SKIP</Text>
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
    width: 150,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
