import { Button } from 'components/Form';
import {
  OrderAddressBar,
  OrderKilometer,
  OrderLineRightCall,
  OrderLineTopProfile,
} from 'components/OrderLine';
import { Span } from 'components/Span';
import { getPaymentMethod } from 'lib/apiUtils';
import { getOrderAddress, getOrderName, getOrderPhone } from 'lib/order';
import React from 'react';
import { View } from 'react-native';
import { Order } from 'types/app';
import { ShortOrderSummary } from './ShortOrderSummary';

type RequiredProps = {
  onRightPress: () => void;
  rightText: string;
  isLoading?: boolean;
  bottomType: 'package' | 'fare';
  order: Order;
  topText: string;
};

type HasLeftProps = {
  onLeftPress?: never;
  leftText?: never;
  hideLeft: true;
};
type HasNotLeftProps = {
  onLeftPress: () => void;
  leftText: string;
  hideLeft?: false | never;
};

type Props = RequiredProps & (HasLeftProps | HasNotLeftProps);

export const OrderSheetTemplate = ({
  isLoading,
  onLeftPress,
  onRightPress,
  leftText,
  rightText,
  topText,
  hideLeft,
  bottomType,
  order,
}: Props) => {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-6">
        <Span textClass="text-xs font-Mulish-SemiBold">{topText}</Span>
        <OrderKilometer distance={order.distance} />
      </View>
      <View className="flex-row items-center justify-between">
        <OrderLineTopProfile name={getOrderName(order)} />
        <OrderLineRightCall phone={getOrderPhone(order)!} />
      </View>
      <OrderAddressBar address={getOrderAddress(order)} />
      <ShortOrderSummary bottomType={bottomType} order={order} />
      <View className="w-full mt-10 flex-row gap-x-1">
        {!hideLeft && (
          <View className="flex-1">
            <Button
              bodyClass="bg-[#E5E5E5] h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
              textClass="font-Mulish-Bold text-primary"
              onPress={onLeftPress}
            >
              {leftText}
            </Button>
          </View>
        )}
        <View className="flex-1">
          <Button
            alt
            textClass="font-Mulish-Bold text-white"
            bodyClass="bg-primary h-[50px] items-center justify-center rounded-[5px] overflow-hidden"
            loading={isLoading}
            onPress={onRightPress}
          >
            {rightText}
          </Button>
        </View>
      </View>
    </View>
  );
};
