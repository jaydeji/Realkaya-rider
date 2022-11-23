import clsx from 'clsx';
import React from 'react';
import { Text } from 'react-native';

export const Span = ({
  textClass,
  children,
}: {
  textClass?: string;
  children: React.ReactNode;
}) => {
  return <Text className={clsx('font-Mulish', textClass)}>{children}</Text>;
};
