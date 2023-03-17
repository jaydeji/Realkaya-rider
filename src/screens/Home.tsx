import React, { useEffect } from 'react';
import { Map } from 'components/Map';
import { useAppStore, useOrderStore } from '../store';
import { sheetRoutes } from '../routes';
import {
  OfflineSheet,
  ConnectingSheet,
  HomeSheet,
  OrderSheet,
} from 'components/OrderSheet';
import { LoadingSheet } from 'components/OrderSheet/LoadingSheet';
import { _date } from 'lib/date';
import { useGetOngoingOrdersByDate } from 'lib/api/hooks';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { View } from 'react-native';

const LOCATION_TRACKING = 'location-tracking';

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log('LOCATION_TRACKING task ERROR:', error);
    return;
  }
  if (data) {
    const { locations } = data as any;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  }
});

const requestPermissions = async () => {
  try {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
          accuracy: Location.Accuracy.Balanced,
          // timeInterval: 10000,
          // foregroundService: {
          //   notificationTitle: "App Name",
          //   notificationBody: "Location is used when App is in background",
          // },
          // activityType: Location.ActivityType.AutomotiveNavigation,
          // showsBackgroundLocationIndicator: true,
        });
      }
    }
  } catch (e) {
    console.log('ee', e);
  }
};

export const Home = () => {
  const currentSheet = useAppStore((store) => store.sheet);
  const setSheet = useAppStore((store) => store.setSheet);
  const setOrders = useOrderStore((store) => store.setOrders);

  const { mutate: getApiOrdersByDate } = useGetOngoingOrdersByDate({
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

  useEffect(() => {
    const startLocationTracking = async () => {
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 5000,
        distanceInterval: 0,
      });
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING
      );
      console.log('tracking started?', hasStarted);
    };

    requestPermissions().then((e) => {
      startLocationTracking();
    });

    // const config = async () => {
    //   let res = await Permissions.askAsync(Permissions.LOCATION);
    //   if (res.status !== 'granted') {
    //     console.log('Permission to access location was denied');
    //   } else {
    //     console.log('Permission to access location granted');
    //   }
    // };

    // config();
  }, []);

  const getSheet = () => {
    switch (currentSheet.name) {
      case sheetRoutes[0].name:
        return <HomeSheet />;
      case sheetRoutes[1].name:
        return <ConnectingSheet />;
      case sheetRoutes[2].name:
        return <OrderSheet />;
      case sheetRoutes[3].name:
        return <OfflineSheet />;
      case sheetRoutes[4].name:
        return <LoadingSheet />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1">
      <View className="h-[60%]">
        <Map />
      </View>
      <View className="h-[40%] rounded-3xl bg-white mt-[-15px] pt-4">
        {getSheet()}
      </View>
    </View>
  );
};
