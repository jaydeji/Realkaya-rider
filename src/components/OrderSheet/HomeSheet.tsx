import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Span } from '../Span';

export const HomeSheet = ({ handleSetAuto }: { handleSetAuto: () => void }) => {
  const navigation = useNavigation();

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
          onPress={handleSetAuto}
        >
          <Span textClass="text-white font-Mulish-Bold">Set automatically</Span>
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
