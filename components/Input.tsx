import React from 'react';
import { Text, TextInput, View } from 'react-native';
import theme from '../lib/theme';

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  label: string;
};

export const Input = ({ value, onChange, placeholder, label }: Props) => {
  return (
    <View>
      <Text className="leading-[32px] text-xs text-primary font-Mulish-SemiBold h-5">
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        className="p-4 border border-alt-8 rounded-[5px]"
        onChangeText={onChange}
        placeholderTextColor={theme?.colors.alt['8']}
      />
    </View>
  );
};
