import { useNavigation } from '@react-navigation/native';
import { useUpdateOrder, useUpdateOrdersForToday } from 'lib/api/hooks';
import React from 'react';
import { useOrderStore } from 'store';
import { OrderSheetTemplate } from './OrderSheetTemplate';

export const OrderSheetDropOffEnd = () => {
  const navigation = useNavigation();

  const order = useOrderStore((store) => store.currentOrder!);

  return (
    <OrderSheetTemplate
      rightText="Delivered"
      onRightPress={() =>
        navigation.navigate('CompleteOrder', { orderId: order.orderId })
      }
      hideLeft
    />
  );
};
