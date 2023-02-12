import React from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import clsx from 'clsx';
import { Span } from 'components/Span';

type Props = {
  onPress?: () => void;
  textClass?: string;
  bodyClass?: string;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  alt?: boolean;
};

export const Button = ({
  children,
  onPress,
  textClass,
  bodyClass,
  disabled,
  loading,
  alt,
}: Props) => {
  const Touchable = (
    !alt ? TouchableOpacity : TouchableHighlight
  ) as React.ElementType;
  return (
    <Touchable
      className={clsx(
        'bg-primary h-[45px] items-center justify-center rounded-[5px] overflow-hidden',
        disabled && 'opacity-60',
        bodyClass
      )}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Span textClass={clsx('font-Mulish-Bold text-white', textClass)}>
          {children}
        </Span>
      )}
    </Touchable>
  );
};
