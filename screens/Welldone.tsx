import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ProfileIcon } from '../assets/icons/Profile';
import Button from '../components/Button';
import {
  OrderLine,
  OrderLineRightCall,
  OrderLineTopProfile,
} from '../components/OrderLine';

type WelldoneProps = {
  finished?: boolean;
};

export const Welldone = ({ finished }: WelldoneProps) => {
  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="p-5 flex-1">
        <Text className="text-center text-alt-6 font-Mulish-ExtraBold text-2xl">
          Welldone!
        </Text>
        <Text className="text-center mt-3 text-light-text">
          Thanks for the delivery. You,ve earned some cash for this
          delivery.Summary of delivery is detailed below. Would you like to
          continue?
        </Text>
        <View className="rounded-[5px] bg-primary mt-14 p-5">
          <View className="flex-row justify-between">
            <Text className="text-alt-4">Total</Text>
            <Text className="text-alt-4">₦300</Text>
          </View>
          <View className="flex-row justify-between border-b-alt-7 border-b py-3">
            <Text className="text-alt-4">Product type</Text>
            <Text className="text-alt-4">General</Text>
          </View>
          <View className="flex-row justify-between border-b-alt-7 border-b py-3">
            <Text className="text-alt-4">Your reward</Text>
            <Text className="text-alt-4">General</Text>
          </View>
          <View className="flex-row justify-between py-3">
            <Text className="text-alt-4">Payment method</Text>
            <Text className="text-alt-4">Pay on delivery</Text>
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
