import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import { Span } from 'components/Span';

type Props = {
  onPress?: () => void;
  textClass?: string;
  bodyClass?: string;
  children: React.ReactNode;
};

export const Button = ({ children, onPress, textClass, bodyClass }: Props) => {
  return (
    <TouchableOpacity
      className={clsx(
        'bg-primary h-[45px] items-center justify-center rounded-[5px] overflow-hidden',
        bodyClass
      )}
      onPress={onPress}
    >
      <Span textClass={clsx('font-Mulish-Bold text-white', textClass)}>
        {children}
      </Span>
    </TouchableOpacity>
  );
};
