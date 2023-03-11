import { View, SafeAreaView, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, DateSelect } from 'components';
import clsx from 'clsx';
import { ScrollView } from 'react-native-gesture-handler';
import { OrderLine, OrderLineRight, OrderLineTop } from 'components/OrderLine';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { useQuery } from 'react-query';
import { getOngoingOrdersByDate } from 'lib/api';
import { queryKeys } from 'lib/query';
import { useAppStore, useOrderStore } from 'store';
import { sheetRoutes } from 'routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ScreensStackParamList } from 'types/navigation';

type OrderStatusLetter = 'P' | 'D';

export const OrdersList = () => {
  const [selected, setSelected] = useState<OrderStatusLetter>('P');
  const [date, setDate] = useState(new Date('2022-11-12T17:21:10.285Z'));
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NativeStackNavigationProp<ScreensStackParamList, 'Home'>,
        NativeStackNavigationProp<RootStackParamList, 'OrdersList'>
      >
    >();

  const setCurrentOrder = useOrderStore((store) => store.setCurrentOrder);
  const setSheet = useAppStore((store) => store.setSheet);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DateSelect date={date} onConfirm={(date) => setDate(date as Date)} />
      ),
    });
  }, [navigation, date, setDate]);

  const { data: orders, isLoading } = useQuery({
    queryFn: () => getOngoingOrdersByDate({ date: date.toISOString() }),
    queryKey: queryKeys.getOngoingOrdersByDate(date.toISOString()),
    select: (orders) => {
      return {
        P: !orders
          ? []
          : orders.filter(
              (order) => order.confirmedAt && !order.pickUpArrivedAt
            ),
        D: !orders
          ? []
          : orders.filter(
              (order) => order.pickUpArrivedAt && !order.dropOffArrivedAt
            ),
      };
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="flex-1 p-5 ">
        <View className="flex-row mt-9 px-4 py-3 bg-white rounded-[5px] border border-alt-8">
          <View className="flex-1">
            <Button
              bodyClass={clsx(selected !== 'P' ? 'bg-white' : 'bg-navy-blue')}
              textClass={clsx(selected !== 'P' && 'text-light-text')}
              onPress={() => setSelected('P')}
            >
              Pickup
            </Button>
          </View>
          <View className="flex-1">
            <Button
              bodyClass={clsx(selected !== 'D' ? 'bg-white' : 'bg-navy-blue')}
              textClass={clsx(selected !== 'D' && 'text-light-text')}
              onPress={() => setSelected('D')}
            >
              Delivery
            </Button>
          </View>
        </View>
        <ScrollView>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View className="mt-[14px]">
              {orders?.[selected].map((e) => (
                <Pressable
                  key={e.orderId}
                  onPress={() =>
                    navigation.navigate('OrderDetails', { order: e })
                  }
                >
                  <OrderLine
                    order={{
                      senderAddress: e.senderAddress,
                      recepientAddress: e.recepientAddress,
                    }}
                    top={
                      <OrderLineTop order={{ distance: 100, orderId: 10 }} />
                    }
                    right={
                      <OrderLineRight
                        onPress={() => {
                          setCurrentOrder(e);
                          setSheet(sheetRoutes[2]);
                          navigation.navigate('Home');
                        }}
                        text="Select"
                      />
                    }
                  />
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
