import React from 'react';
import { View } from 'react-native';
import { useOrderStore } from 'store';
import { Span } from 'components/Span';
import { OrderAddressBar, OrderKilometer } from 'components/OrderLine';
import { getPaymentMethod } from 'lib/apiUtils';
import { OrderSheetConfirm } from './OrderSheetConfirm';
import { _date } from 'lib/date';
import { OrderSheetPickupPick } from './OrderSheetPickupPick';
import { OrderSheetPickupArrive } from './OrderSheetPickupArrive';
import { OrderSheetDropOffStart } from './OrderSheetDropOffStart';
import { OrderSheetDropOffArrive } from './OrderSheetDropOffArrive';
import { OrderSheetDropOffEnd } from './OrderSheetDropOffEnd';
import { OrderSheetPickupStart } from './OrderSheetPickupStart';

export const OrderSheet = () => {
  const order = useOrderStore((store) => store.currentOrder);

  if (!order) return null;

  return (
    <View className="px-3 flex-1">
      <View className="flex-row justify-between">
        <Span textClass="text-xs font-Mulish-SemiBold">Pickup Address</Span>
        <OrderKilometer distance={order.distance} />
      </View>
      <OrderAddressBar
        address={order.senderAddress}
        bodyClass="mt-2"
        textClass="text-sm font-Mulish-Bold text-primary"
      />
      <Span textClass="text-xs font-Mulish-SemiBold">Delivery Address</Span>
      <OrderAddressBar
        address={order.recepientAddress}
        alt
        bodyClass="mt-2"
        textClass="text-sm font-Mulish-Bold text-primary"
      />
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
      {(() => {
        if (!order.confirmedAt) return <OrderSheetConfirm />;
        if (!order.pickUpStartAt) return <OrderSheetPickupStart />;
        if (!order.pickUpArrivedAt) return <OrderSheetPickupArrive />;
        if (!order.pickUpPickedAt) return <OrderSheetPickupPick />;
        if (!order.dropOffStartAt) return <OrderSheetDropOffStart />;
        if (!order.dropOffArrivedAt) return <OrderSheetDropOffArrive />;
        if (!order.deliveredAt) return <OrderSheetDropOffEnd />;
      })()}
    </View>
  );
};
