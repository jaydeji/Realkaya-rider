import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CheckBoxFilledIcon } from '../assets/icons/CheckBox';
import { Span } from './Span';

type Props = {
  checked?: boolean;
  onPress?: () => void;
  text?: string;
};

export const CheckBox = ({ checked, onPress, text }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center">
        {checked ? (
          <CheckBoxFilledIcon />
        ) : (
          <View className="w-4 h-4 border border-light-text rounded-[3px]" />
        )}
        <Span textClass="ml-2 text-primary text-sm font-Mulish-SemiBold">
          {text}
        </Span>
      </View>
    </TouchableOpacity>
  );
};
