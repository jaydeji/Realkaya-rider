import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { Button, Span } from 'components';
import { ArrowRightIcon, SearchIcon } from 'assets/icons';
import { TextInput } from 'react-native-gesture-handler';
//@ts-ignore
import { colors } from 'lib/theme';
import { useNavigation } from '@react-navigation/native';
import { ArticleLine } from 'components/ArticleLine';

const Support = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5">
        <Span textClass="text-sm text-light-text leading-[15px]">
          Our support team are always available to render support services where
          necessary
        </Span>
        <View className="relative">
          <TextInput
            className="border-b mt-12 py-1 pr-7"
            placeholder="Search for articles"
            placeholderTextColor={colors.alt['8']}
          />
          <SearchIcon className="absolute right-3 bottom-3" />
        </View>
        <View className="items-center p-5 bg-main-blue/10 mt-6 rounded-[5px]">
          <Span textClass="text-primary font-Mulish-Bold text-[14px] mb-11 text-center">
            New conversation
          </Span>
          <Button
            bodyClass="w-40 bg-main-blue"
            onPress={() => navigation.navigate('Inbox')}
          >
            New message
          </Button>
        </View>
        <Span textClass="text-primary font-Mulish-Bold text-base mt-4">
          Popular articles
        </Span>
        <View className="mt-9">
          <ArticleLine text="Using RealKaya" />
          <ArticleLine text="Delivery was offline" />
          <ArticleLine text="Wrong pickup details" />
          <ArticleLine text="Payment issues" />
          <ArticleLine text="Other services" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export { Support };
