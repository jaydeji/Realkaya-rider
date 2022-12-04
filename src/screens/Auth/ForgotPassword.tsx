import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Input } from 'components';
import { Button } from 'components';
import { Span } from 'components/Span';

export const ForgotPassword = () => {
  const [state, setState] = useState({
    email: '',
  });

  const handleChangeText = (text: string, name: string) => {
    setState({ ...state, [name]: text });
  };

  return (
    <SafeAreaView className="flex-1 bg-alt-4">
      <View className="flex-1 p-5">
        <Span textClass="text-primary font-Mulish-Bold text-lg mt-12">
          Forgot Password
        </Span>
        <Span textClass="text-xs text-light-text mb-10 mr-8">
          We will send a link to verify your password
        </Span>
        <View className="w-full">
          <Input
            placeholder="Enter your email"
            value={state.email}
            onChange={(text) => handleChangeText(text, 'email')}
          />
        </View>
        <View className="mt-8">
          <Button onPress={() => {}}>Confirm</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
