import { View, Text } from 'react-native';
import { ProfileIcon } from '../../assets/icons/Profile';
import { Span } from '../Span';

export const OrderLineTopProfile = () => {
  return (
    <View className="mt-14">
      <View className="flex-row items-center">
        <ProfileIcon />
        <Span textClass="text-sm font-Mulish-Bold text-primary ml-2">
          Andre Krist
        </Span>
      </View>
      <View className="mt-[10px]"></View>
    </View>
  );
};
