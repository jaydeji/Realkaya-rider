import React from 'react';
import { Text } from 'react-native';

export const Span = ({ textClass }: { textClass?: string }) => {
  return <Text className={textClass}></Text>;
};
