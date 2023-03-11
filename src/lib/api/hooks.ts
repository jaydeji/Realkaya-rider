import { _date } from 'lib/date';
import { useMutation } from 'react-query';
import { useOrderStore } from 'store';
import { Order } from 'types/app';
import { getOngoingOrdersByDate, getOrdersByDate, updateOrder } from '.';

export const useUpdateOrder = (options?: {
  onSuccess?: (order: Order) => void;
}) => {
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: options?.onSuccess,
  });
};

export const useGetOngoingOrdersByDate = ({
  date,
  onSuccess,
  onError,
}: {
  date: string;
  onSuccess?: (order: Order[]) => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: () =>
      getOngoingOrdersByDate({
        date,
      }),
    onSuccess,
    onError,
  });
};

export const useUpdateOrdersForToday = () => {
  const setOrders = useOrderStore((store) => store.setOrders);

  return useMutation({
    mutationFn: () =>
      getOrdersByDate({
        date: '2022-11-12T17:21:10.385Z' || _date.startOfDay().toISOString(),
      }),
    onSuccess: setOrders,
  });
};
