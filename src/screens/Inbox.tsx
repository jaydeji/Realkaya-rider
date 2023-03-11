import { View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Button, Span } from 'components';
import { ProfileIconEmpty, EmptyInbox } from 'assets/icons';
import { useNavigation } from '@react-navigation/native';
import { getSupportChats } from 'lib/api';
import { queryKeys } from 'lib/query';
import { useQuery } from 'react-query';
import { _date } from 'lib/date';

const Inbox = () => {
  const navigation = useNavigation();

  const { data: supportChats, isLoading } = useQuery({
    queryFn: getSupportChats,
    queryKey: queryKeys.getSupportChats,
  });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5">
        <ScrollView className="flex-1">
          <Span textClass="text-sm text-light-text leading-[15px]">
            Our support team will respond to your request on time via these chat
            or email.
          </Span>
          {!supportChats?.length && !isLoading && (
            <View className="items-center flex-1 justify-center">
              <EmptyInbox />
            </View>
          )}
          {supportChats?.map((e) => (
            <View
              className="mt-[54px] flex-row flex-1 justify-between"
              key={e.supportTicketId}
            >
              <View className="flex-row">
                <ProfileIconEmpty />
                <View className="ml-4">
                  <Span textClass="font-Mulish-SemiBold text-[14px] text-primary">
                    RealKaya support
                  </Span>
                  <Span textClass="text-light-text text-sm mt-1">
                    You: order {e.orderId}
                  </Span>
                </View>
              </View>
              <Span textClass="text-light-text text-sm">
                {_date.formatOne(e.updatedAt)}
              </Span>
            </View>
          ))}
        </ScrollView>
        <Button onPress={() => navigation.navigate('ChatBox')}>
          Start chat
        </Button>
      </View>
    </SafeAreaView>
  );
};

export { Inbox };
