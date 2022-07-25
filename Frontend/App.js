import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Navigation from './src/navigation';
import {Authentication, CreateUser, ForgotPassword} from './src/screens';
import Configure from './src/store/configure';

const Stack = createStackNavigator();
const store = Configure();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Authentication}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Root"
        component={Navigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
