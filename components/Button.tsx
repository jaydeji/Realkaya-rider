import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';

type Props = {
  onPress?: () => void;
  textClass?: string;
  bodyClass?: string;
  children: React.ReactNode;
};

const Button = ({ children, onPress, textClass, bodyClass }: Props) => {
  return (
    <TouchableOpacity
      className={clsx(
        'bg-primary h-[50px] items-center justify-center rounded-[5px] overflow-hidden',
        bodyClass
      )}
      onPress={onPress}
    >
      <Text className={clsx('font-Mulish-Bold text-white', textClass)}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
