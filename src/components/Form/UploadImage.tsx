import React from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import { Span } from 'components/Span';
import { PlusIcon } from 'assets/icons';
import * as ImagePicker from 'expo-image-picker';
import { snack } from 'lib/snack';

type Props = {
  onSelect?: (doc: ImagePicker.ImagePickerAsset) => void;
  textClass?: string;
  bodyClass?: string;
  type?: string | string[];
} & ImagePicker.ImagePickerOptions;

export const UploadImage = ({
  onSelect,
  textClass,
  bodyClass,
  type,
  ...rest
}: Props) => {
  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,
        ...rest,
      });

      if (result.canceled) return;
      if (!result.assets?.[0]) return;
      const tenMegabytes = 1024 * 1024;
      if ((result.assets?.[0].fileSize || 0) > tenMegabytes)
        return snack('file size should not be more than 10MB');
      onSelect?.(result.assets[0]);
    } catch (error) {
      snack('something went wrong picking image'); // add log
    }
  };

  return (
    <TouchableOpacity
      className={clsx(
        'h-[45px] items-center justify-center rounded-[5px] overflow-hidden border border-primary flex-row px-6',
        bodyClass
      )}
      onPress={pickImage}
    >
      <PlusIcon />
      <Span
        textClass={clsx(
          'font-Mulish-SemiBold text-light-text text-xs ml-4',
          textClass
        )}
      >
        Upload a file
      </Span>
    </TouchableOpacity>
  );
};
