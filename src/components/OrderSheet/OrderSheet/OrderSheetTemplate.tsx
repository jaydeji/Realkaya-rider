import { Button } from 'components/Form';
import React from 'react';
import { View } from 'react-native';

type RequiredProps = {
  onRightPress: () => void;
  rightText: string;
  isLoading?: boolean;
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
  hideLeft,
}: Props) => {
  return (
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
  );
};
