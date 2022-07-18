import React from 'react';
import {Icon} from '@rneui/themed';
import Colors from '../../../theme/colors';

const Icons = ({name, type, color, size}) => {
  return (
    <Icon
      name={name}
      type={type}
      color={color ? color : Colors.primaryColor}
      size={size ? size : 20}
    />
  );
};

export default Icons;
