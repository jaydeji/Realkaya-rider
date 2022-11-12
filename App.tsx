import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useState } from 'react';
import { Splash } from './components/Splash';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from './Main';
import { AppContextProvider, useApp } from './context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppWrapper = () => {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const { init } = useApp();

  const setup = async () => {
    const isAuth = await AsyncStorage.getItem('isAuth');
    await init({ isAuth: isAuth === 'true' ? true : false });
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
      <AppContextProvider>
        <AppWrapper />
      </AppContextProvider>
    </NavigationContainer>
  );
}
