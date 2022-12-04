import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, DateInput, Button, UploadImage } from 'components';
import { Span } from 'components/Span';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { ImageInfo } from 'expo-image-picker';

export const StepThree = () => {
  const height = useHeaderHeight();
  const navigation = useNavigation();

  const postImage = (image: ImageInfo) => {
    return;
    const url = 'http://192.168.10.107:8000/upload';
    const fileUri = image.uri;
    const formData = new FormData();
    formData.append('image', fileUri);
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    console.log(formData);

    fetch(url, options).catch((error) => console.log(error));
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
                  // value={state.email}
                  // onChange={(text) => handleChangeText(text, 'email')}
                />
              </View>
              <View className="w-full mt-4">
                <DateInput
                  label="Issued date"
                  //   value={new Date()}
                  onChange={() => {}}
                  // value={state.email}
                  // onChange={(text) => handleChangeText(text, 'email')}
                />
              </View>
              <View className="mt-4 flex-row justify-end">
                <UploadImage onSelect={postImage} />
              </View>
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
                <UploadImage onSelect={postImage} />
              </View>
            </View>
            <View className="mt-[27px]">
              <Button onPress={() => navigation.navigate('StepFour')}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
