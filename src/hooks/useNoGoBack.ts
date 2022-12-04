import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { RootStackParamList } from 'types/navigation';

export const useNoGoBack = (
  navigation: NativeStackNavigationProp<RootStackParamList>
) => {
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerBackVisible: false,
      headerLeft: () => null,
    });
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, []);
};
