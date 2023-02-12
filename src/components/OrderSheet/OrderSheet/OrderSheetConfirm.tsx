import { Button } from 'components/Form';
import { confirmOrder } from 'lib/api';
import { useUpdateOrdersForToday } from 'lib/api/hooks';
import { goToHomeSheet } from 'lib/order';
import React from 'react';
import { View } from 'react-native';
import { useMutation } from 'react-query';
import { useOrderStore } from 'store';

export const OrderSheetConfirm = () => {
  const order = useOrderStore((store) => store.currentOrder!);
  const setCurrentOrder = useOrderStore((store) => store.setCurrentOrder);

  const { mutate: updateOrdersForToday } = useUpdateOrdersForToday();

  const { mutate: updateApiOrder, isLoading } = useMutation({
    mutationFn: (orderId: number) => confirmOrder({ orderId }),
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
          onPress={goToHomeSheet}
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
          onPress={() => updateApiOrder(order.orderId)}
        >
          Confirm
        </Button>
      </View>
    </View>
  );
};
