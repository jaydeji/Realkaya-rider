import { View, Text } from 'react-native';
import React from 'react';
import { BeginCircle } from '../../assets/icons/BeginCircle';
import { EndCircle } from '../../assets/icons/EndCircle';
import { Order } from '../../types';

type OrderLineProps = {
  right: React.ReactNode;
  top: React.ReactNode;
  order: Order;
};

export const OrderLine = ({ top, right, order }: OrderLineProps) => {
  const { senderAddress, recepientAddress } = order;
  return (
    <View className="mt-5 mb-4 border-b border-b-alt-7 pb-[15px]">
      {top}
      <View className="flex-row justify-between mt-[10px]">
        <View>
          <View className="flex-row items-center">
            <BeginCircle />
            <Text className="ml-[6px] text-light-text text-xs">
              {senderAddress}
            </Text>
          </View>
          <View className="flex-row items-center mt-[10px]">
            <EndCircle />
            <Text className="ml-[6px] text-light-text text-xs">
              {recepientAddress}
            </Text>
          </View>
        </View>
        {right}
      </View>
    </View>
  );
};
