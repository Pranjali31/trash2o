import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from 'react';
import {HeaderRight} from '../components/atoms';
import {CustomDrawer} from '../components/molecules';
import {
  AboutUs,
  Home,
  LeaderBoards,
  Report,
  Rewards,
  UserProfile,
} from '../screens';
import Colors from '../theme/colors';
import RouteNames from './RouteNames';

const Drawer = createDrawerNavigator();

const Navigation = ({navigation}) => {
  return <RootNavigator navigation={navigation} />;
};

export default Navigation;

const RootNavigator = ({navigation}) => {
  const navigateToAuth = () => {
    navigation.navigate('Auth');
  };

  return (
    <Drawer.Navigator
      initialRouteName={RouteNames.HOME}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.accentColorBlue,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headersRight: () => <HeaderRight />,
      }}
      useLegacyImplementation
      drawerContent={props => (
        <CustomDrawer {...props} navigateToAuth={navigateToAuth} />
      )}>
      <Drawer.Screen
        name={RouteNames.HOME}
        component={Home}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name={RouteNames.USERPROFILE}
        component={UserProfile}
        options={{title: 'Profile'}}
      />
      <Drawer.Screen
        name={RouteNames.REPORT}
        component={Report}
        options={{title: 'Report'}}
      />
      <Drawer.Screen
        name={RouteNames.REWARDS}
        component={Rewards}
        options={{title: 'Rewards'}}
      />
      <Drawer.Screen
        name={RouteNames.LEADERBOARDS}
        component={LeaderBoards}
        options={{title: 'Leaderboards'}}
      />
      <Drawer.Screen
        name={RouteNames.ABOUTUS}
        component={AboutUs}
        options={{title: 'About Us'}}
      />
    </Drawer.Navigator>
  );
};
