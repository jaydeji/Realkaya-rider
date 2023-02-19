import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
//@ts-ignore
import { colors, fontFamily } from '../lib/theme';

export const constants = {
  ROLE: 'RIDER',
  TITLE_OPTIONS: (
    opts?: NativeStackNavigationOptions
  ): NativeStackNavigationOptions => ({
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: colors.alt['4'],
    },
    headerTintColor: colors.nav,
    headerTitleStyle: {
      fontFamily: fontFamily['Mulish-ExtraBold'],
      color: colors.primary,
      fontSize: 24,
    },
    ...opts,
  }),
};
