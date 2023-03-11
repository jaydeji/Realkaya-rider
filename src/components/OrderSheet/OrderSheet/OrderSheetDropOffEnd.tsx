import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useOrderStore } from 'store';
import { RootStackParamList } from 'types/navigation';
import { OrderSheetTemplate } from './OrderSheetTemplate';

export const OrderSheetDropOffEnd = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const order = useOrderStore((store) => store.currentOrder!);

  return (
    <OrderSheetTemplate
      rightText="Delivered"
      onRightPress={() =>
        navigation.replace('CompleteOrder', { orderId: order.orderId })
      }
      hideLeft
      order={order}
      topText="Delivery profile"
      bottomType="package"
    />
  );
};
