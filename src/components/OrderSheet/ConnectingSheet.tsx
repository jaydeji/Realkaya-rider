import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Span } from 'components/Span';

export const ConnectingSheet = () => {
  return (
    <View className="px-3 flex-1">
      <Span textClass="text-base font-Mulish-Bold">Connecting to an order</Span>
      <Span textClass="text-xs mt-[7px]">
        Please wait for an order before you confirm
      </Span>
      <View className="bg-[#E5E5E5] h-4 w-full mt-7"></View>
      <View className="w-full mt-10">
        <TouchableHighlight className="bg-[#E5E5E5] h-[50px] items-center justify-center rounded-[5px] overflow-hidden">
          <Span textClass="font-Mulish-Bold">Pick manually</Span>
        </TouchableHighlight>
      </View>
    </View>
  );
};
