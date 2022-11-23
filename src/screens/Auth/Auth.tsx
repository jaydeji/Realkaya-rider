import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import Button from 'components/Button';
import { Span } from 'components/Span';

export const Auth = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-alt-4">
      <View className="flex-1 justify-between">
        <View className="w-full">
          <Image
            source={require('../../assets/gifs/auth.gif')}
            className="w-full h-[300px]"
            resizeMode={'cover'}
          />
        </View>
        <View className="p-7">
          <Span textClass="text-primary font-Mulish-ExtraBold text-2xl text-center">
            Earn Quick Money
          </Span>
          <Span textClass="text-center text-sm text-primary font-Mulish-SemiBold mt-3">
            Earn money with us regularly as you take your time to deliver our
            products.
          </Span>
        </View>
        <View className="p-7 flex-row gap-x-7">
          <View className="flex-1">
            <Button
              bodyClass="bg-transparent border border-primary"
              textClass="text-primary"
              onPress={() => navigation.navigate('StepOne')}
            >
              Register
            </Button>
          </View>
          <View className="flex-1">
            <Button onPress={() => navigation.navigate('Login')}>Login</Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
