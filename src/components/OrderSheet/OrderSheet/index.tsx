import React from 'react';
import { View } from 'react-native';
import { useOrderStore } from 'store';
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
