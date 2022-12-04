import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from 'components';
import { Span } from 'components/Span';
import { useNoGoBack } from 'hooks';
import React, { useEffect } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { RootStackParamList } from 'types/navigation';

export const SignUpDone = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useNoGoBack(navigation);

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="flex-row justify-center">
        <Image
          source={require('assets/images/letter.png')}
          className="h-56 w-48"
          resizeMode={'contain'}
        />
      </View>

      <View className="flex-1 p-5">
        <Span textClass="text-center text-alt-6 font-Mulish-ExtraBold text-2xl">
          Welldone!
        </Span>
        <Span textClass="text-center mt-3 text-light-text px-[10]">
          You are warmly welcome to the team. Your login details will be
          forwarded to your mail once your information is verified
        </Span>

        <View className="mt-[60px]">
          <Button onPress={() => navigation.push('Login')}>Go to login</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
