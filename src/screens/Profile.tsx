import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Span } from 'components';
import clsx from 'clsx';
import { useAppStore } from 'store';
import { ProfileIconEmpty } from 'assets/icons';
//@ts-ignore
import { colors } from 'lib/theme';
import { useMutation, useQuery } from 'react-query';
import { getUserDetails, updateUser } from 'lib/api';
import { queryKeys } from 'lib/query';
import { snack } from 'lib/snack';

const initialAccount = {
  accountNumber: '',
  accountName: '',
  bankName: '',
};

const Profile = () => {
  const userData = useAppStore((store) => store.user!);
  const updateStoreUser = useAppStore((store) => store.updateUser);

  const { isLoading } = useQuery({
    queryFn: () => getUserDetails(),
    queryKey: queryKeys.getUserDetails,
    onSuccess: (data) => {
      const _userData = { ...userData };
      _userData.user.account = data.account;
      updateStoreUser(_userData);
    },
  });

  const { mutate: updateApiUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      const _userData = { ...userData };
      _userData.user.account = data.account;
      _userData.user.firstName = data.firstName;
      _userData.user.lastName = data.lastName;
      updateStoreUser(_userData);
      snack('User Updated');
    },
  });

  const [selected, setSelected] = useState('P');

  const getState = useCallback(() => {
    return {
      firstName: userData?.user.firstName || '',
      lastName: userData?.user.lastName || '',
      account: userData?.user.account
        ? {
            accountNumber: userData?.user.account.accountNumber,
            accountName: userData?.user.account.accountName,
            bankName: userData?.user.account.bankName,
          }
        : undefined,
    };
  }, [userData]);

  const [state, setState] = useState(getState());

  useEffect(() => {
    setState(getState());
  }, [userData]);

  const handleChangeText = (
    text: string | NativeSyntheticEvent<TextInputChangeEventData>,
    name: keyof typeof state
  ) => {
    setState({ ...state, [name]: text });
  };

  const handleChangeAccount = (
    text: string | NativeSyntheticEvent<TextInputChangeEventData>,
    name: keyof typeof initialAccount
  ) => {
    const newState = { ...state };
    if (!newState.account) newState.account = { ...initialAccount };
    newState.account[name] = text as string;
    setState(newState);
  };

  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <SafeAreaView className="flex-1 bg-alt-4 text-primary">
      <View className="flex-1 p-5 ">
        <ScrollView>
          <View className="flex-row mt-9 px-4 py-3 bg-white rounded-[5px] border border-alt-8">
            <View className="flex-1">
              <Button
                bodyClass={clsx(
                  selected !== 'P' ? 'bg-light-grey' : 'bg-navy-blue'
                )}
                textClass={clsx(selected !== 'P' && 'text-primary')}
                onPress={() => setSelected('P')}
              >
                Personal
              </Button>
            </View>
            <View className="flex-1 ml-2">
              <Button
                bodyClass={clsx(
                  selected !== 'O' ? 'bg-light-grey' : 'bg-navy-blue'
                )}
                textClass={clsx(selected !== 'O' && 'text-primary')}
                onPress={() => setSelected('O')}
              >
                Others
              </Button>
            </View>
          </View>

          <View className="mt-[10px]">
            {selected === 'P' && (
              <>
                <View className="items-center">
                  <View className="mt-8 h-[60px] w-[60px]">
                    {!userData?.user.profilePhotoUrl ? (
                      <ProfileIconEmpty className="h-full w-full" />
                    ) : (
                      <Image
                        source={{
                          uri: userData?.user.profilePhotoUrl,
                        }}
                        className="w-full h-full rounded-full border border-white"
                      />
                    )}
                  </View>
                </View>
                <View>
                  <Span textClass="leading-[32px] text-xs text-primary font-Mulish-SemiBold h-5">
                    Full name
                  </Span>
                  <View className="flex-row gap-4">
                    <TextInput
                      placeholder={'First name'}
                      value={state.firstName}
                      className="px-3 h-[45px] border border-alt-8 rounded-[5px] flex-1"
                      onChangeText={(text) =>
                        handleChangeText(text, 'firstName')
                      }
                      placeholderTextColor={colors.alt['8']}
                      autoCapitalize={'none'}
                    />
                    <TextInput
                      placeholder={'Last name'}
                      value={state.lastName}
                      className="px-3 h-[45px] border border-alt-8 rounded-[5px] flex-1"
                      onChangeText={(text) =>
                        handleChangeText(text, 'lastName')
                      }
                      placeholderTextColor={colors.alt['8']}
                      autoCapitalize={'none'}
                    />
                  </View>
                </View>
                <View className="w-full mt-7">
                  <Input
                    label="Email address"
                    placeholder="e.g, Ulimhukaakem@gmail.com"
                    value={userData?.user.email}
                    disabled
                    onChange={() => {}}
                  />
                </View>
                <View className="w-full mt-7">
                  <Input
                    label="Mobile number"
                    placeholder="e.g, +2349069469010"
                    keyboardType="phone-pad"
                    value={userData?.user.phone}
                    disabled
                    onChange={() => {}}
                  />
                </View>
              </>
            )}
            {selected === 'O' && (
              <>
                <Span textClass="text-alt-2 text-xs mt-3">PAYMENTS</Span>
                <View className="w-full mt-7">
                  <Input
                    label="Bank holder name"
                    placeholder="e.g, Ulimhukaakem@gmail.com"
                    value={state.account?.accountName || ''}
                    onChange={(text) =>
                      handleChangeAccount(text, 'accountName')
                    }
                  />
                </View>
                <View className="w-full mt-7">
                  <Input
                    label="Account number"
                    placeholder="e.g, 0561416996"
                    value={state.account?.accountNumber || ''}
                    onChange={(text) =>
                      handleChangeAccount(text, 'accountNumber')
                    }
                  />
                </View>
                <View className="w-full mt-7">
                  <Input
                    label="Bank name"
                    placeholder="e.g, GT bank"
                    value={state.account?.bankName || ''}
                    onChange={(text) => handleChangeAccount(text, 'bankName')}
                  />
                </View>
              </>
            )}
            <View className="mt-8">
              <Button onPress={() => updateApiUser(state)} loading={isUpdating}>
                Update
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
