import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import theme from '../lib/theme';
import { Span } from 'components/Span';

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  label: string;
};

export const Input = ({
  value,
  onChange,
  placeholder,
  label,
  ...props
}: TextInputProps & Props) => {
  return (
    <View>
      <Span textClass="leading-[32px] text-xs text-primary font-Mulish-SemiBold h-5">
        {label}
      </Span>
      <TextInput
        placeholder={placeholder}
        value={value}
        className="p-4 border border-alt-8 rounded-[5px]"
        onChangeText={onChange}
        placeholderTextColor={theme?.colors.alt['8']}
        {...props}
      />
    </View>
  );
};
