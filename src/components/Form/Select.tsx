import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from 'react-native-dropdown-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Span } from 'components/Span';
import { colors } from 'lib/theme';

type Props = Omit<DropDownPickerProps<ValueType>, 'open' | 'setOpen'> & {
  label: string;
};

export const Select = ({ label, ...props }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
      <View>
        <Span textClass="leading-[32px] text-xs text-primary font-Mulish-SemiBold h-5">
          {label}
        </Span>
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          listMode="SCROLLVIEW"
          // containerStyle={{}}
          style={{
            borderColor: colors.alt['8'],
            backgroundColor: 'transparent',
            borderRadius: 5,
            maxHeight: 45,
            // paddingHorizontal: 5,
          }}
          placeholderStyle={{
            color: colors.alt['8'],
          }}
          {...props}
          //   zIndex={1000}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
