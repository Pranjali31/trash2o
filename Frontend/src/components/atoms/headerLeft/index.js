import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icons from '../Icons';

const HeaderLeft = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{marginHorizontal: 10}}>
      <Icons name={'menu'} type={'feather'} color={'white'} size={30} />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
