import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {BackHandler} from 'react-native';
import auth from '@react-native-firebase/auth';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          props.navigation.closeDrawer();
          auth().signOut();
          props.navigateToAuth();
        }}
      />
      <DrawerItem
        label="Exit"
        onPress={() => {
          props.navigation.toggleDrawer();
          BackHandler.exitApp();
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
