import { View, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { Button, CheckRound } from 'components';
import { Span } from 'components/Span';
import { useOrderStore } from 'store';
import { useUpdateOrder, useUpdateOrdersForToday } from 'lib/api/hooks';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigation';
import { snack } from 'lib/snack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const options = [
  {
    id: 'DIRECT',
    name: 'Delivered directly to customer',
  },
  {
    id: 'DOORPOST',
    name: 'Customer directed on doorpost',
  },
  {
    id: 'THIRDPARTY',
    name: 'Delivered to third party on customer notice',
  },
  {
    id: 'OFFLINE',
    name: 'Customer was offline',
  },
];

export const CompleteOrder = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selected, setSelected] = useState<string>();

  const { params } = useRoute<RouteProp<RootStackParamList, 'CompleteOrder'>>();

  const currentOrder = useOrderStore((store) => store.currentOrder!);
  const setCurrentOrder = useOrderStore((store) => store.setCurrentOrder);
  const removeOrder = useOrderStore((store) => store.removeOrder);
  const { mutate: updateOrdersForToday } = useUpdateOrdersForToday();
  const { mutate: updateApiOrder, isLoading } = useUpdateOrder({
    onSuccess: () => {
      navigation.navigate('Welldone', { order: currentOrder });
      removeOrder(currentOrder.orderId, updateOrdersForToday);
      setCurrentOrder();
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="flex-1 p-5">
        <View className="text-light-text mt-[30px] text-xs">
          <Span>
            Mark order is an important aspects of the app, all orders must be
            marked to validate a safe delivery
          </Span>
        </View>

        <View>
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
              disabled={!selected}
              loading={isLoading}
              onPress={() => {
                if (!selected)
                  return snack('please select an option to complete order');
                updateApiOrder({
                  orderId: params.orderId,
                  body: {
                    markOrder: selected,
                  },
                });
              }}
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
