import React from 'react';
import { Linking, View } from 'react-native';
import { CallIcon, MessageIcon } from 'assets/icons';

export const OrderLineRightCall = () => {
  return (
    <View className="flex-row self-start">
      <CallIcon onPress={() => Linking.openURL('tel:0800800000')} />
      <MessageIcon
        className="ml-1"
        onPress={() => Linking.openURL('sms:0800800000')}
      />
    </View>
  );
};
