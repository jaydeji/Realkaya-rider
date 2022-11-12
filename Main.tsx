import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/Login';
import { useApp } from './context/AppContext';
import { Index } from './screens/Index';

type Props = {};
const Stack = createNativeStackNavigator();

export const Main = ({}: Props) => {
  const { isAuth } = useApp();
  return (
    <>
      <Stack.Navigator>
        {isAuth ? (
          <Stack.Screen
            name="Index"
            component={Index}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </>
  );
};
