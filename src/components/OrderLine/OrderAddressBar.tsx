import { BeginCircle, EndCircle } from 'assets/icons';
import clsx from 'clsx';
import { Span } from 'components/Span';
import React from 'react';
import { View } from 'react-native';

type Props = {
  alt?: boolean;
  address: string;
  bodyClass?: string;
  textClass?: string;
};

export const OrderAddressBar = ({
  alt,
  address,
  bodyClass,
  textClass,
}: Props) => {
  return (
    <View className={clsx('flex-row items-center', bodyClass)}>
      {alt ? <EndCircle /> : <BeginCircle />}
      <Span textClass={clsx('ml-[6px] text-light-text text-xs', textClass)}>
        {address}
      </Span>
    </View>
  );
};
