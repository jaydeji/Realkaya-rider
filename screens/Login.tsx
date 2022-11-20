import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { constants } from '../lib/constants';
import { useStore } from '../store';

type Props = {};

export const Login = (props: Props) => {
  const setUser = useStore((store) => store.setUser);
  const [state, setState] = useState({
    email: 'jamesadedejifirst@gmail.com',
    password: 'jide1234',
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
      <View className="flex-1 items-center justify-center p-8">
        <View className="w-full">
          <TextInput
            placeholder="email"
            value={state.email}
            className="p-4 border"
            onChangeText={(text) => handleChangeText(text, 'email')}
          />
        </View>
        <View className="w-full mt-4">
          <TextInput
            placeholder="password"
            value={state.password}
            className="p-4 border"
            onChangeText={(text) => handleChangeText(text, 'password')}
          />
        </View>
        <View className="bg-primary text-main-blue mt-4 w-full p-4 rounded-[5px]">
          <TouchableOpacity onPress={handleLogin}>
            <Text className="text-center ">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
