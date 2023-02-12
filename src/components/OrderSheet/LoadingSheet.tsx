import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const LoadingSheet = () => {
  return (
    <View className="h-full items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};
