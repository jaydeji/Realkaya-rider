import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

type Props = {};

export const Login = (props: Props) => {
  const { setIsAuth } = useApp();
  useEffect(() => {
    console.log('login');
  }, []);
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="bg-primary text-black">
        <Button title="Login" onPress={() => setIsAuth(true)} />
      </View>
    </SafeAreaView>
  );
};
