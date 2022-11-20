import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Header from '../components/Header';
import { Input } from '../components/Input';
import Button from '../components/Button';
import { constants } from '../lib/constants';
import { useStore } from '../store';

type Props = {};

export const Login = (props: Props) => {
  const setUser = useStore((store) => store.setUser);
  const [state, setState] = useState({
    email: 'jamesadedejifirst@gmail.com',
    // password: 'jide1234',
    password: '',
    role: constants.ROLE,
  });

  const handleLogin = async () => {
    if (!state.email || !state.password)
      alert('please enter email and password');
    try {
      const user = await axios.post('/auth/login', state);
      setUser(user.data.data, true);
    } catch (error) {}
  };
  const handleChangeText = (text: string, name: string) => {
    setState({ ...state, [name]: text });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5">
        <Header title="RealKaya" />
        <Text className="text-primary font-Mulish-Bold text-lg mt-12">
          Login
        </Text>
        <Text className="mb-10 text-xs text-light-text">
          Please provide your login details fo easy and quick access to the app
        </Text>
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
        <Text className="mt-3 text-main-blue">Forgot password?</Text>
        <View className="mt-[70px]">
          <Button onPress={handleLogin}>Confirm</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
