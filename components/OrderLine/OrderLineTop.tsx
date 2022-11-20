import React from 'react';
import { Text, View } from 'react-native';
import { Order } from '../../types';

export const OrderLineTop = ({
  hideAmount,
  order,
}: {
  hideAmount?: boolean;
  order: Order;
}) => {
  const { distance, orderId } = order;
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Text className="text-primary font-Mulish-Bold text-sm">
          Order {orderId}
        </Text>
        <Text className="py-[6px] px-[15px] text-main-blue bg-main-blue/20 rounded-[5px] ml-[10px] font-Mulish-Bold text-[10px]">
          {(distance / 1000).toFixed(2)}km
        </Text>
      </View>
      {!hideAmount && (
        <Text className="text-primary font-Mulish-Bold text-xs">₦300</Text>
      )}
    </View>
  );
};
