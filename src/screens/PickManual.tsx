import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { sheetRoutes } from '../routes';
import { useAppStore, useOrderStore } from '../store';
import {
  OrderLine,
  OrderLineRightCheck,
  OrderLineTop,
} from 'components/OrderLine';
import { Button } from 'components';
import { Span } from 'components/Span';
import { snack } from 'lib/snack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreensStackParamList } from 'types/navigation';
import { useMutation, useQuery } from 'react-query';
import { queryKeys } from 'lib/query';
import { confirmMultipleOrders, fetchUncofirmedOrders } from 'lib/api';

export const PickManual = () => {
  const [orderIds, setOrderIds] = useState<number[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<ScreensStackParamList>>();
  const setCurrentSheet = useAppStore((store) => store.setSheet);
  const setCurrentOrder = useOrderStore((store) => store.setCurrentOrder);

  const { data: orders, isLoading } = useQuery({
    queryFn: fetchUncofirmedOrders,
    queryKey: queryKeys.fetchUncofirmedOrders,
  });

  const { mutate: _confirmMultipleOrders, isLoading: confirmLoading } =
    useMutation({
      mutationFn: () => confirmMultipleOrders({ orderIds }),
      onSuccess: (data) => {
        setCurrentOrder(data[0]);
        setCurrentSheet(sheetRoutes[2]);
        navigation.navigate('Home');
      },
    });

  const handleConfirm = async () => {
    if (!orderIds.length) return snack('Please select at least one order');
    _confirmMultipleOrders();
  };

  const setOrderId = (orderId: number) => {
    const id = orderIds.find((e) => e === orderId);
    if (id) setOrderIds(orderIds.filter((e) => e !== orderId));
    else setOrderIds(orderIds.concat(orderId));
  };

  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5">
        <View className="mt-[30]">
          <Span textClass="text-xs text-light-text">
            You can pick only 5 multiple orders at a time. Choose the ones that
            are closer in location
          </Span>
        </View>
        <ScrollView>
          {(orders || []).map((order) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => setOrderId(order.orderId)}
                key={order.orderId}
              >
                <OrderLine
                  order={order}
                  top={<OrderLineTop order={order} hideAmount />}
                  right={
                    <OrderLineRightCheck
                      checked={orderIds.includes(order.orderId)}
                    />
                  }
                />
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
        <View>
          <Button onPress={handleConfirm} loading={confirmLoading}>
            Confirm
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
