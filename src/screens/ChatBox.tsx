import {
  View,
  SafeAreaView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import React, { useState } from 'react';
import { Button, Span } from 'components';
import { TextInput } from 'react-native-gesture-handler';
//@ts-ignore
import { colors } from 'lib/theme';
import { startSupportChat } from 'lib/api';
import { useMutation, useQueryClient } from 'react-query';
import { useAppStore } from 'store';
import { snack } from 'lib/snack';
import { useNavigation } from '@react-navigation/native';
import { queryKeys } from 'lib/query';

const ChatBox = () => {
  const userData = useAppStore((store) => store.user!);

  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const { mutate: _startSupportChat, isLoading } = useMutation({
    mutationFn: startSupportChat,
    onSuccess: () => {
      navigation.goBack();
      queryClient.invalidateQueries(queryKeys.getSupportChats);
    },
  });

  const [state, setState] = useState({
    orderId: '',
    message: '',
    userId: userData.user.userId,
  });

  const handleChangeText = (
    text: string | number,
    name: keyof typeof state
  ) => {
    setState({ ...state, [name]: text });
  };

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
              onChangeText={(text: string) =>
                handleChangeText(+text, 'orderId')
              }
            />
            <TextInput
              className="border-b border-alt-3 mt-16 py-4 pr-7"
              placeholder="Describe your isssue"
              placeholderTextColor={colors.alt['8']}
              onChangeText={(text) => handleChangeText(text, 'message')}
            />
          </View>
        </View>
        <Button
          loading={isLoading}
          disabled={isLoading}
          onPress={() => {
            if (
              typeof state.orderId !== 'number' ||
              !state.userId ||
              !state.message
            )
              return snack('Please fill all required fields');
            _startSupportChat(state);
          }}
        >
          Send message
        </Button>
      </View>
    </SafeAreaView>
  );
};

export { ChatBox };
