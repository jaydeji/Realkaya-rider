import { Order, PaymentMethod } from 'types/app';

export const getPaymentMethod = (method: PaymentMethod) => {
  if (method === 'CASH') return 'Pay on delivery';
  return method.toLowerCase();
};
