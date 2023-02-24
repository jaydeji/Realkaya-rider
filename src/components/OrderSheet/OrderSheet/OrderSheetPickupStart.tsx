import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUpdateOrder, useUpdateOrdersForToday } from 'lib/api/hooks';
import { useOrderStore } from 'store';
import { RootStackParamList } from 'types/navigation';
import { OrderSheetTemplate } from './OrderSheetTemplate';

export const OrderSheetPickupStart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const order = useOrderStore((store) => store.currentOrder!);
  const setCurrentOrder = useOrderStore((store) => store.setCurrentOrder);

  const { mutate: updateOrdersForToday } = useUpdateOrdersForToday();
  const { mutate: updateApiOrder, isLoading } = useUpdateOrder({
    onSuccess: (data) => {
      setCurrentOrder(data);
      updateOrdersForToday();
    },
  });

  return (
    <OrderSheetTemplate
      rightText="Start Pickup"
      onRightPress={() =>
        updateApiOrder({
          orderId: order.orderId,
          body: {
            pickUpStartAt: true,
          },
        })
      }
      leftText="Cancel"
      onLeftPress={() =>
        navigation.navigate('CancelOrder', { orderId: order.orderId })
      }
      isLoading={isLoading}
      order={order}
      bottomType="fare"
      topText="Pickup Profile"
    />
  );
};
