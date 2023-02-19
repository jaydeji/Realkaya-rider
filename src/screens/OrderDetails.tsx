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

const OrderDetails = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'OrderDetails'>>();

  const order = params.order;

  const fullName = order?.user
    ? `${order.user.firstName} ${order.user.lastName}`
    : '';

  const name = !order.pickUpPickedAt ? fullName : order.recepientName;
  const phone = !order.pickUpPickedAt
    ? order.user?.phone
    : order.recepientPhone;

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="p-5 flex-1">
        <OrderDetailsSummary order={order} />

        <OrderLine
          order={order}
          right={<OrderLineRightCall phone={phone!} />}
          top={<OrderLineTopProfile name={name} />}
        />
      </View>
    </SafeAreaView>
  );
};

export { OrderDetails };
