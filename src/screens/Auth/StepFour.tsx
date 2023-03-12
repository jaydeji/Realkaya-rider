import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button, Select } from 'components';
import { Span } from 'components/Span';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useFormStore } from 'store/formStore';
import axios from 'axios';
import { ImagePickerAsset } from 'expo-image-picker';
import { snack } from 'lib/snack';

export const StepFour = () => {
  const height = useHeaderHeight();
  const navigation = useNavigation();

  const registerForm = useFormStore((store) => store.registerForm);
  const setRegisterForm = useFormStore((store) => store.setRegisterForm);
  const images = useFormStore((store) => store.images);

  const [loading, setLoading] = useState(false);

  const disabled =
    !registerForm.account.accountName ||
    !registerForm.account.accountNumber ||
    !registerForm.account.bankName;

  const handleRegister = async () => {
    // if (disabled) return snack('Please fill all required fields');

    const _images = [images.documentUrl, images.profilePhotoUrl];

    setLoading(true);

    let presignedFields: any[];

    try {
      presignedFields = await Promise.all(
        _images.map(async (e) => {
          const fileName = e.uri.split('/').pop() as string;
          const fileType = fileName?.split('.').pop();
          return await axios
            .post('/generatepresignedurl', {
              type: 'image/' + fileType,
              filename: fileName,
            })
            .then((e) => e.data.data);
        })
      );
    } catch (error) {
      setLoading(false);
      snack('error getting presigned urls');
      return;
    }
    snack('got presigned');
    try {
      await Promise.all(
        presignedFields.map(async (presignedData, index) => {
          const fileName = _images[index].uri.split('/').pop() as string;
          const fileType = fileName?.split('.').pop();
          const image = _images[index] as ImagePickerAsset;
          const newFormData = new FormData();
          Object.entries(presignedData.fields).forEach((e) =>
            newFormData.append(e[0], e[1] as any)
          );

          // newFormData.append('file', _images[index].uri.replace('///', '//'));
          newFormData.append('file', {
            uri: image.uri,
            name: fileName,
            type: 'image/' + fileType,
          } as unknown as Blob);

          const x = await axios.post(presignedData.url, newFormData);
          return x?.data;
        })
      );
    } catch (error) {
      setLoading(false);
      snack('error uploading images');
      return;
    }
    snack('uploaded images');
    try {
      await axios.post('/auth/signup', {
        ...registerForm,
        profilePhotoUrl: presignedFields[1].uploadedDocumentUrl,
        identification: {
          ...registerForm.identification,
          documentUrl: presignedFields[0].uploadedDocumentUrl,
        },
      });
    } catch (_error) {
      setLoading(false);
      const error = _error as any;
      snack(error?.response?.data?.message || error?.message || error);
    }
    navigation.navigate('SignUpDone');
  };

  return (
    <SafeAreaView className="flex-1 bg-alt-4 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={height}
      >
        <ScrollView className="flex-1" keyboardShouldPersistTaps="always">
          <View className="flex-1 p-5">
            <Span textClass="text-primary font-Mulish-Bold text-lg mt-12">
              Payment Details
            </Span>
            <Span textClass="mb-10">
              Please provide us with your bank details for quick payment
            </Span>
            <View className="w-full">
              <Input
                label="Bank holder name"
                placeholder="e.g, John Doe"
                value={registerForm.account.accountName}
                onChange={(text) =>
                  setRegisterForm('account', {
                    ...registerForm.account,
                    accountName: text,
                  })
                }
              />
            </View>
            <View className="w-full mt-4">
              <Input
                label="Account number"
                placeholder="e.g, 0561416996"
                value={registerForm.account.accountNumber}
                onChange={(text) =>
                  setRegisterForm('account', {
                    ...registerForm.account,
                    accountNumber: text,
                  })
                }
              />
            </View>

            <View className="w-full mt-4">
              {/* <Select
                // value={value}
                items={[]}
                // setItems={setItems}
                label="Bank name"
                placeholder="e.g, GT bank"
                // onChange={(text) => handleChangeText(text, 'email')}
              /> */}
              <Input
                label="Bank name"
                placeholder="e.g, GT bank"
                value={registerForm.account.bankName}
                onChange={(text) =>
                  setRegisterForm('account', {
                    ...registerForm.account,
                    bankName: text,
                  })
                }
              />
            </View>
            <View className="mt-[72px]">
              <Button
                onPress={handleRegister}
                disabled={disabled}
                loading={loading}
              >
                Confirm
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
