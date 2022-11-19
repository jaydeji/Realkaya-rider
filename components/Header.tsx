import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Back } from '../assets/icons/Back';

type Props = {
  onPress: () => void;
  title: string;
  right?: React.ReactNode;
};

const Header = ({ onPress, title, right }: Props) => {
  return (
    <View className="flex-row relative justify-center items-center">
      <View className="absolute left-0">
        <TouchableWithoutFeedback onPress={onPress}>
          <Back />
        </TouchableWithoutFeedback>
      </View>
      <Text className="text-xl font-extrabold">{title}</Text>
      <View className="absolute right-0">{right}</View>
    </View>
  );
};

export default Header;
