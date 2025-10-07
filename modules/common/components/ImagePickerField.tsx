import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import * as ExpoImagePicker from 'expo-image-picker';

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  aspect?: [number, number];
};

export default function ImagePickerField({ control, name, label, aspect = [4, 3] }: Props) {
  const pickImage = async (onChange: (uri: string) => void) => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange },
        fieldState: { error },
      }) => (
        <View className="mb-2">
          <Text className="mb-1 text-base font-medium text-slate-700">{label}</Text>
          <TouchableOpacity
            onPress={() => pickImage(onChange)}
            accessibilityRole="button"
            accessibilityLabel={label}
            className="h-40 rounded-xl bg-slate-100 justify-center items-center"
          >
            {value ? (
              <Image
                source={{ uri: value }}
                className="w-full h-40 rounded-xl"
                resizeMode="cover"
                accessibilityLabel="Image preview"
              />
            ) : (
              <Text className="text-slate-400">Tap to upload image</Text>
            )}
          </TouchableOpacity>
          {error && (
            <Text className="mt-1 text-rose-500 text-xs">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}