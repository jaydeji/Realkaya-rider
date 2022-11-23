import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useState } from 'react';
import { Splash } from 'components/Splash';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from 'Main';
import axios from 'axios';
import { handleError } from 'lib/handleError';
import { useStore } from 'store';
import { useFonts } from 'expo-font';
import { registerRootComponent } from 'expo';

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
  const [isSetupDone, setSetupDone] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const init = useStore((store) => store.init);
  const [fontsLoaded] = useFonts({
    Mulish: require('./assets/fonts/Mulish-Regular.ttf'),
    'Mulish-Medium': require('./assets/fonts/Mulish-Medium.ttf'),
    'Mulish-SemiBold': require('./assets/fonts/Mulish-SemiBold.ttf'),
    'Mulish-Bold': require('./assets/fonts/Mulish-Bold.ttf'),
    'Mulish-ExtraBold': require('./assets/fonts/Mulish-ExtraBold.ttf'),
  });

  const setup = async () => {
    setupAxios();
    await init();
  };

  useEffect(() => {
    SplashScreen.hideAsync();
    setup().then(() => setSetupDone(true));
  }, []);

  useEffect(() => {
    if (isSetupDone && fontsLoaded) setAppReady(true);
  }, [isSetupDone, fontsLoaded]);

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

const App = () => {
  return (
    <NavigationContainer>
      <AppWrapper />
    </NavigationContainer>
  );
};

registerRootComponent(App);
