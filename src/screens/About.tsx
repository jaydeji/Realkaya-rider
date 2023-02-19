import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { Button, Span } from 'components';
import { TextInput } from 'react-native-gesture-handler';
//@ts-ignore
import { colors } from 'lib/theme';
import { ArticleLine } from 'components/ArticleLine';

const About = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5">
        <Span textClass="text-sm text-light-text leading-[15px]">
          know more about RealKaya, spend your time with us
        </Span>
        <View className="mt-[57px]">
          <ArticleLine text="Rate app" />
          <ArticleLine text="RealKaya careers" />
          <ArticleLine text="Legal" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export { About };
