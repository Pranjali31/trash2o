import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Icons} from '../../components/atoms';
import RouteName from '../../navigation/RouteNames';
import Colors from '../../theme/colors';
import AddLogScreen from '../addLogScreen';
import RefillLocations from '../refillLocations';
import UserLogs from '../userLogs';

const BottomTab = createBottomTabNavigator();

const Home = ({navigation}) => {
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        style: {
          activeTintColor: Colors.accentColorWhite,
          backgroundColor: Colors.primaryColor,
        },
        activeTintColor: Colors.accentColorBlue,
      }}>
      <BottomTab.Screen
        name={RouteName.ADDLOG}
        component={AddLogScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icons name={'md-water'} type={'ionicon'} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={RouteName.REFILL}
        component={RefillLocations}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icons
              name={'fountain'}
              type={'material-community'}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={RouteName.USERLOGS}
        component={UserLogs}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icons name={'journal'} type={'ionicon'} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default Home;
