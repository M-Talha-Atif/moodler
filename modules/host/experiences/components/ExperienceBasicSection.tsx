import React from 'react';
import { View } from 'react-native';
import Input from '@/modules/common/components/Input';
import ImagePickerField from '@/modules/common/components/ImagePickerField';

export default function ExperienceBasicsSection({ control }: any) {
  return (
    <View>
      <Input control={control} name="title" label="Title" placeholder="Event name" />
      <Input control={control} name="description" label="Description" placeholder="Describe your experience" multiline />
      <ImagePickerField control={control} name="image" label="Event Image" />
    </View>
  );
}