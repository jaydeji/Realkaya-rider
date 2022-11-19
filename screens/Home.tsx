import React, { useMemo, useCallback, useRef } from 'react';
import { Map } from '../components/Map';
import BottomSheet from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useStore } from '../store';
import { sheetRoutes } from '../routes';
import {
  OfflineSheet,
  ConnectingSheet,
  HomeSheet,
  OrderSheet,
} from '../components/OrderSheet';

export const Home = () => {
  const snapPoints = useMemo(() => ['40%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const currentSheet = useStore((store) => store.sheet);
  const setCurrentSheet = useStore((store) => store.setSheet);
  const addOrders = useStore((store) => store.addOrders);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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
        bottomSheetRef.current?.snapToPosition('40%');
        return (
          <HomeSheet
            handleSetAuto={() => {
              setCurrentSheet(sheetRoutes[1]);
              handleFindNearestOrder();
            }}
          />
        );
      case sheetRoutes[1].name:
        bottomSheetRef.current?.snapToPosition('30%');
        return <ConnectingSheet />;
      case sheetRoutes[2].name:
        bottomSheetRef.current?.snapToPosition('40%');
        return <OrderSheet />;
      case sheetRoutes[3].name:
        bottomSheetRef.current?.snapToPosition('40%');
        return <OfflineSheet />;
      default:
        return null;
    }
  };

  return (
    <Map>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        {getSheet()}
      </BottomSheet>
    </Map>
  );
};
