import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import clsx from 'clsx';
import { CheckRound } from '../components/CheckRound';

const options = [
  {
    id: 'OFF',
    name: 'Delivered directly to customer',
  },
  {
    id: 'INF',
    name: 'Customer directed on doorpost',
  },
  {
    id: 'RUD',
    name: 'Delivered to third party on customer notice',
  },
  {
    id: 'MECH',
    name: 'Customer was offline',
  },
];

export const CompleteOrder = ({ orderId }: { orderId: number }) => {
  const [selected, setSelected] = useState<string>();

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="flex-1 p-5">
        <Header title={`Order ${orderId}`} onPress={() => {}} />
        <View className="text-light-text mt-[30px] text-xs">
          <Text>
            Mark order is an important aspects of the app, all orders must be
            marked to validate a safe delivery
          </Text>
        </View>

        <View>
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
