import { View, Text, TouchableHighlight } from 'react-native';

export const OfflineSheet = () => {
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
