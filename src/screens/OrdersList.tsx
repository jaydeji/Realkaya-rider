import { View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import clsx from 'clsx';
import { ScrollView } from 'react-native-gesture-handler';
import {
  OrderLine,
  OrderLineRight,
  OrderLineTop,
} from '../components/OrderLine';
import { DateSelect } from '../components/DateSelect';
import { useNavigation } from '@react-navigation/native';

export const OrdersList = () => {
  const [selected, setSelected] = useState(1);
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DateSelect date={date} onChange={(date) => setDate(date as Date)} />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="flex-1 p-5 ">
        <View className="flex-row mt-9 px-4 py-3 bg-white rounded-[5px] border border-alt-8">
          <View className="flex-1">
            <Button
              bodyClass={clsx(selected !== 0 && 'bg-white')}
              textClass={clsx(selected !== 0 && 'text-light-text')}
              onPress={() => setSelected(0)}
            >
              Confirmed
            </Button>
          </View>
          <View className="flex-1">
            <Button
              bodyClass={clsx(selected !== 1 && 'bg-white')}
              textClass={clsx(selected !== 1 && 'text-light-text')}
              onPress={() => setSelected(1)}
            >
              Pickup
            </Button>
          </View>
          <View className="flex-1">
            <Button
              bodyClass={clsx(selected !== 2 && 'bg-white')}
              textClass={clsx(selected !== 2 && 'text-light-text')}
              onPress={() => setSelected(2)}
            >
              Delivery
            </Button>
          </View>
        </View>
        <ScrollView>
          <View className="mt-[14px]">
            <OrderLine
              order={{ senderAddress: 'a', recepientAddress: 'b' }}
              top={
                <OrderLineTop
                  order={{ senderAddress: 'a', recepientAddress: 'b' }}
                />
              }
              right={<OrderLineRight />}
            />
            <OrderLine
              order={{ senderAddress: 'a', recepientAddress: 'b' }}
              top={
                <OrderLineTop
                  order={{ senderAddress: 'a', recepientAddress: 'b' }}
                />
              }
              right={<OrderLineRight />}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
