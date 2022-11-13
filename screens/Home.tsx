import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useMemo, useCallback, useState, useRef } from 'react';
import { Button, View, Text } from 'react-native';
import { Map } from '../components/Map';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import BottomSheet from '@gorhom/bottom-sheet';
import { TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios';

type Props = {};

const HomeSheet = ({ handleSetAuto }: any) => {
  return (
    <View className="p-5 flex-1 items-center justify-center">
      <Text className="text-base font-bold">Where are you?</Text>
      <Text className="text-xs mt-[7px] text-center px-5">
        Set your location so we can pickup your product at the right spot and
        find dispatch riders available around you
      </Text>
      <View className="w-full mt-10">
        <TouchableHighlight
          className="bg-primary h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
          onPress={handleSetAuto}
        >
          <Text className="text-white font-bold">Set automatically</Text>
        </TouchableHighlight>
      </View>
      <View className="w-full mt-5">
        <TouchableHighlight className="bg-alt-1 h-[50px] items-center justify-center rounded-[5px] overflow-hidden">
          <Text className="font-bold">Set later</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const ConnectingSheet = () => {
  return (
    <View className="px-3 flex-1">
      <Text className="text-base font-bold">Connecting to an order</Text>
      <Text className="text-xs mt-[7px]">
        Please wait for an order before you confirm
      </Text>
      <View className="bg-[#E5E5E5] h-4 w-full mt-7"></View>
      <View className="w-full mt-10">
        <TouchableHighlight className="bg-[#E5E5E5] h-[50px] items-center justify-center rounded-[5px] overflow-hidden">
          <Text className="font-bold">Pick manually</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const OrderSheet = ({ order }: any) => {
  console.log(order);
  return (
    <View className="px-3 flex-1">
      <View className="flex-row justify-between">
        <Text className="text-base">Pickup Address</Text>
        <Text className="text-base">
          {(order.distance / 1000).toFixed(2)}km
        </Text>
      </View>
      <View>
        <Text>{order.senderAddress}</Text>
      </View>
      <View>
        <Text>{order.recepientAddress}</Text>
      </View>
      <View className="flex-row justify-between border-b">
        <Text className="text-base">Estimated fare</Text>
        <Text className="text-base">Payment method</Text>
      </View>
      <View className="flex-row justify-between border-b">
        <Text className="text-base">300</Text>
        <Text className="text-base">{order.paymentMethod}</Text>
      </View>
      <View className="w-full mt-10">
        <TouchableHighlight className="bg-[#E5E5E5] h-[50px] items-center justify-center rounded-[5px] overflow-hidden">
          <Text className="font-bold">Pick manually</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const sheetRoutes = [
  {
    name: 'home',
    snapPoint: '40%',
  },
  {
    name: 'connecting',
    snapPoint: '30%',
  },
  {
    name: 'order',
    snapPoint: '40%',
  },
];

export const Home = (props: Props) => {
  // const snapPoints = useMemo(() => ['25%', '50%'], []);
  const snapPoints = useMemo(() => ['40%'], []);
  const [isAutoSearching, setIsAutoSearching] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [order, setOrder] = useState();
  const [currentSheet, setCurrentSheet] = useState(sheetRoutes[0]);
  const bottomSheetRef = useRef<BottomSheet>(null);

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
        setShowOrder(true);
        setIsAutoSearching(false);
        setOrder(data.data);
      }
    } catch (error) {}
  };

  const getSheet = useCallback(() => {
    switch (currentSheet.name) {
      case sheetRoutes[0].name:
        bottomSheetRef.current?.snapToPosition('40%');
        return (
          <HomeSheet
            handleSetAuto={() => {
              setIsAutoSearching(true);
              handleFindNearestOrder();
            }}
          />
        );
      case sheetRoutes[1].name:
        bottomSheetRef.current?.snapToPosition('30%');
        return <ConnectingSheet />;
      case sheetRoutes[2].name:
        bottomSheetRef.current?.snapToPosition('40%');
        return <OrderSheet order={order} />;
      default:
        break;
    }
  }, []);
  // const getSheet = useCallback(() => {
  //   if (showOrder && order) {
  //     bottomSheetRef.current?.snapToPosition('40%');
  //     return <OrderSheet order={order} />;
  //   }
  //   if (isAutoSearching) {
  //     bottomSheetRef.current?.snapToPosition('30%');
  //     return <ConnectingSheet />;
  //   }
  //   bottomSheetRef.current?.snapToPosition('40%');
  //   return (
  //     <HomeSheet
  //       handleSetAuto={() => {
  //         setIsAutoSearching(true);
  //         handleFindNearestOrder();
  //       }}
  //     />
  //   );
  // }, [isAutoSearching, order]);

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
