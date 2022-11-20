import axios from 'axios';
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { sheetRoutes } from '../../routes';
import { useStore } from '../../store';

export const OrderSheet = () => {
  const orders = useStore((store) => store.orders);
  const removeOrder = useStore((store) => store.removeOrder);
  const setSheet = useStore((store) => store.setSheet);
  const _updateOrder = useStore((store) => store.updateOrder);
  const order = orders[0];

  if (!order) return null;

  const updateOrder = async (body: any) => {
    try {
      const { data } = await axios.patch('/orders/' + order.orderId, body);
      _updateOrder(data.data);
    } catch (error) {}
  };
  console.log(order);
  return (
    <View className="px-3 flex-1">
      <View className="flex-row justify-between">
        <Text className="text-base">Pickup Address</Text>
        <Text className="text-base">
          {(order.distance / 1000).toFixed(2)}km
        </Text>
      </View>
      <View>
        <Text>{order.senderAddress}</Text>
      </View>
      <View>
        <Text>{order.recepientAddress}</Text>
      </View>
      <View className="flex-row justify-between border-b">
        <Text className="text-base">Estimated fare</Text>
        <Text className="text-base">Payment method</Text>
      </View>
      <View className="flex-row justify-between border-b">
        <Text className="text-base">300</Text>
        <Text className="text-base">{order.paymentMethod}</Text>
      </View>
      {(() => {
        if (!order.confirmedAt)
          return (
            <View className="w-full mt-10 flex-row gap-x-1">
              <View className="flex-1">
                <TouchableHighlight
                  className="bg-[#E5E5E5] h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
                  onPress={() => {
                    if (orders.length > 1) {
                      return removeOrder(order.orderId);
                    }
                    setSheet(sheetRoutes[0]);
                  }}
                >
                  <Text className="font-Mulish-Bold">Cancel</Text>
                </TouchableHighlight>
              </View>
              <View className="flex-1">
                <TouchableHighlight
                  className="bg-primary h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
                  onPress={() => {}}
                >
                  <Text className="font-Mulish-Bold text-white">Confirm</Text>
                </TouchableHighlight>
              </View>
            </View>
          );
        if (!order.pickUpArrivedAt)
          return (
            <View className="flex-1 mt-2">
              <TouchableHighlight
                className="bg-primary h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
                onPress={() => {
                  updateOrder({ pickUpArrivedAt: true });
                }}
              >
                <Text className="font-Mulish-Bold text-white">Arrived</Text>
              </TouchableHighlight>
            </View>
          );
        if (!order.dropOffStartAt)
          return (
            <View className="w-full mt-10 flex-row gap-x-1">
              <View className="flex-1">
                <TouchableHighlight
                  className="bg-[#E5E5E5] h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
                  onPress={() => {
                    updateOrder({ pickUpArrivedAt: true });
                    if (orders.length > 1) {
                      return removeOrder(order.orderId);
                    }
                    setSheet(sheetRoutes[0]);
                  }}
                >
                  <Text className="font-Mulish-Bold">Cancel</Text>
                </TouchableHighlight>
              </View>
              <View className="flex-1">
                <TouchableHighlight
                  className="bg-primary h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
                  onPress={() => {}}
                >
                  <Text className="font-Mulish-Bold text-white">
                    start delivert
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          );
      })()}
    </View>
  );
};
