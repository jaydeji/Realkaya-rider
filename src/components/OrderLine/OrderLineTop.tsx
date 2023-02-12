import React from 'react';
import { Text, View } from 'react-native';
import { Order } from 'types/app';
import { Span } from 'components/Span';
import { OrderKilometer } from './OrderKilometer';

export const OrderLineTop = ({
  hideAmount,
  order,
}: {
  hideAmount?: boolean;
  order: Pick<Order, 'distance' | 'orderId'>;
}) => {
  const { distance, orderId } = order;
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Span textClass="text-primary font-Mulish-Bold text-sm">
          Order {orderId}
        </Span>
        <OrderKilometer distance={distance} />
      </View>
      {!hideAmount && (
        <Span textClass="text-primary font-Mulish-Bold text-xs">₦300</Span>
      )}
    </View>
  );
};
