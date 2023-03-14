import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, DateInput, Button, UploadImage, ImageView } from 'components';
import { Span } from 'components/Span';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { ImagePickerAsset } from 'expo-image-picker';
import { useFormStore } from 'store/formStore';
import { snack } from 'lib/snack';

export const StepThree = () => {
  const height = useHeaderHeight();
  const navigation = useNavigation();

  const setImage = useFormStore((store) => store.setImage);
  const images = useFormStore((store) => store.images);
  const registerForm = useFormStore((store) => store.registerForm);
  const setRegisterForm = useFormStore((store) => store.setRegisterForm);

  const handleImage = (key: string, image: ImagePickerAsset) => {
    setImage(key, image);
  };

  const disabled =
    !registerForm.identification.idNumber ||
    !images.documentUrl ||
    !images.profilePhotoUrl;

  const handleNext = () => {
    if (disabled) return snack('Please fill all required fields');
    navigation.navigate('StepFour');
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
              Document
            </Span>
            <Span textClass="mb-10">
              Please provide us with relevant document details and capturing
            </Span>
            <View className="bg-white p-4">
              <Span textClass="text-base font-Mulish-SemiBold text-primary mb-[27px]">
                National ID card
              </Span>
              <View className="w-full">
                <Input
                  label="Nuban number"
                  placeholder="e,g, 2345657584"
                  value={registerForm.identification.idNumber}
                  onChange={(text) =>
                    setRegisterForm('identification', {
                      ...registerForm.identification,
                      idNumber: text,
                    })
                  }
                />
              </View>
              <View className="w-full mt-4">
                <DateInput
                  label="Issued date"
                  value={registerForm.identification.dateIssued}
                  onChange={(text) =>
                    setRegisterForm('identification', {
                      ...registerForm.identification,
                      dateIssued: text,
                    })
                  }
                />
              </View>
              <View className="mt-4 flex-row justify-end">
                <UploadImage
                  onSelect={(image) => handleImage('documentUrl', image)}
                />
              </View>
              {images?.documentUrl && (
                <ImageView
                  source={images.documentUrl}
                  onClose={() => setImage('documentUrl', undefined)}
                />
              )}
            </View>
            <View className="bg-white p-4 mt-[27px]">
              <Span textClass="text-base font-Mulish-SemiBold text-primary">
                Profile photo
              </Span>
              <Span textClass="mt-2">
                Please provide us with a clear potrait picture of yourself.
                Picture should contain your face only
              </Span>
              <View className="mt-4 flex-row justify-end">
                <UploadImage
                  onSelect={(image) => handleImage('profilePhotoUrl', image)}
                />
              </View>
              {images?.profilePhotoUrl && (
                <ImageView
                  source={images.profilePhotoUrl}
                  onClose={() => setImage('profilePhotoUrl', undefined)}
                />
              )}
            </View>
            <View className="mt-[27px]">
              <Button onPress={handleNext} disabled={disabled}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
