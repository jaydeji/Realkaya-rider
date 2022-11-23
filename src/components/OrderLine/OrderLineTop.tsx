import React from 'react';
import { Text, View } from 'react-native';
import { Order } from 'app';
import { Span } from 'components/Span';

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
        <Span textClass="text-primary font-Mulish-Bold text-sm">
          Order {orderId}
        </Span>
        <Span textClass="py-[6px] px-[15px] text-main-blue bg-main-blue/20 rounded-[5px] ml-[10px] font-Mulish-Bold text-[10px]">
          {(distance / 1000).toFixed(2)}km
        </Span>
      </View>
      {!hideAmount && (
        <Span textClass="text-primary font-Mulish-Bold text-xs">₦300</Span>
      )}
    </View>
  );
};
