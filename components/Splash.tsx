import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Dimensions,
} from 'react-native';

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
    <View className="bg-primary absolute inset-0 items-center justify-center">
      <Animated.View
        className="relative flex items-center"
        style={{
          transform: [{ translateX: translate }],
        }}
      >
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={{ width: IMAGE_WIDTH, height: IMAGE_WIDTH }}
        />
        <Text className="text-2xl font-bold">CariGo</Text>
      </Animated.View>
    </View>
  );
};
