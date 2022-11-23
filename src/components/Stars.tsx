import React from 'react';
import { View } from 'react-native';
import { StarIcon } from 'assets/icons/Star';

export const Stars = ({ value: _value }: { value: number }) => {
  const value = Math.floor(_value);
  return (
    <View className="flex-row">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={value > i} />
      ))}
    </View>
  );
};
