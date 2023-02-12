import { View } from 'react-native';
import React from 'react';
import { Order } from 'types/app';
import { OrderAddressBar } from './OrderAddressBar';

type OrderLineProps = {
  right: React.ReactNode;
  top: React.ReactNode;
  order: Pick<Order, 'senderAddress' | 'recepientAddress'>;
};

export const OrderLine = ({ top, right, order }: OrderLineProps) => {
  const { senderAddress, recepientAddress } = order;
  return (
    <View className="mt-5 mb-4 border-b border-b-alt-7 pb-[15px]">
      {top}
      <View className="flex-row justify-between mt-[10px]">
        <View>
          <OrderAddressBar address={senderAddress} />
          <OrderAddressBar
            address={recepientAddress}
            bodyClass="mt-[10px]"
            alt
          />
        </View>
        {right}
      </View>
    </View>
  );
};
