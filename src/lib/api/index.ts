import axios from 'axios';
import { Order } from 'types/app';

export const confirmOrder = async ({ orderId }: { orderId: number }) => {
  const { data } = await axios.patch('/orders/' + orderId + '/confirm');
  return data?.data as Order;
};

export const updateOrder = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: any;
}) => {
  const { data } = await axios.patch('/orders/' + orderId, body);
  return data?.data as Order;
};

export const findNearestOrder = async (location: {
  latitude: number;
  longitude: number;
}) => {
  const { data } = await axios.post('/orders/nearest', location);
  return data?.data;
};

export const getOrdersByDate = async ({ date }: { date: string }) => {
  const { data } = await axios.get<{ data: Order[] }>(`/orders?date=${date}`);
  return data.data;
};

export const fetchUncofirmedOrders = () => {
  return axios
    .post('/orders/unconfirmed', {
      latitude: 6.520238459241921,
      longitude: 3.3680734868226345,
    })
    .then((e) => e.data.data as Order[]);
};

export const confirmMultipleOrders = (body: { orderIds: number[] }) => {
  return axios
    .post('/orders/confirm_multiple', body)
    .then((e) => e.data.data as Order[]);
};
