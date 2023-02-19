import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { Span } from 'components/Span';
import clsx from 'clsx';
//@ts-ignore
import { colors } from 'lib/theme';

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  label?: string;
  textClass?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  disabled?: boolean;
};

export const Input = ({
  value,
  onChange,
  placeholder,
  label,
  textClass,
  autoCapitalize,
  disabled,
  ...props
}: TextInputProps & Props) => {
  return (
    <View>
      {label && (
        <Span
          textClass={clsx(
            'leading-[32px] text-xs text-primary font-Mulish-SemiBold h-5',
            disabled && 'text-gray-400'
          )}
        >
          {label}
        </Span>
      )}
      <TextInput
        placeholder={placeholder}
        value={value}
        className={clsx(
          'px-3 h-[45px] border border-alt-8 rounded-[5px]',
          textClass,
          disabled && 'text-gray-400'
        )}
        onChangeText={onChange}
        placeholderTextColor={colors.alt['8']}
        autoCapitalize={autoCapitalize || 'none'}
        {...(disabled
          ? {
              editable: false,
              selectTextOnFocus: false,
            }
          : {})}
        {...props}
      />
    </View>
  );
};
