import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreState = {
  isAuth: boolean;
  setUser: (user: any, isAuth: boolean) => void;
  init: () => void;
  logout: () => void;
  user: null | Record<string, any>;
};

export const useStore = create<StoreState>((set) => ({
  isAuth: false,
  user: null,
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
}));
