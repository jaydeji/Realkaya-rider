import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { ArrowRightIcon, BatteryIcon, DoubleRightIcon } from 'assets/icons';
import { Span } from 'components/Span';
import { Stars } from '../Stars';
import { SwipeButton } from 'components/Swipe/SwipeButton';
import { useAppStore, useOrderStore } from 'store';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { sheetRoutes } from 'routes';
import { useMutation } from 'react-query';
import { updateUser } from 'lib/api';

export const OfflineSheet = () => {
  const user = useAppStore((store) => store.user!);
  const updateStoreUser = useAppStore((store) => store.updateUser);
  const orders = useOrderStore((store) => store.orders);
  const setSheet = useAppStore((store) => store.setSheet);
  const navigation = useNavigation();

  const online = user?.user.online;

  useEffect(() => {
    if (!orders.length) setSheet(sheetRoutes[0]);
  }, [orders.length]);

  const { mutate: updateApiUser } = useMutation({
    mutationFn: updateUser,
  });

  return (
    <View className="flex-1">
      <SwipeButton
        thumbIconComponent={() => <DoubleRightIcon />}
        thumbIconBackgroundColor="transparent"
        title={`Go ${!online ? 'online' : 'offline'}`}
        //add font family
        titleStyles={{
          fontSize: 16,
        }}
        shouldResetAfterSuccess
        onSwipeSuccess={() => {
          updateStoreUser({
            ...user,
            user: { ...user?.user, online: !online },
          });
          updateApiUser({ online: !online });
        }}
      />
      <View className="p-5">
        <TouchableOpacity onPress={() => navigation.navigate('OrdersList')}>
          <View className="flex-row items-center justify-between py-4 pl-[10px] pr-[22px] shadow-1 bg-white">
            <BatteryIcon />
            <View className="ml-[14px] flex-1">
              <Span textClass="text-sm font-Mulish-SemiBold text-primary">
                You have {orders.length} order{orders.length > 1 ? 's ' : ' '}
                left
              </Span>
              <Span textClass="text-light-text text-xs">
                Complete your remaining orders
              </Span>
            </View>
            <ArrowRightIcon />
          </View>
        </TouchableOpacity>
        <View className="mt-5 flex-row justify-between items-center pr-[22px]">
          <View>
            <Span textClass="text-xs text-light-text">TODAY'S EARNINGS</Span>
            <View className="flex-row items-center justify-between pb-[14px] border-b border-b-alt-3 mt-3">
              <Span textClass="text-primary font-Mulish-SemiBold text-xl">
                ₦0.00
              </Span>
            </View>
          </View>
          <ArrowRightIcon />
        </View>
        <View className="mt-5 flex-row justify-between items-center pr-[22px]">
          <View>
            <Span textClass="text-xs text-light-text">CURRENT RATING</Span>
            <View className="flex-row items-center justify-between pb-[14px] border-b border-b-alt-3 mt-3">
              <Stars value={4} />
              <Span textClass="text-primary font-Mulish-SemiBold text-xl ml-2">
                5.0
              </Span>
            </View>
          </View>
          <ArrowRightIcon />
        </View>
      </View>
    </View>
  );
};
