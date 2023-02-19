import { QueryClient } from 'react-query';

export const queryKeys = {
  // getLocation: 'getLocation',
  // getNearestOrder: 'getNearestOrder',
  getOrdersByDate: (date: string) => ['getOrdersByDate', { date }],
  fetchUncofirmedOrders: ['fetchUncofirmedOrders'],
  getUserDetails: ['getUserDetails'],
};

export const queryClient = new QueryClient();
