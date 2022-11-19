import { View, Text } from 'react-native';
import { ProfileIcon } from '../../assets/icons/Profile';

export const OrderLineTopProfile = () => {
  return (
    <View className="mt-14">
      <View className="flex-row items-center">
        <ProfileIcon />
        <Text className="text-sm font-bold text-primary ml-2">Andre Krist</Text>
      </View>
      <View className="mt-[10px]"></View>
    </View>
  );
};
