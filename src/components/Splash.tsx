import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { SplashIcon } from 'assets/icons/SplashIcon';
import { Span } from 'components/Span';

type Props = {
  isAppReady: boolean;
  setAnimationComplete: (state: boolean) => void;
};

const IMAGE_WIDTH = 130;

export const Splash = ({ isAppReady, setAnimationComplete }: Props) => {
  const translate = useRef(new Animated.Value(-IMAGE_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translate, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(translate, {
        toValue: Dimensions.get('screen').width,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  return (
    <View className="bg-alt-3 absolute inset-0 items-center justify-center ">
      <View className="flex-row flex-1 items-end ">
        <Animated.View
          className="items-center"
          style={{
            transform: [{ translateX: translate }],
          }}
        >
          <SplashIcon />
        </Animated.View>
      </View>
      <Span textClass="text-4xl ffont-Mulish-ExtraBold">
        <Span>RealKaya</Span>
        <Span textClass=" text-main-blue"> Rider</Span>
      </Span>
      <View className="flex-row flex-1" />
    </View>
  );
};
