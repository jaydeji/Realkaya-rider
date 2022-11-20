import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import { Map } from '../components/Map';
import BottomSheet, {
  BottomSheetBackdropProps,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useStore } from '../store';
import { sheetRoutes } from '../routes';
import {
  OfflineSheet,
  ConnectingSheet,
  HomeSheet,
  OrderSheet,
} from '../components/OrderSheet';
import { Dimensions, Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Button from '../components/Button';

export const Home = () => {
  const currentSheet = useStore((store) => store.sheet);
  const snapPoints = useMemo(
    () => currentSheet.snapPoints,
    [currentSheet.snapPoints]
  );
  const bottomSheetRef = useRef<BottomSheet>(null);
  const setCurrentSheet = useStore((store) => store.setSheet);
  const addOrders = useStore((store) => store.addOrders);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handleFindNearestOrder = async () => {
    try {
      const { data } = await axios.post('/orders/nearest', {
        latitude: 6.520238459241921,
        longitude: 3.3680734868226345,
      });
      if (data.data?.orderId) {
        setCurrentSheet(sheetRoutes[2]);
        addOrders([data.data]);
      }
    } catch (error) {}
  };
  const getSheet = () => {
    switch (currentSheet.name) {
      case sheetRoutes[0].name:
        bottomSheetRef.current?.snapToPosition(sheetRoutes[0].snapPoint);
        return (
          <HomeSheet
            handleSetAuto={() => {
              setCurrentSheet(sheetRoutes[1]);
              handleFindNearestOrder();
            }}
          />
        );
      case sheetRoutes[1].name:
        bottomSheetRef.current?.snapToPosition(sheetRoutes[1].snapPoint);
        return <ConnectingSheet />;
      case sheetRoutes[2].name:
        bottomSheetRef.current?.snapToPosition(sheetRoutes[2].snapPoint);
        return <OrderSheet />;
      case sheetRoutes[3].name:
        bottomSheetRef.current?.snapToPosition(sheetRoutes[3].snapPoint);
        return <OfflineSheet />;
      default:
        return null;
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
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
