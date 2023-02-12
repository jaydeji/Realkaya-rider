import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SheetRoute, UserWithCred } from 'types/app';
import { sheetRoutes } from '../routes';

type AppStoreState = {
  isAuth: boolean;
  user: null | UserWithCred;
  sheet: SheetRoute;
  setUser: (user: UserWithCred, isAuth: boolean) => void;
  updateUser: (user: UserWithCred) => void;
  logout: () => void;
  setSheet: (sheet: SheetRoute) => void;
};

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      sheet: sheetRoutes[4],
      setUser: (user, isAuth) => {
        set({ isAuth: !!isAuth, user });
      },
      updateUser: (user) => {
        set({ user });
      },
      logout: () => {
        set({ isAuth: false, user: null });
      },
      setSheet: (sheet) => {
        set({ sheet });
      },
    }),
    {
      name: 'app-storage',
      getStorage: () => AsyncStorage,
      partialize: (store) => {
        const { isAuth, user } = store;
        return { isAuth, user };
      },
    }
  )
);
