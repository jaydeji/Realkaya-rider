import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, OrderDetailsSummary } from 'components';
import { Span } from 'components/Span';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList, ScreensStackParamList } from 'types/navigation';
import { useAppStore } from 'store';
import { goToHomeSheet } from 'lib/order';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from 'react-query';
import { updateUser } from 'lib/api';

export const Welldone = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Welldone'>>();
  const order = params.order;
  const navigation =
    useNavigation<NativeStackNavigationProp<ScreensStackParamList>>();

  const user = useAppStore((store) => store.user!);
  const updateStoreUser = useAppStore((store) => store.updateUser);
  const online = user?.user.online;

  const { mutate: updateApiUser } = useMutation({
    mutationFn: updateUser,
  });

  const handleContinue = () => {
    goToHomeSheet();
    navigation.navigate('Home');
  };

  const handleGoOffline = () => {
    updateStoreUser({
      ...user,
      user: { ...user?.user, online: !online },
    });
    updateApiUser({ online: !online });
    handleContinue();
  };

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="p-5 flex-1">
        <Span textClass="text-center text-alt-6 font-Mulish-ExtraBold text-2xl">
          Welldone!
        </Span>
        <Span textClass="text-center mt-3 text-light-text">
          Thanks for the delivery. You,ve earned some cash for this
          delivery.Summary of delivery is detailed below. Would you like to
          continue?
        </Span>
        <OrderDetailsSummary order={order} />

        <View className="flex-row mt-14 gap-x-5">
          <View className="flex-1">
            <Button
              bodyClass="bg-alt-3"
              textClass="text-primary"
              onPress={() => handleGoOffline()}
            >
              Go {online ? 'offline' : 'online'}
            </Button>
          </View>
          <View className="flex-1">
            <Button onPress={() => handleContinue()}>Continue</Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
