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
  sheet: sheetRoutes[3],
  orders: [],
  init: async () => {
    const user = await AsyncStorage.getItem('user');
    const isAuth = await AsyncStorage.getItem('isAuth');
    set({ isAuth: !!isAuth, user: user ? JSON.parse(user) : null });
    // AsyncStorage.clear();
  },
  setUser: async (user: any, isAuth: boolean) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('isAuth', JSON.stringify(isAuth));
    set({ isAuth: !!isAuth, user });
  },
  logout: async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('isAuth');
    set({ isAuth: false, user: null });
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
