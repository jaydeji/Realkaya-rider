import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ArrowDownIcon } from '../assets/icons/ArrowDown';
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';

type DateSelectProps = Omit<
  ReactNativeModalDateTimePickerProps,
  'onConfirm' | 'onCancel' | 'date'
> & { date: Date };

export const DateSelect = ({ date, ...props }: DateSelectProps) => {
  const [show, setShow] = useState(false);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <View>
      <TouchableOpacity
        className="p-2 py-2 flex-row items-center border border-[#C9CCD3] rounded-[5px]"
        onPress={() => setShow(true)}
      >
        <Text className="text-[8px] font-semibold text-light-text mr-2">
          {`${day}-${month}-${year}`}
        </Text>
        <ArrowDownIcon />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        date={date}
        onConfirm={() => setShow(false)}
        onCancel={() => setShow(false)}
        {...props}
      />
    </View>
  );
};
