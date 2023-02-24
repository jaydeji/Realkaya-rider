import { useNavigation } from '@react-navigation/native';
import { useUpdateOrder, useUpdateOrdersForToday } from 'lib/api/hooks';
import React from 'react';
import { useOrderStore } from 'store';
import { OrderSheetTemplate } from './OrderSheetTemplate';

export const OrderSheetPickupArrive = () => {
  const navigation = useNavigation();

  const order = useOrderStore((store) => store.currentOrder!);
  const setCurrentOrder = useOrderStore((store) => store.setCurrentOrder);

  const { mutate: updateOrdersForToday } = useUpdateOrdersForToday();

  const { mutate: updateApiOrder, isLoading } = useUpdateOrder({
    onSuccess: (data) => {
      setCurrentOrder(data);
      updateOrdersForToday();
    },
  });

  return (
    <OrderSheetTemplate
      rightText="Pickup Arrived"
      onRightPress={() =>
        updateApiOrder({
          orderId: order.orderId,
          body: {
            pickUpArrivedAt: true,
          },
        })
      }
      onLeftPress={() => {
        navigation.navigate('CancelOrder', { orderId: order.orderId });
      }}
      isLoading={isLoading}
      bottomType="fare"
      order={order}
      topText="Pickup Profile"
      leftText="Cancel"
    />
  );
};
