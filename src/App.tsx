import 'react-native-gesture-handler';
import Bugsnag from '@bugsnag/expo';
// import * as Sentry from 'sentry-expo';
import { useEffect } from 'react';
import { useState } from 'react';
import { Splash } from 'components/Splash';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from 'Main';
import { useFonts } from 'expo-font';
import { registerRootComponent } from 'expo';
import { RootSiblingParent } from 'react-native-root-siblings';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'lib/query';
import { initErrorHandler } from 'lib/errorHandlerConfig';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (!__DEV__) {
  console.log = () => {};
}

initErrorHandler();

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

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
      <GestureHandlerRootView className="flex-1">
        <RootSiblingParent>
          <QueryClientProvider client={queryClient}>
            {/* onStateChange={NewRelic.onStateChange} */}
            <NavigationContainer>
              <AppWrapper />
            </NavigationContainer>
          </QueryClientProvider>
        </RootSiblingParent>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

registerRootComponent(App);
