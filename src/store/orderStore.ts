import { Order } from 'types/app';
import { create } from 'zustand';

type OrderStoreState = {
  orders: Order[];
  currentOrder?: Order;
  addOrders: (orders: Order[]) => void;
  setOrders: (orders: Order[]) => void;
  removeOrder: (orderId: number) => void;
  updateOrder: (order: Order) => void;
  setCurrentOrder: (order?: Order) => void;
};

export const useOrderStore = create<OrderStoreState>((set) => ({
  orders: [],
  currentOrder: undefined,
  addOrders: (orders) => {
    set((store) => ({ orders: store.orders.concat(orders) }));
  },
  setOrders: (orders) => {
    set({ orders });
  },
  setCurrentOrder: (currentOrder) => {
    set({ currentOrder });
  },
  removeOrder: (orderId) => {
    set((store) => ({
      orders: store.orders.filter((order) => order.orderId !== orderId),
    }));
  },
  updateOrder: (_order) => {
    set((store) => {
      const orders = [...store.orders];
      const orderIndex = orders.findIndex((e) => e.orderId === _order.orderId);
      orders[orderIndex] = _order;
      return { orders };
    });
  },
}));
