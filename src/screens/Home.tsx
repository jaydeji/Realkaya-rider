import React, { useMemo, useRef, useEffect } from 'react';
import { Map } from 'components/Map';
import BottomSheet, { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useAppStore, useOrderStore } from '../store';
import { sheetRoutes } from '../routes';
import {
  OfflineSheet,
  ConnectingSheet,
  HomeSheet,
  OrderSheet,
} from 'components/OrderSheet';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { LoadingSheet } from 'components/OrderSheet/LoadingSheet';
import { _date } from 'lib/date';
import { useGetOrdersByDate } from 'lib/api/hooks';

export const Home = () => {
  const currentSheet = useAppStore((store) => store.sheet);
  const setSheet = useAppStore((store) => store.setSheet);
  const setOrders = useOrderStore((store) => store.setOrders);
  const snapPoints = useMemo(
    () => currentSheet.snapPoints,
    [currentSheet.snapPoints]
  );
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { mutate: getApiOrdersByDate } = useGetOrdersByDate({
    date: '2022-11-12T17:21:10.385Z' || _date.startOfDay().toISOString(),
    onSuccess: (data) => {
      if (!data.length) return setSheet(sheetRoutes[0]);
      setOrders(data);
      setSheet(sheetRoutes[3]);
    },
    onError: () => setSheet(sheetRoutes[0]),
  });

  useEffect(() => {
    getApiOrdersByDate();
  }, []);

  const getSheet = () => {
    switch (currentSheet.name) {
      case sheetRoutes[0].name:
        bottomSheetRef.current?.snapToPosition(sheetRoutes[0].snapPoint);
        return <HomeSheet />;
      case sheetRoutes[1].name:
        bottomSheetRef.current?.snapToPosition(sheetRoutes[1].snapPoint);
        return <ConnectingSheet />;
      case sheetRoutes[2].name:
        bottomSheetRef.current?.snapToPosition(sheetRoutes[2].snapPoint);
        return <OrderSheet />;
      case sheetRoutes[3].name:
        bottomSheetRef.current?.snapToPosition(sheetRoutes[3].snapPoint);
        return <OfflineSheet />;
      case sheetRoutes[4].name:
        bottomSheetRef.current?.snapToPosition(sheetRoutes[4].snapPoint);
        return <LoadingSheet />;
      default:
        return null;
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={BackDrop}
    >
      {getSheet()}
    </BottomSheet>
  );
};

const BackDrop = ({ animatedPosition }: BottomSheetBackdropProps) => {
  const myStylee = useAnimatedStyle(() => {
    return {
      height: interpolate(animatedPosition.value, [0, 1], [0, 1]),
    };
  });

  return (
    <Animated.View style={myStylee}>
      <Map />
    </Animated.View>
  );
};
