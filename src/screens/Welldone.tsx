import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ProfileIcon } from 'assets/icons';
import {
  Button,
  OrderLine,
  OrderLineRightCall,
  OrderLineTopProfile,
} from 'components';
import { Span } from 'components/Span';

type WelldoneProps = {
  finished?: boolean;
};

export const Welldone = ({ finished }: WelldoneProps) => {
  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="p-5 flex-1">
        <Span textClass="text-center text-alt-6 font-Mulish-ExtraBold text-2xl">
          Welldone!
        </Span>
        <Span textClass="text-center mt-3 text-light-text">
          Thanks for the delivery. You,ve earned some cash for this
          delivery.Summary of delivery is detailed below. Would you like to
          continue?
        </Span>
        <View className="rounded-[5px] bg-primary mt-14 p-5">
          <View className="flex-row justify-between">
            <Span textClass="text-alt-4">Total</Span>
            <Span textClass="text-alt-4">₦300</Span>
          </View>
          <View className="flex-row justify-between border-b-alt-7 border-b py-3">
            <Span textClass="text-alt-4">Product type</Span>
            <Span textClass="text-alt-4">General</Span>
          </View>
          <View className="flex-row justify-between border-b-alt-7 border-b py-3">
            <Span textClass="text-alt-4">Your reward</Span>
            <Span textClass="text-alt-4">General</Span>
          </View>
          <View className="flex-row justify-between py-3">
            <Span textClass="text-alt-4">Payment method</Span>
            <Span textClass="text-alt-4">Pay on delivery</Span>
          </View>
        </View>
        {!finished ? (
          <OrderLine
            top={<OrderLineTopProfile />}
            right={<OrderLineRightCall />}
          />
        ) : (
          <View className="flex-row mt-14 gap-x-5">
            <View className="flex-1">
              <Button bodyClass="bg-alt-3" textClass="text-primary">
                Go offline
              </Button>
            </View>
            <View className="flex-1">
              <Button>Continue</Button>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
