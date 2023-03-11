import { View, Image, Text } from 'react-native';
import React from 'react';
import { ImagePickerAsset } from 'expo-image-picker';
import { CloseIcon } from 'assets/icons';

type Props = {
  source: ImagePickerAsset;
  onClose?: () => void;
};

export const ImageView = ({ source, onClose }: Props) => {
  return (
    <View className="max-h-40 mt-4 bg-red-50 relative">
      <Image source={source} resizeMode="contain" className="h-full w-full" />
      <CloseIcon className="absolute right-1 top-1 h-6 w-6" onPress={onClose} />
    </View>
  );
};
