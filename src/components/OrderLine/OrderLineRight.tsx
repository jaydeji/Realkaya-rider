import React from 'react';
import { View } from 'react-native';
import { Span } from 'components/Span';
import { Button } from 'components/Form';
import { _date } from 'lib/date';

type Props1 = {
  showTime: true;
  date: string;

  onPress?: never;
  text?: never;
};

type Props2 = {
  onPress?: () => void;
  text: string;

  showTime?: never;
  date?: never;
};

export const OrderLineRight = (props: Props1 | Props2) => {
  const { showTime, onPress, date, text } = props;

  return (
    <View className="self-end">
      {!showTime ? (
        <Button
          bodyClass="bg-white px-5 border border-main-blue h-8"
          textClass="text-main-blue"
          onPress={onPress}
        >
          {text}
        </Button>
      ) : (
        <Span textClass="text-primary font-Mulish-Bold text-xs">
          {_date.formatAmPm(date)}
        </Span>
      )}
    </View>
  );
};
