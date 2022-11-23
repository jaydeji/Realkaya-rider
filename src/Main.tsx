import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from 'screens/Login';
import { Index } from 'screens/Index';
import { useStore } from 'store';
import { PickManual } from 'screens/PickManual';
import { CancelOrder } from 'screens/CancelOrder';
import { CompleteOrder } from 'screens/CompleteOrder';
import { Welldone } from 'screens/Welldone';
import { OrdersList } from 'screens/OrdersList';
import { Auth, StepOne } from 'screens/Auth';
import { constants } from 'lib/constants';
import { StepTwo } from 'screens/Auth/StepTwo';
import { Step } from 'components/Step';

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
              options={constants.TITLE_OPTIONS({ title: 'Orders' })}
            />
            <Stack.Screen
              name="PickManual"
              component={PickManual}
              options={constants.TITLE_OPTIONS({ title: 'Pick Manually' })}
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
              options={({ route }) =>
                constants.TITLE_OPTIONS({
                  title: `Order ${route.params.orderId}`,
                })
              }
            />
            <Stack.Screen
              name="CancelOrder"
              component={CancelOrder}
              options={constants.TITLE_OPTIONS({ title: 'Cancel the order' })}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={constants.TITLE_OPTIONS()}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={constants.TITLE_OPTIONS()}
            />
            <Stack.Screen
              name="StepOne"
              component={StepOne}
              options={constants.TITLE_OPTIONS({
                headerRight: () => <Step step={1} />,
              })}
            />
            <Stack.Screen
              name="StepTwo"
              component={StepTwo}
              options={constants.TITLE_OPTIONS({
                headerRight: () => <Step step={2} />,
              })}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </>
  );
};
