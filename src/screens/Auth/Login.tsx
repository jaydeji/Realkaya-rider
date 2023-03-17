import axios from 'axios';
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { Input } from 'components';
import { Button } from 'components';
import { constants } from 'lib/constants';
import { useAppStore } from 'store';
import { Span } from 'components/Span';
import { useNavigation } from '@react-navigation/native';
import { snack } from 'lib/snack';
import { _fetch } from 'lib/api';

export const Login = () => {
  const navigation = useNavigation();
  const setUser = useAppStore((store) => store.setUser);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
    role: constants.ROLE,
  });

  const handleLogin = async () => {
    if (!state.email || !state.password)
      return snack('please enter email and password');
    setLoading(true);
    try {
      // const user = await _fetch.post(
      //   'https://realkaya-be-development.up.railway.app/auth/login',
      //   state,
      //   {
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );
      // setUser(user.data.data, true);

      async function api_content() {
        const response = await fetch(
          'https://realkaya-be-development.up.railway.app/auth/login',
          {}
        );
        const json = await response.json();
        return json;
      }

      api_content().then((data) => {
        setUser(data, true);
      });
    } catch (error) {
      console.log(error);
      snack((error as any)?.message);
      setTimeout(() => {
        snack(JSON.stringify(error as any));
      }, 3000);
      setLoading(false);
    }
  };
  const handleChangeText = (
    text: string | NativeSyntheticEvent<TextInputChangeEventData>,
    name: string
  ) => {
    setState({ ...state, [name]: text });
  };

  return (
    <SafeAreaView className="flex-1 bg-alt-4">
      <View className="flex-1 p-5">
        <Span textClass="text-primary font-Mulish-Bold text-lg mt-12">
          Login
        </Span>
        <Span textClass="text-xs text-light-text mb-10 mr-8">
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
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Span textClass="mt-3 text-main-blue">Forgot password?</Span>
        </TouchableOpacity>
        <View className="mt-[70px]">
          <Button onPress={handleLogin} loading={loading}>
            Confirm
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
