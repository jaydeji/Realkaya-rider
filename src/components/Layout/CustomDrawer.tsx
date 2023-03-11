import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  CircleExclaim,
  Logout,
  ProfileIconEmpty,
  SupportIcon,
} from 'assets/icons';
import OrdersIcon from 'assets/icons/OrdersIcon';
import { Span } from 'components/Span';
import { View, Image, Pressable } from 'react-native';
import { useAppStore } from 'store';
//@ts-ignore
import { colors } from 'lib/theme';
import { useMutation } from 'react-query';
import { updateUser } from 'lib/api';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const userData = useAppStore((store) => store.user!);
  const logout = useAppStore((store) => store.logout);
  const online = userData?.user.online;

  const updateStoreUser = useAppStore((store) => store.updateUser);
  const { mutate: updateApiUser } = useMutation({
    mutationFn: updateUser,
  });

  const handleGoOffline = () => {
    updateStoreUser({
      ...userData,
      user: { ...userData?.user, online: !online },
    });
    updateApiUser({ online: !online });
    props.navigation.toggleDrawer();
  };

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#02092A' }}>
      <Pressable onPress={() => props.navigation.navigate('Profile')}>
        <View className="flex-row ml-4">
          {!userData?.user.profilePhotoUrl ? (
            <ProfileIconEmpty />
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
      </Pressable>
      <View className="mt-20">
        <DrawerItem
          label="Orders"
          onPress={() => props.navigation.navigate('OrdersList')}
          labelStyle={{ color: colors.alt['4'] }}
          icon={() => <OrdersIcon className="-mr-4" />}
        />
        <DrawerItem
          label="Support"
          onPress={() => props.navigation.navigate('Support')}
          labelStyle={{ color: 'white' }}
          icon={() => <SupportIcon className="-mr-4" />}
        />
        <DrawerItem
          label="About Us"
          onPress={() => props.navigation.navigate('About')}
          labelStyle={{ color: 'white' }}
          icon={() => <SupportIcon className="-mr-4" />}
        />
        <DrawerItem
          label={`Go ${online ? 'Offline' : 'Online'}`}
          onPress={() => handleGoOffline()}
          labelStyle={{ color: 'white' }}
          icon={() => <CircleExclaim className="-mr-4" />}
        />
        <DrawerItem
          label="Logout"
          onPress={logout}
          labelStyle={{ color: 'white' }}
          icon={() => <Logout className="-mr-4 text-white" />}
        />
      </View>
    </DrawerContentScrollView>
  );
};
