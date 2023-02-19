//https://reactnavigation.org/docs/typescript/
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';

export type RootStackParamList = {
  Index: NavigatorScreenParams<IndexDrawerParamList>;
  OrdersList: undefined;
  PickManual: undefined;
  Welldone: undefined;
  CompleteOrder: { orderId: number };
  CancelOrder: { orderId: number };
  Auth: undefined;
  Login: undefined;
  StepOne: undefined;
  StepTwo: undefined;
  StepThree: undefined;
  StepFour: undefined;
  SignUpDone: undefined;
  ForgotPassword: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type IndexDrawerParamList = {
  Screens: NavigatorScreenParams<ScreensStackParamList>;
};

export type ScreensStackParamList = {
  Home: undefined;
  Details: undefined;
};

// export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
//   CompositeScreenProps<
//     DrawerScreenProps<HomeTabParamList, T>,
//     RootStackScreenProps<keyof RootStackParamList>
//   >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
