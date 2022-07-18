import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Alert, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Navigation from './src/navigation';
import {Authentication} from './src/screens';
import Configure from './src/store/configure';

const Stack = createStackNavigator();
const store = Configure();

const createUser = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    Alert.alert('Success');
    // navigation.naviagte('Root');
  } catch (error) {
    Alert.alert('', JSON.stringify(error));
  }
};

const signin = async (email, password, navigateToHome) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    Alert.alert('Success');
    navigateToHome();
  } catch (error) {
    Alert.alert('', JSON.stringify(error));
  }
};

export default function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  // // const dispatch = useDispatch();
  // // const updateAuthenticationStatus = async status => {
  // //   await dispatch(updateUserAuthentication(status));
  // // };

  // auth().onAuthStateChanged(user => {
  //   if (user) {
  //     // updateAuthenticationStatus(true);
  //     setAuthenticated(true);
  //   } else {
  //     // updateAuthenticationStatus(false);
  //     setAuthenticated(false);
  //   }
  // });

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
        initialParams={{createUser: createUser, signin: signin}}
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
