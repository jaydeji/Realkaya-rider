import { QueryClient } from 'react-query';

export const queryKeys = {
  // getLocation: 'getLocation',
  // getNearestOrder: 'getNearestOrder',
  getOrdersByDate: (date: string) => ['getOrdersByDate', { date }],
  fetchUncofirmedOrders: ['fetchUncofirmedOrders'],
  getUserDetails: ['getUserDetails'],
  getSupportChats: ['getSupportChats'],
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.NODE_ENV !== 'development',
    },
  },
});
