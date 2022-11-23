import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DateInput } from 'components/DateInput';
import { Input } from 'components/Input';
import { Span } from 'components/Span';
import { useHeaderHeight } from '@react-navigation/elements';
import Button from 'components/Button';
import { useNavigation } from '@react-navigation/native';

export const StepOne = () => {
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
              Personal Information
            </Span>
            <Span textClass="mb-10">
              Please provide us with your personal details to know you better
            </Span>
            <View className="w-full">
              <Input
                label="First name"
                placeholder="e.g, John"
                // value={state.email}
                // onChange={(text) => handleChangeText(text, 'email')}
              />
            </View>
            <View className="w-full mt-4">
              <Input
                label="Last name"
                placeholder="e.g, Doe"
                // value={state.email}
                // onChange={(text) => handleChangeText(text, 'email')}
              />
            </View>
            <View className="w-full mt-4">
              <DateInput
                label="Date of birth"
                value={new Date()}
                onChange={() => {}}
                // value={state.email}
                // onChange={(text) => handleChangeText(text, 'email')}
              />
            </View>
            <View className="w-full mt-4">
              <Input
                label="Email Address"
                placeholder="e.g, johnDoe@gmail.com"
                keyboardType="email-address"
                // value={state.email}
                // onChange={(text) => handleChangeText(text, 'email')}
              />
            </View>
            <View className="w-full mt-4">
              <Input
                label="Mobile number"
                placeholder="e.g, +2349069469010"
                keyboardType="phone-pad"
                // value={state.email}
                // onChange={(text) => handleChangeText(text, 'email')}
              />
            </View>
            <View className="mt-[72px]">
              <Button onPress={() => navigation.navigate('StepTwo')}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
