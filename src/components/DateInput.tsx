import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { CalendarIcon } from 'assets/icons/Calendar';
import { Span } from 'components/Span';
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';

type Props = {
  value: Date;
  onChange: ReactNativeModalDateTimePickerProps['onChange'];
  placeholder?: string;
  label: string;
};

export const DateInput = ({
  value,
  onChange,
  placeholder = 'DD/MM/YYYY',
  label,
}: Props) => {
  const [show, setShow] = useState(false);

  const day = value.getDate();
  const month = value.getMonth() + 1;
  const year = value.getFullYear();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShow(true);
      }}
    >
      <View>
        <Span textClass="leading-[32px] text-xs text-primary font-Mulish-SemiBold h-5">
          {label}
        </Span>
        <View className="p-4 border border-alt-8 rounded-[5px] flex-row justify-between items-center">
          {value ? (
            <Text> {`${day}-${month}-${year}`}</Text>
          ) : (
            <Text className="text-alt-8">{placeholder}</Text>
          )}
          <CalendarIcon />
        </View>
        <DateTimePickerModal
          isVisible={show}
          mode="date"
          date={value}
          onConfirm={() => setShow(false)}
          onCancel={() => setShow(false)}
          onChange={onChange}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
