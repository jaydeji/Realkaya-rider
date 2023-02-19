import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { Button, Span } from 'components';
import { ProfileIconEmpty, EmptyInbox } from 'assets/icons';
import { useNavigation } from '@react-navigation/native';

const items = [1];
const Inbox = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5">
        <Span textClass="text-sm text-light-text leading-[15px]">
          Our support team will respond to your request on time via these chat
          or email.
        </Span>
        {!items.length && (
          <View className="items-center flex-1 justify-center">
            <EmptyInbox />
          </View>
        )}
        {items.length > 0 && (
          <View className="mt-[54px] flex-row flex-1 justify-between">
            <View className="flex-row">
              <ProfileIconEmpty />
              <View className="ml-4">
                <Span textClass="font-Mulish-SemiBold text-[14px] text-primary">
                  RealKaya support
                </Span>
                <Span textClass="text-light-text text-sm mt-1">
                  You: order 351
                </Span>
              </View>
            </View>
            <Span textClass="text-light-text text-sm">Nov 11, 11:41 AM</Span>
          </View>
        )}
        <Button onPress={() => navigation.navigate('ChatBox')}>
          Start chat
        </Button>
      </View>
    </SafeAreaView>
  );
};

export { Inbox };
