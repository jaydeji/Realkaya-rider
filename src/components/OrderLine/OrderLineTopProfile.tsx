import { View } from 'react-native';
import { ProfileIcon } from 'assets/icons';
import { Span } from 'components/Span';

type Props = { name: string; bodyClass?: string };

export const OrderLineTopProfile = ({ name, bodyClass }: Props) => {
  return (
    <View className={bodyClass}>
      <View className="flex-row items-center">
        <ProfileIcon />
        <Span textClass="text-sm font-Mulish-Bold text-primary ml-2">
          {name}
        </Span>
      </View>
      <View className="mt-[10px]"></View>
    </View>
  );
};
