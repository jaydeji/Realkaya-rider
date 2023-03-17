import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SheetRoute, UserWithCred } from 'types/app';
import { sheetRoutes } from '../routes';
import { stopLocationTask } from 'lib/location';

type AppLocation = {
  latitude: number;
  longitude: number;
  heading: number | null;
};

type AppStoreState = {
  isAuth: boolean;
  user: null | UserWithCred;
  sheet: SheetRoute;
  location?: AppLocation;
  setUser: (user: UserWithCred, isAuth: boolean) => void;
  updateUser: (user: UserWithCred) => void;
  logout: () => void;
  setSheet: (sheet: SheetRoute) => void;
  setLocation: (location: AppLocation) => void;
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
        stopLocationTask();
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
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (store) => {
        const { isAuth, user, location } = store;
        return { isAuth, user, location };
      },
    }
  )
);
