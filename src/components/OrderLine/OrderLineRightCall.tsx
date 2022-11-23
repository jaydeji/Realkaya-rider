import React from 'react';
import { Linking, View } from 'react-native';
import { CallIcon } from '../../assets/icons/Call';
import { MessageIcon } from '../../assets/icons/Message';

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
