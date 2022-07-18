import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import HeaderTitle from '../headerTitle';
import Icons from '../Icons';

const HeaderRight = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{marginRight: 10}}>
      <Icons name={'settings'} type={'feather'} color={'white'} size={30} />
    </TouchableOpacity>
  );
};

export default HeaderRight;
