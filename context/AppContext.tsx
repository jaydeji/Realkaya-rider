import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

type Props = {
  children: React.ReactElement;
};
type App = {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  init: ({}: any) => void;
};
const initialvalue: any = {};

const AppContext = createContext<App>(initialvalue);
export const useApp = () => useContext(AppContext);

export const AppContextProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  //   await AsyncStorage.clear();

  const init = ({ isAuth }: { isAuth: boolean }) => {
    setIsAuth(isAuth);
  };

  return (
    <AppContext.Provider
      value={{
        isAuth,
        setIsAuth: async (value: boolean) => {
          await AsyncStorage.setItem('isAuth', `${value}`);
          setIsAuth(value);
        },
        init,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
