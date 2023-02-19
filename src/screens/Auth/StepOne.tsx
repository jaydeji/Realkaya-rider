import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, DateInput, Button } from 'components';
import { Span } from 'components/Span';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useFormStore } from 'store/formStore';

export const StepOne = () => {
  const height = useHeaderHeight();
  const navigation = useNavigation();
  const registerForm = useFormStore((store) => store.registerForm);
  const setRegisterForm = useFormStore((store) => store.setRegisterForm);

  const disabled =
    !registerForm.firstName ||
    !registerForm.lastName ||
    !registerForm.email ||
    !registerForm.phone;

  const handleNext = () => {
    // if (disabled) return snack('Please fill all required fields');
    navigation.navigate('StepTwo');
  };

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
                value={registerForm.firstName}
                onChange={(text) => setRegisterForm('firstName', text)}
              />
            </View>
            <View className="w-full mt-4">
              <Input
                label="Last name"
                placeholder="e.g, Doe"
                value={registerForm.lastName}
                onChange={(text) => setRegisterForm('lastName', text)}
              />
            </View>
            <View className="w-full mt-4">
              <DateInput
                label="Date of birth"
                value={registerForm.dateOfBirth}
                onChange={(text) => setRegisterForm('dateOfBirth', text)}
              />
            </View>
            <View className="w-full mt-4">
              <Input
                label="Email Address"
                placeholder="e.g, johnDoe@gmail.com"
                keyboardType="email-address"
                value={registerForm.email}
                onChange={(text) => setRegisterForm('email', text)}
              />
            </View>
            <View className="w-full mt-4">
              <Input
                label="Password"
                placeholder=""
                secureTextEntry
                value={registerForm.password}
                onChange={(text) => setRegisterForm('password', text)}
              />
            </View>
            <View className="w-full mt-4">
              <Input
                label="Mobile number"
                placeholder="e.g, +2349069469010"
                keyboardType="phone-pad"
                value={registerForm.phone}
                onChange={(text) => setRegisterForm('phone', text)}
              />
            </View>
            <View className="mt-[72px]">
              <Button onPress={handleNext} disabled={disabled}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
