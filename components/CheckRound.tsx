import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';
import { CheckMarkIcon } from '../assets/icons/CheckMark';

export const CheckRound = ({
  checked,
  multiple,
}: {
  checked: boolean;
  multiple?: boolean;
}) => {
  if (multiple && checked) return <CheckMarkIcon />;
  return (
    <View
      className={clsx(
        'h-4 w-4 rounded-full border border-alt-5',
        checked && 'bg-main-blue'
      )}
    ></View>
  );
};
