import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Controller, Control } from "react-hook-form";
import * as ExpoImagePicker from "expo-image-picker";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  aspect?: [number, number];
};

export default function ImagePickerField({
  control,
  name,
  label,
  aspect = [4, 3],
}: Props) {
  const pickImage = async (onChange: (uri: string) => void) => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>

          <TouchableOpacity
            onPress={() => pickImage(onChange)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={label}
            style={styles.uploadBox}
          >
            {value ? (
              <Image
                source={{ uri: value }}
                style={styles.image}
                resizeMode="cover"
                accessibilityLabel="Image preview"
              />
            ) : (
              <Text style={styles.placeholderText}>Tap to upload image</Text>
            )}
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#030303",
    marginBottom: 6,
    fontFamily: "Nunito",
  },
  uploadBox: {
    height: 160,
    backgroundColor: "#EFEFE7",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  placeholderText: {
    color: "#6B7280",
    fontSize: 13,
    fontFamily: "Nunito",
  },
  errorText: {
    marginTop: 4,
    color: "#DC2626",
    fontSize: 12,
    fontFamily: "Nunito",
  },
});
