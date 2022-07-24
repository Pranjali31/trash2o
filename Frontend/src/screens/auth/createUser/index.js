import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {updateUserAuthentication} from '../../../store/actions';
import {useDispatch} from 'react-redux';
import {Button} from '@rneui/themed';

const CreateUser = ({navigation}) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async () => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          updateUserLogState(email, password);
          Alert.alert('Success', 'New user created Successfully');
          navigation.navigate('Root');
        });
    } catch (error) {
      console.log('error', error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Authentication Error',
          JSON.stringify('That email address is already in use!'),
        );
      } else {
        Alert.alert(
          'Error',
          'There is Something wrong with the Server, Please try again later',
        );
      }
    }
  };

  const updateUserLogState = async (userEmail, userPassword) => {
    let user = {
      email: userEmail,
      password: userPassword,
      firstName: firstName,
      lastName: lastName,
      new: true,
    };
    await dispatch(updateUserAuthentication(user));
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 200}}>
      <KeyboardAvoidingView style={styles.screen} behavior="height">
        <Text style={styles.title}>Welcome to tras.2ho</Text>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'gray'}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first Name"
          keyboardType="email-address"
          autoCompleteType="off"
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholderTextColor={'gray'}
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last Name"
          keyboardType="email-address"
          autoCompleteType="off"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholderTextColor={'gray'}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your E-mail"
          keyboardType="email-address"
          autoCompleteType="off"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'gray'}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your Password"
          secureTextEntry={true}
        />
        <View style={styles.buttons}>
          <Button
            title="Create My Account"
            titleStyle={{paddingTop: '1%'}}
            onPress={() => createUser(email, password)}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateUser;

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
