import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export const HomeSheet = ({ handleSetAuto }: { handleSetAuto: () => void }) => {
  const navigation = useNavigation();

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
        <TouchableHighlight
          className="bg-alt-1 h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
          onPress={() => navigation.navigate('PickManual')}
        >
          <Text className="font-bold">Pick manually</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
