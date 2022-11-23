import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowRightIcon } from 'assets/icons/ArrowRight';
import { BatteryIcon } from 'assets/icons/Battery';
import { DoubleRightIcon } from 'assets/icons/DoubleRight';
import { Span } from 'components/Span';
import { Stars } from '../Stars';
import SwipeButton from '../Swipe/SwipeButton';

export const OfflineSheet = () => {
  return (
    <View className="flex-1">
      <SwipeButton
        thumbIconComponent={() => <DoubleRightIcon />}
        thumbIconBackgroundColor="transparent"
        title="Go online"
        //add font family
        titleStyles={{
          fontSize: 16,
        }}
        shouldResetAfterSuccess
      />
      <View className="p-5">
        <TouchableOpacity>
          <View className="flex-row items-center justify-between py-4 pl-[10px] pr-[22px] shadow-1 bg-white">
            <BatteryIcon />
            <View>
              <Span textClass="text-sm font-Mulish-SemiBold text-primary">
                You have 1 order left
              </Span>
              <Span textClass="text-light-text text-xs">
                Complete the order before taking order
              </Span>
            </View>
            <ArrowRightIcon />
          </View>
        </TouchableOpacity>
        <View className="mt-5 flex-row justify-between items-center pr-[22px]">
          <View>
            <Span textClass="text-xs text-light-text">TODAY'S EARNINGS</Span>
            <View className="flex-row items-center justify-between pb-[14px] border-b border-b-alt-3 mt-3">
              <Span textClass="text-primary font-Mulish-SemiBold text-xl">
                ₦0.00
              </Span>
            </View>
          </View>
          <ArrowRightIcon />
        </View>
        <View className="mt-5 flex-row justify-between items-center pr-[22px]">
          <View>
            <Span textClass="text-xs text-light-text">CURRENT RATING</Span>
            <View className="flex-row items-center justify-between pb-[14px] border-b border-b-alt-3 mt-3">
              <Stars value={4} />
              <Span textClass="text-primary font-Mulish-SemiBold text-xl ml-2">
                5.0
              </Span>
            </View>
          </View>
          <ArrowRightIcon />
        </View>
      </View>
    </View>
  );
};
