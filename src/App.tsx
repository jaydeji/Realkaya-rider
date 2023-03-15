import 'react-native-gesture-handler';
import Bugsnag from '@bugsnag/expo';
// import * as Sentry from 'sentry-expo';
import { useEffect } from 'react';
import { useState } from 'react';
import { Splash } from 'components/Splash';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from 'Main';
import axios from 'axios';
import { handleError } from 'lib/handleError';
import { useAppStore } from 'store';
import { useFonts } from 'expo-font';
import { registerRootComponent } from 'expo';
import { RootSiblingParent } from 'react-native-root-siblings';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'lib/query';
import { initErrorHandler } from 'lib/errorHandlerConfig';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

initErrorHandler();

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const setupAxios = () => {
  // axios.defaults.baseURL = process.env.API_URL;
  axios.defaults.baseURL = 'https://realkaya-be-development.up.railway.app';
  // axios.defaults.baseURL = 'http://172.20.10.3:4001';
  // axios.defaults.baseURL = 'http://192.168.100.19:4001';
  axios.interceptors.request.use(
    function (config) {
      const token = useAppStore.getState().user?.token;
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

  // Sentry.Native.addBreadcrumb({
  //   type: 'transaction',
  //   category: 'sentry.transaction',
  //   message: 'Setup axios',
  // });
};

const AppWrapper = () => {
  const [isAppReady, setAppReady] = useState(false);
  const [isSetupDone, setSetupDone] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  const [fontsLoaded] = useFonts({
    Mulish: require('./assets/fonts/Mulish-Regular.ttf'),
    'Mulish-Medium': require('./assets/fonts/Mulish-Medium.ttf'),
    'Mulish-SemiBold': require('./assets/fonts/Mulish-SemiBold.ttf'),
    'Mulish-Bold': require('./assets/fonts/Mulish-Bold.ttf'),
    'Mulish-ExtraBold': require('./assets/fonts/Mulish-ExtraBold.ttf'),
  });

  useEffect(() => {
    SplashScreen.hideAsync();
    // Sentry.Native.addBreadcrumb({
    //   type: 'transaction',
    //   category: 'sentry.transaction',
    //   message: 'Hid splash screen',
    // });
    setupAxios();
    setSetupDone(true);
  }, []);

  useEffect(() => {
    if (isSetupDone && fontsLoaded) {
      setAppReady(true);
      // Sentry.Native.addBreadcrumb({
      //   type: 'transaction',
      //   category: 'sentry.transaction',
      //   message: 'App ready',
      // });
    }
  }, [isSetupDone, fontsLoaded]);

  return (
    <>
      {isAppReady && <Main />}
      {!isSplashAnimationComplete && (
        <Splash
          fontsLoaded={fontsLoaded}
          isAppReady={isAppReady}
          setAnimationComplete={(value) => setAnimationComplete(value)}
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <RootSiblingParent>
        <GestureHandlerRootView className="flex-1">
          <QueryClientProvider client={queryClient}>
            {/* onStateChange={NewRelic.onStateChange} */}
            <NavigationContainer>
              <AppWrapper />
            </NavigationContainer>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </RootSiblingParent>
    </ErrorBoundary>
  );
};

registerRootComponent(App);
