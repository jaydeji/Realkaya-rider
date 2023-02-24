import { sheetRoutes } from 'routes';
import { useAppStore, useOrderStore } from 'store';
import { Order } from 'types/app';

export const goToHomeSheet = () => {
  if (useOrderStore.getState().orders.length)
    return useAppStore.setState({ sheet: sheetRoutes[3] });
  useAppStore.setState({ sheet: sheetRoutes[0] });
};

export const getOrderName = (order: Order) => {
  const fullName = order?.user
    ? `${order.user.firstName} ${order.user.lastName}`
    : '';

  return !order.pickUpPickedAt ? fullName : order.recepientName;
};

export const getOrderPhone = (order: Order) => {
  return !order.pickUpPickedAt ? order.user?.phone : order.recepientPhone;
};

export const getOrderAddress = (order: Order) => {
  return !order.pickUpPickedAt ? order.senderAddress : order.recepientAddress;
};
