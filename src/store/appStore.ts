import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SheetRoute, UserWithCred } from 'types/app';
import { sheetRoutes } from '../routes';
import * as Location from 'expo-location';

type AppStoreState = {
  isAuth: boolean;
  user: null | UserWithCred;
  sheet: SheetRoute;
  location?: Location.LocationObject;
  setUser: (user: UserWithCred, isAuth: boolean) => void;
  updateUser: (user: UserWithCred) => void;
  logout: () => void;
  setSheet: (sheet: SheetRoute) => void;
  setLocation: (location: Location.LocationObject) => void;
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
      setLocation: (location) => {
        set({ location });
      },
    }),
    {
      name: 'app-storage',
      getStorage: () => AsyncStorage,
      partialize: (store) => {
        const { isAuth, user, location } = store;
        return { isAuth, user, location };
      },
    }
  )
);
