import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import clsx from 'clsx';
import Button from 'components/Button';
import { CheckRound } from 'components/CheckRound';
import { Span } from 'components/Span';

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
        <View className="rounded-[5px] bg-white px-2 py-5 mt-[30px]">
          <View className="flex-row items-center">
            <Span textClass="text-base font-Mulish-Bold ml-1">
              Mark order is an important aspects of the app, all orders must be
              marked to validate a safe delivery
            </Span>
          </View>
          <View className="text-light-text">
            <Span textClass="text-xs mt-[15px]">
              1. You can only cancel based on difference in delivery details
            </Span>
            <Span textClass="text-xs mt-[6px]">
              2. Your account will be suspended for one day if you cancel 5
              orders in a day
            </Span>
          </View>
        </View>

        <View>
          <Span textClass="text-base font-Mulish-Bold mt-[17px]">
            Why do you want to cancel this order?
          </Span>

          <View className="mt-[30px]">
            {options.map((option) => (
              <TouchableWithoutFeedback
                key={option.id}
                onPress={() => setSelected(option.id)}
              >
                <View className="text-light-text mb-5 flex-row items-center justify-between">
                  <Span textClass="flex">{option.name}</Span>
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
