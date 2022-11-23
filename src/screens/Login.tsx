import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Input } from '../components/Input';
import Button from '../components/Button';
import { constants } from '../lib/constants';
import { useStore } from '../store';
import { Span } from '../components/Span';

export const Login = () => {
  const setUser = useStore((store) => store.setUser);
  const [state, setState] = useState({
    email: 'jamesadedejifirst@gmail.com',
    // password: 'jide1234',
    password: '',
    role: constants.ROLE,
  });

  const handleLogin = async () => {
    // return navigation.navigate('StepOne');
    if (!state.email || !state.password)
      return alert('please enter email and password');
    try {
      const user = await axios.post('/auth/login', state);
      setUser(user.data.data, true);
    } catch (error) {}
  };
  const handleChangeText = (text: string, name: string) => {
    setState({ ...state, [name]: text });
  };

  return (
    <SafeAreaView className="flex-1 bg-alt-4">
      <View className="flex-1 p-5">
        <Span textClass="text-primary font-Mulish-Bold text-lg mt-12">
          Login
        </Span>
        <Span textClass="text-xs text-light-text mb-10">
          Please provide your login details fo easy and quick access to the app
        </Span>
        <View className="w-full">
          <Input
            label="Email address"
            placeholder="e.g, Ulimhukaakem@gmail.com"
            value={state.email}
            onChange={(text) => handleChangeText(text, 'email')}
          />
        </View>
        <View className="w-full mt-4">
          <Input
            placeholder="e.g, 223455"
            label="Password"
            value={state.password}
            onChange={(text) => handleChangeText(text, 'password')}
          />
        </View>
        <Span textClass="mt-3 text-main-blue">Forgot password?</Span>
        <View className="mt-[70px]">
          <Button onPress={handleLogin}>Confirm</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
