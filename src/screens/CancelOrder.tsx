import { View, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { Button, CheckRound } from 'components';
import { Span } from 'components/Span';
import { useOrderStore } from 'store';
import { useUpdateOrder, useUpdateOrdersForToday } from 'lib/api/hooks';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigation';
import { snack } from 'lib/snack';
import { goToHomeSheet } from 'lib/order';

const options = [
  {
    id: 'OFFLINE',
    name: 'Pickup location was offline',
  },
  {
    id: 'WRONGINFO',
    name: 'Information provided was wrong',
  },
  {
    id: 'RUDECUSTOMER',
    name: 'Pickup customer was rude',
  },
  {
    id: 'MECHANICAL',
    name: 'I have mechanical issues',
  },
];

export const CancelOrder = () => {
  const [selected, setSelected] = useState<string>();

  const { params } = useRoute<RouteProp<RootStackParamList, 'CancelOrder'>>();

  const setCurrentOrder = useOrderStore((store) => store.setCurrentOrder);
  const { mutate: updateOrdersForToday } = useUpdateOrdersForToday();
  const { mutate: updateApiOrder, isLoading } = useUpdateOrder({
    onSuccess: () => {
      setCurrentOrder();
      updateOrdersForToday();
      goToHomeSheet();
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="flex-1 p-5">
        <View className="rounded-[5px] bg-white px-2 py-5 mt-[30px]">
          <View className="flex-row items-center">
            <Span textClass="text-base font-Mulish-Bold ml-1">
              Mark order is an important aspects of the app, all orders must be
              marked to validate a safe delivery
            </Span>
          </View>
          <View className="text-light-text">
            <Span textClass="text-xs mt-[15px]">
              1. You can only cancel based on difference in delivery details
            </Span>
            <Span textClass="text-xs mt-[6px]">
              2. Your account will be suspended for one day if you cancel 5
              orders in a day
            </Span>
          </View>
        </View>

        <View>
          <Span textClass="text-base font-Mulish-Bold mt-[17px]">
            Why do you want to cancel this order?
          </Span>

          <View className="mt-[30px]">
            {options.map((option) => (
              <TouchableWithoutFeedback
                key={option.id}
                onPress={() => setSelected(option.id)}
              >
                <View className="text-light-text mb-5 flex-row items-center justify-between">
                  <Span textClass="flex">{option.name}</Span>
                  <CheckRound checked={selected === option.id} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View className="mt-12">
            <Button
              onPress={() => {
                if (!selected)
                  return snack('please select an option to cancel order');
                updateApiOrder({
                  orderId: params.orderId,
                  body: {
                    cancelOrder: selected,
                  },
                });
              }}
              disabled={!selected}
              loading={isLoading}
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
