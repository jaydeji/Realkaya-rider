import { Order, SupportTicket, User } from 'types/app';
import { _fetch } from './fetcher';

export * from './fetcher';

export const confirmOrder = async ({ orderId }: { orderId: number }) => {
  const data = await _fetch<{ data: Order }>({
    url: '/orders/' + orderId + '/confirm',
    method: 'POST',
  });
  return data?.data;
};

export const updateOrder = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: any;
}) => {
  const data = await _fetch({
    url: '/orders/' + orderId,
    body,
    method: 'PATCH',
  });
  return (data as { data: Order }).data;
};

export const findNearestOrder = async (location: {
  latitude: number;
  longitude: number;
}) => {
  const data = await _fetch<any>({
    url: '/orders/nearest',
    method: 'POST',
    body: location,
  });
  return data.data;
};

export const getOngoingOrdersByDate = async ({ date }: { date: string }) => {
  const data = await _fetch<{ data: Order[] }>({
    url: `/orders/ongoing`,
    method: 'GET',
    queryParams: {
      date,
    },
  });
  return data.data;
};

export const getOrdersByDate = async ({ date }: { date: string }) => {
  const data = await _fetch<{ data: Order[] }>({
    url: `/orders`,
    method: 'GET',
    queryParams: { params: date },
  });
  return data.data;
};

export const fetchUncofirmedOrders = () => {
  return _fetch<{ data: Order[] }>({
    url: '/orders/unconfirmed',
    method: 'POST',
    body: {
      latitude: 6.520238459241921,
      longitude: 3.3680734868226345,
    },
  }).then((e) => e.data);
};

export const confirmMultipleOrders = (body: { orderIds: number[] }) => {
  return _fetch<{ data: Order[] }>({
    url: '/orders/confirm_multiple',
    method: 'POST',
    body,
  }).then((e) => e.data);
};

export const getUserDetails = () => {
  return _fetch({ url: '/users/me', method: 'GET' }).then(
    (e) => (e as { data: User }).data
  );
};

export const updateUser = (body: Record<string, any>) => {
  return _fetch<{ data: User }>({ url: '/users', method: 'PATCH', body }).then(
    (e) => e.data
  );
};

export const startSupportChat = (body: Record<string, any>) => {
  return _fetch({ url: '/startsupportchat', method: 'POST', body });
};

export const getSupportChats = () => {
  return _fetch<{ data: SupportTicket[] }>({
    url: '/getchats',
    method: 'GET',
  }).then((e) => e.data);
};
