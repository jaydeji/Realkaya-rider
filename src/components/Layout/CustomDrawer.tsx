import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import EmptyAvatar from 'assets/icons/EmptyAvatar';
import OrdersIcon from 'assets/icons/OrdersIcon';
import { Span } from 'components/Span';
import { View, Image } from 'react-native';
import { useAppStore } from 'store';
//@ts-ignore
import { colors } from 'lib/theme';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const userData = useAppStore((store) => store.user);

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#02092A' }}>
      <View className="flex-row ml-4">
        {!userData?.user.profilePhotoUrl ? (
          <EmptyAvatar />
        ) : (
          <Image
            source={{
              uri: 'https://res.cloudinary.com/zst/image/upload/f_auto/q_auto/v1671026546/users/avatars/cafc6771-e01e-42aa-8b3a-8fa51ce70247.jpg',
            }}
            className="w-[45px] h-[45px] rounded-full border border-white"
          />
        )}
        <View className="ml-4">
          <Span textClass="font-Mulish-Bold text-alt-4 text-lg">
            {userData?.user.firstName}
          </Span>
          <Span textClass="text-alt-4 text-xs ">View profile</Span>
        </View>
      </View>
      <View className="mt-20">
        <DrawerItem
          label="Orders"
          onPress={() => props.navigation.navigate('OrdersList')}
          labelStyle={{ color: colors.alt['4'] }}
          icon={() => <OrdersIcon className="-mr-4" />}
        />
        <DrawerItem
          label="Support"
          onPress={() => props.navigation.navigate('Details')}
          labelStyle={{ color: 'white' }}
        />
        <DrawerItem
          label="About Us"
          onPress={() => props.navigation.navigate('Details')}
          labelStyle={{ color: 'white' }}
        />
        <DrawerItem
          label="Go Offline"
          onPress={() => props.navigation.navigate('Details')}
          labelStyle={{ color: 'white' }}
        />
      </View>
    </DrawerContentScrollView>
  );
};
