import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArrowDownIcon } from 'assets/icons';
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import { Span } from 'components/Span';

type DateSelectProps = Omit<
  ReactNativeModalDateTimePickerProps,
  'onCancel' | 'date'
> & { date: Date };

export const DateSelect = ({ date, onConfirm, ...props }: DateSelectProps) => {
  const [show, setShow] = useState(false);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <View>
      <TouchableOpacity
        className="p-2 py-2 flex-row items-center border border-alt-8 rounded-[5px]"
        onPress={() => setShow(true)}
      >
        <Span textClass="text-[8px] font-Mulish-SemiBold text-light-text mr-2">
          {`${day}-${month}-${year}`}
        </Span>
        <ArrowDownIcon />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        date={date}
        onConfirm={(date) => {
          onConfirm(date);
          setShow(false);
        }}
        onCancel={() => setShow(false)}
        {...props}
      />
    </View>
  );
};
