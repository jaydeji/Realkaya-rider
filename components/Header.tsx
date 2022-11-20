import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Back } from '../assets/icons/Back';

type Props = {
  onPress?: () => void;
  title: string;
  right?: React.ReactNode;
  hideLeft?: boolean;
};

const Header = ({ onPress, title, right, hideLeft }: Props) => {
  return (
    <View className="flex-row justify-center items-center">
      <View className="flex-1 flex-row justify-start items-center">
        {!hideLeft && (
          <TouchableWithoutFeedback onPress={onPress}>
            <Back />
          </TouchableWithoutFeedback>
        )}
      </View>
      <Text className="flex-grow flex-row text-xl text-center font-Mulish-ExtraBold">
        {title}
      </Text>
      <View className="flex-1 flex-row justify-end items-center">{right}</View>
    </View>
  );
};

export default Header;
