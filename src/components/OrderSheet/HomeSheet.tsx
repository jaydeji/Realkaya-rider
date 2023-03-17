import { useNavigation } from '@react-navigation/native';
import { useLocation } from 'hooks';
import { findNearestOrder } from 'lib/api';
import { _date } from 'lib/date';
import { snack } from 'lib/snack';
import React from 'react';
import { View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { useMutation } from 'react-query';
import { sheetRoutes } from 'routes';
import { useAppStore, useOrderStore } from 'store';
import { Location } from 'types/app';
import { Span } from '../Span';

export const HomeSheet = () => {
  const navigation = useNavigation();
  const setCurrentSheet = useAppStore((store) => store.setSheet);
  const setCurrentOrder = useOrderStore((store) => store.setCurrentOrder);

  const { isLoading, getLocation } = useLocation({
    onSuccess: (data) => {
      handleSetAuto(data);
    },
  });

  const { mutate: handleSetAuto } = useMutation({
    mutationFn: (location: Location) => findNearestOrder(location),
    onSuccess: (data: any) => {
      if (data?.orderId) {
        setCurrentOrder(data);
        setCurrentSheet(sheetRoutes[2]);
      } else {
        snack('No order found');
        setCurrentSheet(sheetRoutes[0]);
      }
    },
  });

  return (
    <View className="p-5 flex-1 items-center justify-center">
      <Span textClass="text-base font-Mulish-Bold">Where are you?</Span>
      <Span textClass="text-xs mt-[7px] text-center px-5">
        Set your location so we can pickup your product at the right spot and
        find dispatch riders available around you
      </Span>
      <View className="w-full mt-10">
        <TouchableHighlight
          className="bg-primary h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
          onPress={() => {
            getLocation();
          }}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Span textClass="text-white font-Mulish-Bold">
              Set automatically
            </Span>
          )}
        </TouchableHighlight>
      </View>
      <View className="w-full mt-5">
        <TouchableHighlight
          className="bg-alt-1 h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
          onPress={() => navigation.navigate('PickManual')}
        >
          <Span textClass="font-Mulish-Bold">Pick manually</Span>
        </TouchableHighlight>
      </View>
    </View>
  );
};
