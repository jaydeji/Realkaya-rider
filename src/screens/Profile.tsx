import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Input, Span } from 'components';
import clsx from 'clsx';
import { useAppStore } from 'store';
import EmptyAvatar from 'assets/icons/EmptyAvatar';
//@ts-ignore
import { colors } from 'lib/theme';

const Profile = () => {
  const userData = useAppStore((store) => store.user);

  const [selected, setSelected] = useState('P');
  const [state, setState] = useState({
    firstName: userData?.user.firstName || '',
    lastName: userData?.user.lastName || '',
    email: userData?.user.email || '',
    phone: userData?.user.phone || '',
  });

  const handleChangeText = (
    text: string | NativeSyntheticEvent<TextInputChangeEventData>,
    name: string
  ) => {
    setState({ ...state, [name]: text });
  };

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
                      <EmptyAvatar className="h-full w-full" />
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
                    value={state.email}
                    editable={false}
                    selectTextOnFocus={false}
                    onChange={(text) => handleChangeText(text, 'email')}
                  />
                </View>
                <View className="w-full mt-7">
                  <Input
                    label="Mobile number"
                    placeholder="e.g, +2349069469010"
                    keyboardType="phone-pad"
                    value={state.phone}
                    editable={false}
                    selectTextOnFocus={false}
                    onChange={(text) => handleChangeText(text, 'phone')}
                  />
                </View>
              </>
            )}
            {selected === 'O' && (
              <>
                <Span textClass="bg-alt-2 text-xs mt-3">PAYMENTS</Span>
                <View className="w-full mt-7">
                  <Input
                    label="Bank holder name"
                    placeholder="e.g, Ulimhukaakem@gmail.com"
                    value={state.accountName}
                    editable={false}
                    selectTextOnFocus={false}
                    onChange={(text) => handleChangeText(text, 'accountName')}
                  />
                </View>
                <View className="w-full mt-7">
                  <Input
                    label="Account number"
                    placeholder="e.g, 0561416996"
                    value={state.accountNumber}
                    onChange={(text) => handleChangeText(text, 'accountNumber')}
                  />
                </View>
                <View className="w-full mt-7">
                  <Input
                    label="Bank name"
                    placeholder="e.g, GT bank"
                    value={state.bankName}
                    onChange={(text) => handleChangeText(text, 'bankName')}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
