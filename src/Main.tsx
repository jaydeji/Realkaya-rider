import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Index } from 'screens/Index';
import { useAppStore } from 'store';
import { PickManual } from 'screens/PickManual';
import { CancelOrder } from 'screens/CancelOrder';
import { CompleteOrder } from 'screens/CompleteOrder';
import { Welldone } from 'screens/Welldone';
import { OrdersList } from 'screens/OrdersList';
import {
  Auth,
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  SignUpDone,
  Login,
  ForgotPassword,
} from 'screens/Auth';
import { constants } from 'lib/constants';
import { Step } from 'components/Step';
import { RootStackParamList } from 'types/navigation';
import Profile from 'screens/Profile';
import { OrderDetails } from 'screens/OrderDetails';
import { Support } from 'screens/Support';
//@ts-ignore
import { colors, fontFamily } from './lib/theme';
import { Inbox } from 'screens/Inbox';
import { ChatBox } from 'screens/ChatBox';
import { About } from 'screens/About';
import * as Sentry from 'sentry-expo';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Main = () => {
  const isAuth = useAppStore((store) => store.isAuth);

  useEffect(() => {
    Sentry.Native.addBreadcrumb({
      type: 'transaction',
      category: 'sentry.transaction',
      message: 'Entered main',
    });
  }, []);

  return (
    <>
      <RootStack.Navigator>
        {isAuth ? (
          <RootStack.Group>
            <RootStack.Screen
              name="Index"
              component={Index}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="Support"
              component={Support}
              options={constants.TITLE_OPTIONS({
                title: 'Support',
                headerTitleStyle: {
                  fontFamily: fontFamily['Mulish-ExtraBold'],
                  color: colors['main-blue'],
                  fontSize: 24,
                },
              })}
            />
            <RootStack.Screen
              name="Inbox"
              component={Inbox}
              options={constants.TITLE_OPTIONS({
                title: 'Inbox',
                headerTitleStyle: {
                  fontFamily: fontFamily['Mulish-ExtraBold'],
                  color: colors['main-blue'],
                  fontSize: 24,
                },
              })}
            />
            <RootStack.Screen
              name="ChatBox"
              component={ChatBox}
              options={constants.TITLE_OPTIONS({
                title: 'Chat Box',
                headerTitleStyle: {
                  fontFamily: fontFamily['Mulish-ExtraBold'],
                  color: colors['main-blue'],
                  fontSize: 24,
                },
              })}
            />
            <RootStack.Screen
              name="OrderDetails"
              component={OrderDetails}
              options={({ route }) =>
                constants.TITLE_OPTIONS({
                  title: `Order ${route.params.order.orderId}`,
                })
              }
            />
            <RootStack.Screen
              name="OrdersList"
              component={OrdersList}
              options={constants.TITLE_OPTIONS({ title: 'Orders' })}
            />
            <RootStack.Screen
              name="PickManual"
              component={PickManual}
              options={constants.TITLE_OPTIONS({ title: 'Pick Manually' })}
            />
            <RootStack.Screen
              name="Welldone"
              component={Welldone}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="About"
              component={About}
              options={constants.TITLE_OPTIONS({ title: 'About RealKaya' })}
            />

            <RootStack.Screen
              name="CompleteOrder"
              component={CompleteOrder}
              options={({ route }) =>
                constants.TITLE_OPTIONS({
                  title: `Order ${route.params.orderId}`,
                })
              }
            />
            <RootStack.Screen
              name="CancelOrder"
              component={CancelOrder}
              options={constants.TITLE_OPTIONS({ title: 'Cancel the order' })}
            />
            <RootStack.Screen
              name="Profile"
              component={Profile}
              options={constants.TITLE_OPTIONS({ title: 'Account' })}
            />
          </RootStack.Group>
        ) : (
          <RootStack.Group>
            <RootStack.Screen
              name="Auth"
              component={Auth}
              options={constants.TITLE_OPTIONS({ title: 'RealKaya' })}
            />
            <RootStack.Screen
              name="Login"
              component={Login}
              options={constants.TITLE_OPTIONS({ title: 'RealKaya' })}
            />
            <RootStack.Screen
              name="StepTwo"
              component={StepTwo}
              options={constants.TITLE_OPTIONS({
                headerRight: () => <Step step={2} />,
                title: 'RealKaya',
              })}
            />
            <RootStack.Screen
              name="SignUpDone"
              component={SignUpDone}
              options={constants.TITLE_OPTIONS({ headerShown: false })}
            />
            <RootStack.Screen
              name="StepFour"
              component={StepFour}
              options={constants.TITLE_OPTIONS({
                headerRight: () => <Step step={4} />,
                title: 'RealKaya',
              })}
            />
            <RootStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={constants.TITLE_OPTIONS({ title: 'RealKaya' })}
            />

            <RootStack.Screen
              name="StepThree"
              component={StepThree}
              options={constants.TITLE_OPTIONS({
                headerRight: () => <Step step={3} />,
                title: 'RealKaya',
              })}
            />

            <RootStack.Screen
              name="StepOne"
              component={StepOne}
              options={constants.TITLE_OPTIONS({
                headerRight: () => <Step step={1} />,
                title: 'RealKaya',
              })}
            />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
      <StatusBar style="auto" />
    </>
  );
};
