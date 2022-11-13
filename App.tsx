import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useState } from 'react';
import { Splash } from './components/Splash';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from './Main';
import axios from 'axios';
import { handleError } from './lib/handleError';
import { useStore } from './store';

const setupAxios = () => {
  // axios.defaults.baseURL = process.env.API_URL;
  axios.defaults.baseURL = 'http://172.20.10.2:4001';
  axios.interceptors.request.use(
    function (config) {
      const token = useStore.getState().user?.token;
      if (token) {
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      handleError(error);
      return Promise.reject(error);
    }
  );
};

const AppWrapper = () => {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const init = useStore((store) => store.init);

  const setup = async () => {
    setupAxios();
    await init();
  };

  useEffect(() => {
    SplashScreen.hideAsync();
    setup().then(() => setAppReady(true));
  }, []);

  return (
    <>
      {isAppReady && <Main />}
      {!isSplashAnimationComplete && (
        <Splash
          isAppReady={isAppReady}
          setAnimationComplete={(value) => setAnimationComplete(value)}
        />
      )}
    </>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppWrapper />
    </NavigationContainer>
  );
}
