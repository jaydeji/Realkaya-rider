import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, DateInput, Button, Select } from 'components';
import { Span } from 'components/Span';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

export const StepFour = () => {
  const height = useHeaderHeight();
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-alt-4 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={height}
      >
        <ScrollView className="flex-1" keyboardShouldPersistTaps="always">
          <View className="flex-1 p-5">
            <Span textClass="text-primary font-Mulish-Bold text-lg mt-12">
              Payment Details
            </Span>
            <Span textClass="mb-10">
              Please provide us with your bank details for quick payment
            </Span>
            <View className="w-full">
              <Input
                label="Bank holder name"
                placeholder="e.g, John Doe"
                // value={state.email}
                // onChange={(text) => handleChangeText(text, 'email')}
              />
            </View>
            <View className="w-full mt-4">
              <Input
                label="Account number"
                placeholder="e.g, 0561416996"
                // value={state.email}
                // onChange={(text) => handleChangeText(text, 'email')}
              />
            </View>

            <View className="w-full mt-4">
              <Select
                // value={value}
                items={[]}
                // setItems={setItems}
                label="Bank name"
                placeholder="e.g, GT bank"
                // onChange={(text) => handleChangeText(text, 'email')}
              />
            </View>
            <View className="mt-[72px]">
              <Button onPress={() => navigation.navigate('SignUpDone')}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
