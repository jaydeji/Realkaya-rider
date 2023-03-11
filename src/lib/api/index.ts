import axios from 'axios';
import { Order, SupportTicket, User } from 'types/app';

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

export const getUserDetails = () => {
  return axios.get('/users/me').then((e) => e.data.data as User);
};

export const updateUser = (body: Record<string, any>) => {
  return axios.patch('/users', body).then((e) => e.data.data as User);
};

export const startSupportChat = (body: Record<string, any>) => {
  return axios.post('/startsupportchat', body);
};

export const getSupportChats = () => {
  return axios.get('/getchats').then((e) => e.data.data as SupportTicket[]);
};
