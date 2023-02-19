import React from 'react';
import { Linking, View } from 'react-native';
import { CallIcon, MessageIcon } from 'assets/icons';

export const OrderLineRightCall = ({ phone }: { phone: string }) => {
  return (
    <View className="flex-row self-start">
      <CallIcon onPress={() => Linking.openURL(`tel:${phone}`)} />
      <MessageIcon
        className="ml-1"
        onPress={() => Linking.openURL(`sms:${phone}`)}
      />
    </View>
  );
};
