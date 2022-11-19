import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { sheetRoutes } from '../routes';
import { useStore } from '../store';
import { Order } from '../types';
import Header from '../components/Header';
import {
  OrderLine,
  OrderLineRightCheck,
  OrderLineTop,
} from '../components/OrderLine';
import Button from '../components/Button';

type Props = {};

export const PickManual = (props: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderIds, setOrderIds] = useState<number[]>([]);
  const navigation = useNavigation();
  const setCurrentSheet = useStore((store) => store.setSheet);
  const addOrders = useStore((store) => store.addOrders);

  useEffect(() => {
    fetchManualBookings();
  }, []);

  const fetchManualBookings = async () => {
    try {
      const { data } = await axios.post('/orders/unconfirmed', {
        latitude: 6.520238459241921,
        longitude: 3.3680734868226345,
      });
      setOrders(data.data);
    } catch (error) {}
  };

  const handleConfirm = async () => {
    if (!orderIds.length) return alert('Please select at least one order');

    try {
      const { data } = await axios.post('/orders/confirm_multiple', {
        orderIds,
      });
      addOrders(data.data);
      setCurrentSheet(sheetRoutes[2]);
      navigation.navigate('Home');
    } catch (error) {}
  };

  const setOrderId = (orderId: number) => {
    const id = orderIds.find((e) => e === orderId);
    if (id) setOrderIds(orderIds.filter((e) => e !== orderId));
    else setOrderIds(orderIds.concat(orderId));
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5">
        <Header title="Pick Manually" onPress={() => {}} />
        <View className="mt-[30]">
          <Text className="text-xs text-light-text">
            You can pick only 5 multiple orders at a time. Choose the ones that
            are closer in location
          </Text>
        </View>
        <ScrollView>
          {orders.map((order) => {
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
          <Button onPress={handleConfirm}>Confirm</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
