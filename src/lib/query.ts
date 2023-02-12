import { QueryClient } from 'react-query';

export const queryKeys = {
  // getLocation: 'getLocation',
  // getNearestOrder: 'getNearestOrder',
  getOrdersByDate: (date: string) => ['getOrdersByDate', { date }],
  fetchUncofirmedOrders: ['fetchUncofirmedOrders'],
};

export const queryClient = new QueryClient();
