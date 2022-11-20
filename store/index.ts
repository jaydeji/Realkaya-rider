import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order, SheetRoute } from '../types';
import { sheetRoutes } from '../routes';

type StoreState = {
  isAuth: boolean;
  user: null | Record<string, any>;
  sheet: SheetRoute;
  orders: Order[];
  setUser: (user: any, isAuth: boolean) => void;
  init: () => void;
  logout: () => void;
  setSheet: (sheet: SheetRoute) => void;
  addOrders: (orders: Order[]) => void;
  removeOrder: (orderId: number) => void;
  updateOrder: (order: Order) => void;
};

export const useStore = create<StoreState>((set) => ({
  isAuth: false,
  user: null,
  sheet: sheetRoutes[0],
  orders: [],
  init: async () => {
    // AsyncStorage.clear();
    const [user, isAuth] = await Promise.all([
      AsyncStorage.getItem('user'),
      AsyncStorage.getItem('isAuth'),
    ]);
    set({ isAuth: !!isAuth, user: user ? JSON.parse(user) : null });
  },
  setUser: async (user: any, isAuth: boolean) => {
    set({ isAuth: !!isAuth, user });
    await Promise.all([
      AsyncStorage.setItem('user', JSON.stringify(user)),
      AsyncStorage.setItem('isAuth', JSON.stringify(isAuth)),
    ]);
  },
  logout: async () => {
    set({ isAuth: false, user: null });
    await Promise.all([
      AsyncStorage.removeItem('user'),
      AsyncStorage.removeItem('isAuth'),
    ]);
  },
  setSheet: (sheet: SheetRoute) => {
    set({ sheet });
  },
  addOrders: (orders: Order[]) => {
    set((store) => ({ orders: store.orders.concat(orders) }));
  },
  removeOrder: (orderId: number) => {
    set((store) => ({
      orders: store.orders.filter((order) => order.orderId !== orderId),
    }));
  },
  updateOrder: (_order: Order) => {
    set((store) => {
      const orders = [...store.orders];
      const orderIndex = orders.findIndex((e) => e.orderId === _order.orderId);
      orders[orderIndex] = _order;
      return { orders };
    });
  },
}));
