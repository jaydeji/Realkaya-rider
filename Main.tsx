import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/Login';
import { Index } from './screens/Index';
import { useStore } from './store';
import { PickManual } from './screens/PickManual';
import { CancelOrder } from './screens/CancelOrder';
import { CompleteOrder } from './screens/CompleteOrder';
import { Welldone } from './screens/Welldone';
import { OrdersList } from './screens/OrdersList';
import { Auth, StepOne } from './screens/Auth';

type Props = {};
const Stack = createNativeStackNavigator();

export const Main = ({}: Props) => {
  const isAuth = useStore((store) => store.isAuth);
  return (
    <>
      <Stack.Navigator>
        {isAuth ? (
          <Stack.Group>
            <Stack.Screen
              name="Index"
              component={Index}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OrdersList"
              component={OrdersList}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PickManual"
              component={PickManual}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Welldone"
              component={Welldone}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CompleteOrder"
              component={CompleteOrder}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CancelOrder"
              component={CancelOrder}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StepOne"
              component={StepOne}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </>
  );
};
