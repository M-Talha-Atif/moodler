import React from "react";
import { View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import Input from "@/components/ui/input";
import ImagePickerField from "@/modules/common/components/ImagePickerField";
import { Text } from "@/components/ui/text";

export default function ExperienceBasicsSection({ control }: any) {
  return (
    <View style={styles.container}>
      {/* Title Field */}
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <View>
            <Input
              label="Title"
              placeholder="Event name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              backgroundColor="#EFEFE7"
              borderColor="#D1D5DB"
              borderWidth={1}
              borderRadius={8}
              fontSize={14}
              height={44}
            />
            {error && (
              <Text style={styles.errorText} color="#DC2626">
                {error.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Description Field */}
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <View>
            <Input
              label="Description"
              placeholder="Describe your experience"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              backgroundColor="#EFEFE7"
              borderColor="#D1D5DB"
              borderWidth={1}
              borderRadius={8}
              fontSize={14}
              height={100}
              style={styles.multiline}
            />
            {error && (
              <Text style={styles.errorText} color="#DC2626">
                {error.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Image Picker Field */}
      <ImagePickerField
        control={control}
        name="image"
        label="Event Image"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    gap: 14,
  },
  multiline: {
    textAlignVertical: "top",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});
