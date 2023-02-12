import { useUpdateOrder, useUpdateOrdersForToday } from 'lib/api/hooks';
import React from 'react';
import { useOrderStore } from 'store';
import { OrderSheetTemplate } from './OrderSheetTemplate';

export const OrderSheetDropOffArrive = () => {
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
      rightText="Delivery Arrived"
      onRightPress={() =>
        updateApiOrder({
          orderId: order.orderId,
          body: {
            dropOffArrivedAt: true,
          },
        })
      }
      isLoading={isLoading}
      hideLeft
    />
  );
};
