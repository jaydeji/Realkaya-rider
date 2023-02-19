import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { Button, Span } from 'components';
import { TextInput } from 'react-native-gesture-handler';
//@ts-ignore
import { colors } from 'lib/theme';

const ChatBox = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5">
        <Span textClass="text-sm text-light-text leading-[15px]">
          if it’s an issue with an order, please attach the order number for
          clearer responds
        </Span>
        <View className="flex-1">
          <View>
            <TextInput
              className="border-b border-alt-3 mt-12 py-4 pr-7"
              placeholder="Order number"
              placeholderTextColor={colors.alt['8']}
            />
            <TextInput
              className="border-b border-alt-3 mt-16 py-4 pr-7"
              placeholder="Describe your isssue"
              placeholderTextColor={colors.alt['8']}
            />
          </View>
        </View>
        <Button>Send message</Button>
      </View>
    </SafeAreaView>
  );
};

export { ChatBox };
