import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { ArrowRightIcon } from '../../assets/icons/ArrowRight';
import { BatteryIcon } from '../../assets/icons/Battery';
import { DoubleRightIcon } from '../../assets/icons/DoubleRight';
import { StarIcon } from '../../assets/icons/Star';
import { Stars } from '../Stars';
import SwipeButton from '../Swipe/SwipeButton';

export const OfflineSheet = () => {
  return (
    <View className="flex-1">
      <View className="flex-row bg-main-blue py-4 justify-center items-center">
        <View className="flex-row flex-1 justify-start">
          <DoubleRightIcon className="ml-5" />
        </View>
        <Text className="text-white text-base font-bold">Go online</Text>
        <View className="flex-1 flex-row justify-end" />
      </View>
      <View>
        <SwipeButton
          thumbIconComponent={() => <DoubleRightIcon />}
          thumbIconBackgroundColor="transparent"
          title="Go online"
          titleStyles={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        />
      </View>
      <View className="p-5">
        <TouchableOpacity>
          <View className="flex-row items-center justify-between py-4 pl-[10px] pr-[22px] shadow-1 bg-white">
            <BatteryIcon />
            <View>
              <Text className="text-sm font-semibold text-primary">
                You have 1 order left
              </Text>
              <Text className="text-light-text text-xs">
                Complete the order before taking order
              </Text>
            </View>
            <ArrowRightIcon />
          </View>
        </TouchableOpacity>
        <View className="mt-5 flex-row justify-between items-center pr-[22px]">
          <View>
            <Text className="text-xs text-light-text">TODAY'S EARNINGS</Text>
            <View className="flex-row items-center justify-between pb-[14px] border-b border-b-alt-3 mt-3">
              <Text className="text-primary font-semibold text-xl">₦0.00</Text>
            </View>
          </View>
          <ArrowRightIcon />
        </View>
        <View className="mt-5 flex-row justify-between items-center pr-[22px]">
          <View>
            <Text className="text-xs text-light-text">CURRENT RATING</Text>
            <View className="flex-row items-center justify-between pb-[14px] border-b border-b-alt-3 mt-3">
              <Stars value={4} />
              <Text className="text-primary font-semibold text-xl ml-2">
                5.0
              </Text>
            </View>
          </View>
          <ArrowRightIcon />
        </View>
      </View>
    </View>
  );
};
