import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigation';
import {
  OrderDetailsSummary,
  OrderLine,
  OrderLineRightCall,
  OrderLineTopProfile,
} from 'components';
import { getOrderName, getOrderPhone } from 'lib/order';

const OrderDetails = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'OrderDetails'>>();

  const order = params.order;

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="p-5 flex-1">
        <OrderDetailsSummary order={order} />

        <OrderLine
          order={order}
          right={<OrderLineRightCall phone={getOrderPhone(order)!} />}
          top={
            <OrderLineTopProfile name={getOrderName(order)} bodyClass="mt-14" />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export { OrderDetails };
