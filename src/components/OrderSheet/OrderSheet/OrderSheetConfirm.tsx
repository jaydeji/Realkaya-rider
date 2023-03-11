import { Button } from 'components/Form';
import { OrderAddressBar, OrderKilometer } from 'components/OrderLine';
import { Span } from 'components/Span';
import { confirmOrder } from 'lib/api';
import { useUpdateOrdersForToday } from 'lib/api/hooks';
import { goToHomeSheet } from 'lib/order';
import React from 'react';
import { View } from 'react-native';
import { useMutation } from 'react-query';
import { useOrderStore } from 'store';
import { ShortOrderSummary } from './ShortOrderSummary';

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
    <View>
      <View className="flex-row justify-between items-center">
        <Span textClass="text-xs font-Mulish-SemiBold">Pickup Address</Span>
        <OrderKilometer distance={order.distance} />
      </View>
      <OrderAddressBar
        address={order.senderAddress}
        bodyClass="mt-2"
        textClass="text-sm font-Mulish-Bold text-primary"
      />
      <Span textClass="text-xs font-Mulish-SemiBold">Delivery Address</Span>
      <OrderAddressBar
        address={order.recepientAddress}
        bodyClass="mt-2"
        textClass="text-sm font-Mulish-Bold text-primary"
      />
      <ShortOrderSummary bottomType={'fare'} order={order} />
      <View className="w-full mt-10 flex-row gap-x-1">
        <View className="flex-1">
          <Button
            bodyClass="bg-[#E5E5E5] h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
            textClass="font-Mulish-Bold text-primary"
            onPress={() => {
              goToHomeSheet();
              setCurrentOrder();
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
            onPress={() => updateApiOrder(order.orderId)}
          >
            Confirm
          </Button>
        </View>
      </View>
    </View>
  );
};
