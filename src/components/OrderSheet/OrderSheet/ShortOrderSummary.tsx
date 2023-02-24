import { View } from 'react-native';
import React from 'react';
import { Span } from 'components/Span';
import { Order } from 'types/app';
import { getPaymentMethod } from 'lib/apiUtils';
import { getOrderPhone } from 'lib/order';

type Props = {
  bottomType: 'fare' | 'package';
  order: Order;
};

const ShortOrderSummary = ({ bottomType, order }: Props) => {
  if (bottomType === 'package')
    return (
      <>
        <View className="flex-row justify-between border-b-ebebeb border-b mt-10 pb-[5px]">
          <Span textClass="text-xxs">Package type</Span>
          <Span textClass="text-xxs">Contact info</Span>
        </View>
        <View className="flex-row justify-between border-b-ebebeb border-b py-2">
          <Span textClass="text-xs font-Mulish-Bold">General</Span>
          <Span textClass="text-xs font-Mulish-Bold">
            {getOrderPhone(order)}
          </Span>
        </View>
      </>
    );
  return (
    <>
      <View className="flex-row justify-between border-b-ebebeb border-b mt-4 pb-[5px]">
        <Span textClass="text-xxs">Estimated fare</Span>
        <Span textClass="text-xxs">Payment method</Span>
      </View>
      <View className="flex-row justify-between border-b-ebebeb border-b py-2">
        <Span textClass="text-xs font-Mulish-Bold">N{order.estimatedFee}</Span>
        <Span textClass="text-xs font-Mulish-Bold">
          {getPaymentMethod(order.paymentMethod)}
        </Span>
      </View>
    </>
  );
};

export { ShortOrderSummary };
