import React from 'react';
import { Text, View } from 'react-native';
import Button from '../Button';

export const OrderLineRight = ({ showTime }: { showTime?: boolean }) => {
  return (
    <View className="self-end">
      {!showTime ? (
        <Button
          bodyClass="bg-white px-5 border border-alt-2 h-8"
          textClass="text-main-blue"
        >
          Start
        </Button>
      ) : (
        <Text className="text-primary font-Mulish-Bold text-xs">8:45pm</Text>
      )}
    </View>
  );
};
