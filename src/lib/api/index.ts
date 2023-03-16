import { Order, SupportTicket, User } from 'types/app';
import { _fetch } from './fetcher';

export * from './fetcher';

export const confirmOrder = async ({ orderId }: { orderId: number }) => {
  const { data } = await _fetch.patch('/orders/' + orderId + '/confirm');
  return data?.data as Order;
};

export const updateOrder = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: any;
}) => {
  const { data } = await _fetch.patch('/orders/' + orderId, body);
  return data?.data as Order;
};

export const findNearestOrder = async (location: {
  latitude: number;
  longitude: number;
}) => {
  const { data } = await _fetch.post('/orders/nearest', location);
  return data?.data;
};

export const getOngoingOrdersByDate = async ({ date }: { date: string }) => {
  const { data } = await _fetch.get<{ data: Order[] }>(`/orders/ongoing`, {
    params: {
      date,
    },
  });
  return data.data;
};

export const getOrdersByDate = async ({ date }: { date: string }) => {
  const { data } = await _fetch.get<{ data: Order[] }>(`/orders`, {
    params: date,
  });
  return data.data;
};

export const fetchUncofirmedOrders = () => {
  return _fetch
    .post('/orders/unconfirmed', {
      latitude: 6.520238459241921,
      longitude: 3.3680734868226345,
    })
    .then((e) => e.data.data as Order[]);
};

export const confirmMultipleOrders = (body: { orderIds: number[] }) => {
  return _fetch
    .post('/orders/confirm_multiple', body)
    .then((e) => e.data.data as Order[]);
};

export const getUserDetails = () => {
  return _fetch.get('/users/me').then((e) => e.data.data as User);
};

export const updateUser = (body: Record<string, any>) => {
  return _fetch.patch('/users', body).then((e) => e.data.data as User);
};

export const startSupportChat = (body: Record<string, any>) => {
  return _fetch.post('/startsupportchat', body);
};

export const getSupportChats = () => {
  return _fetch.get('/getchats').then((e) => e.data.data as SupportTicket[]);
};
