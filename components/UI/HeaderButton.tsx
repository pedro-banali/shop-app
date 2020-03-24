import React, { FC } from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';

export const CustomHeaderButton: FC<any> = ({ ...props }) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={
        Platform.OS === 'android' ? Colors.contrastPrimary : Colors.primary
      }
    />
  );
};
