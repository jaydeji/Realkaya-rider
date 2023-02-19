import { ArrowRightIcon } from 'assets/icons';
import { View } from 'react-native';
import { Span } from './Span';

export const ArticleLine = ({ text }: { text: string }) => {
  return (
    <View className=" pb-[15px] mb-6 border-b border-alt-3 flex-row justify-between items-center">
      <Span textClass="font-Mulish-SemiBold text-[14px] text-light-text">
        {text}
      </Span>
      <ArrowRightIcon />
    </View>
  );
};
