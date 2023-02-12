import clsx from 'clsx';
import React from 'react';
import { Text } from 'react-native';

export const Span = ({
  textClass,
  children,
  overrideTextClass,
}: {
  textClass?: string;
  overrideTextClass?: string;
  children: React.ReactNode;
}) => {
  return (
    <Text className={overrideTextClass ?? clsx('font-Mulish', textClass)}>
      {children}
    </Text>
  );
};
