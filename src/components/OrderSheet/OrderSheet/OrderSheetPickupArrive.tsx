import { useNavigation } from '@react-navigation/native';
import { Button } from 'components/Form';
import { useUpdateOrder, useUpdateOrdersForToday } from 'lib/api/hooks';
import React from 'react';
import { View } from 'react-native';
import { useOrderStore } from 'store';

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
    <View className="w-full mt-10 flex-row gap-x-1">
      <View className="flex-1">
        <Button
          bodyClass="bg-[#E5E5E5] h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
          textClass="font-Mulish-Bold text-primary"
          onPress={() => {
            navigation.navigate('CancelOrder', { orderId: order.orderId });
          }}
        >
          Cancel
        </Button>
      </View>
      <View className="flex-1">
        <Button
          alt
          textClass="font-Mulish-Bold text-white"
          bodyClass="bg-primary h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
          loading={isLoading}
          onPress={() =>
            updateApiOrder({
              orderId: order.orderId,
              body: {
                pickUpArrivedAt: true,
              },
            })
          }
        >
          Pickup Arrived
        </Button>
      </View>
    </View>
  );
};
