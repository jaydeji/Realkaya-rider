import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import theme from './theme';

export const constants = {
  ROLE: 'RIDER',
  TITLE_OPTIONS: (opts?: {
    title?: string;
    headerRight?: NativeStackNavigationOptions['headerRight'];
  }): NativeStackNavigationOptions => ({
    title: opts?.title || 'RealKaya',
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: theme?.colors.alt['4'],
    },
    headerTintColor: theme?.colors.nav,
    headerTitleStyle: {
      fontFamily: theme?.fontFamily['Mulish-ExtraBold'],
      color: theme?.colors.primary,
      fontSize: 24,
    },
    headerRight: opts?.headerRight,
  }),
};
