import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Header from '../../components/Header';

export const StepOne = () => {
  return (
    <SafeAreaView className="flex-1 bg-alt-4">
      <View className="flex-1 p-5">
        <Header
          title="RealKaya"
          right={
            <Text className="text-xs text-light-text font-Mulish-Medium">
              Step 1 of 4
            </Text>
          }
        />
        <Text className="text-primary font-Mulish-Bold text-lg mt-12">
          Personal Information
        </Text>
        <Text className="mb-10">
          Please provide us with your personal details to know you better
        </Text>
      </View>
    </SafeAreaView>
  );
};
