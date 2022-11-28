import React from 'react';
import { View } from 'react-native';
import { CheckRound } from '../Form';

export const OrderLineRightCheck = ({ checked }: { checked: boolean }) => {
  return (
    <View className="flex-row self-start">
      <CheckRound checked={checked} multiple />
    </View>
  );
};
