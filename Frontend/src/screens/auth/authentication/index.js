import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const Authentication = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToHome = () => {
    navigation.navigate('Root');
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
          onPress={() => route.params.signin(email, password, navigateToHome)}
        />
        <Button
          title="Create"
          onPress={() => route.params.createUser(email, password)}
        />
      </View>
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
