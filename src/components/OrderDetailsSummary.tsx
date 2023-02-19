import { View } from 'react-native';
import React from 'react';
import { Span } from './Span';
import { getPaymentMethod } from 'lib/apiUtils';
import { Order } from 'types/app';

const OrderDetailsSummary = ({ order }: { order: Order }) => {
  return (
    <View className="rounded-[5px] bg-primary mt-14 p-5">
      <View className="flex-row justify-between">
        <Span textClass="text-alt-4 text-base font-bold font-Mulish-Bold">
          Total
        </Span>
        <Span textClass="text-alt-4 text-base font-bold font-Mulish-Bold">
          ₦
        </Span>
      </View>
      <View className="flex-row justify-between border-b-alt-7 border-b py-3">
        <Span textClass="text-alt-4">Product type</Span>
        <Span textClass="text-alt-4">General</Span>
      </View>
      <View className="flex-row justify-between border-b-alt-7 border-b py-3">
        <Span textClass="text-alt-4">Your reward</Span>
        <Span textClass="text-alt-4">₦</Span>
      </View>
      <View className="flex-row justify-between py-3">
        <Span textClass="text-alt-4">Payment method</Span>
        <Span textClass="text-alt-4">
          {getPaymentMethod(order.paymentMethod)}
        </Span>
      </View>
    </View>
  );
};

export { OrderDetailsSummary };
