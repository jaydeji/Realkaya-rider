import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '../components/Button';
import Header from '../components/Header';
import { CheckRound } from '../components/CheckRound';

const options = [
  {
    id: 'OFF',
    name: 'Pickup location was offline',
  },
  {
    id: 'INF',
    name: 'Information provided was wrong',
  },
  {
    id: 'RUD',
    name: 'Pickup customer was rude',
  },
  {
    id: 'MECH',
    name: 'I have mechanical issues',
  },
];

export const CancelOrder = () => {
  const [selected, setSelected] = useState<string>();

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="flex-1 p-5">
        <Header title="Cancel the order" onPress={() => {}} />
        <View className="rounded-[5px] bg-white px-2 py-5 mt-[30px]">
          <View className="flex-row items-center">
            <Text className="text-base font-Mulish-Bold ml-1">
              Mark order is an important aspects of the app, all orders must be
              marked to validate a safe delivery
            </Text>
          </View>
          <View className="text-light-text">
            <Text className="text-xs mt-[15px]">
              1. You can only cancel based on difference in delivery details
            </Text>
            <Text className="text-xs mt-[6px]">
              2. Your account will be suspended for one day if you cancel 5
              orders in a day
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-base font-Mulish-Bold mt-[17px]">
            Why do you want to cancel this order?
          </Text>

          <View className="mt-[30px]">
            {options.map((option) => (
              <TouchableWithoutFeedback
                key={option.id}
                onPress={() => setSelected(option.id)}
              >
                <View className="text-light-text mb-5 flex-row items-center justify-between">
                  <Text className="flex">{option.name}</Text>
                  <CheckRound checked={selected === option.id} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View className="mt-12">
            <Button onPress={() => {}}>Confirm</Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
