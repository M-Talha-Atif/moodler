import React from "react";
import { View, StyleSheet } from "react-native";
import { Controller, useFormState } from "react-hook-form";
import ChipSelector from "@/modules/common/components/ChipSelector";
import { Text } from "@/components/ui/text";
import Toast from "react-native-toast-message";

const emotions = [
  "happy", "sad", "angry", "excited", "calm", "anxious", "peaceful", "inspired",
];

const outcomes = [
  "happiness", "calmness", "relief", "excitement", "peace", "inspiration", "connection", "relaxation",
];

const tags = [
  "beach", "music", "dance", "food", "art", "nature", "festival", "cultural",
];

interface ExperienceFocusSectionProps {
  control: any;
  setValue?: any;
}

export default function ExperienceFocusSection({ control }: ExperienceFocusSectionProps) {
  const { errors } = useFormState({ control });

  /**
   * Handle chip toggle - add or remove value from array
   */
  const handleToggle = (
    current: string[],
    value: string,
    maxCount: number,
    fieldName: string
  ): string[] => {
    // Check if value is already selected
    if (current.includes(value)) {
      // Remove the value (unselect)
      return current.filter((v) => v !== value);
    } else {
      // Check if max count reached
      if (current.length >= maxCount) {
        Toast.show({
          type: "info",
          text1: "Maximum Reached",
          text2: `You can only select up to ${maxCount} ${fieldName}`,
          position: "top",
          visibilityTime: 2000,
        });
        return current; // Don't add, max reached
      }
      // Add the value (select)
      return [...current, value];
    }
  };

  return (
    <View style={styles.container}>
      {/* Target Emotions */}
      <Controller
        control={control}
        name="targetEmotions"
        render={({ field }) => (
          <View style={styles.fieldGroup}>
            <ChipSelector
              label="Target Emotions"
              options={emotions}
              selectedValues={field.value || []}
              maxCount={5}
              onToggle={(value: string) => {
                const currentValues = field.value || [];
                const updated = handleToggle(
                  currentValues,
                  value,
                  5,
                  "emotions"
                );
                // Use shouldValidate: true to trigger validation after state update
                field.onChange(updated);
              }}
               selectedColor="#030303"
              unselectedColor="#E8E8E6"
              selectedTextColor="#EFEFE7"
              textColor="#030303"
            />
            {errors?.targetEmotions && (
              <Text style={styles.errorText} color="#DC2626">
                {errors.targetEmotions.message as string}
              </Text>
            )}
          </View>
        )}
      />

      {/* Desired Outcomes */}
      <Controller
        control={control}
        name="desiredOutcomes"
        render={({ field }) => (
          <View style={styles.fieldGroup}>
            <ChipSelector
              label="Desired Outcomes"
              options={outcomes}
              selectedValues={field.value || []}
              maxCount={5}
              onToggle={(value: string) => {
                const currentValues = field.value || [];
                const updated = handleToggle(
                  currentValues,
                  value,
                  5,
                  "outcomes"
                );
                field.onChange(updated);
              }}
              selectedColor="#030303"
              unselectedColor="#E8E8E6"
              selectedTextColor="#EFEFE7"
              textColor="#030303"
            />
            {errors?.desiredOutcomes && (
              <Text style={styles.errorText} color="#DC2626">
                {errors.desiredOutcomes.message as string}
              </Text>
            )}
          </View>
        )}
      />

      {/* Cultural Tags */}
      <Controller
        control={control}
        name="culturalTags"
        render={({ field }) => (
          <View style={styles.fieldGroup}>
            <ChipSelector
              label="Cultural Tags"
              options={tags}
              selectedValues={field.value || []}
              maxCount={8}
              onToggle={(value: string) => {
                const currentValues = field.value || [];
                const updated = handleToggle(
                  currentValues,
                  value,
                  8,
                  "tags"
                );
                field.onChange(updated);
              }}
               selectedColor="#030303"
              unselectedColor="#E8E8E6"
              selectedTextColor="#EFEFE7"
              textColor="#030303"
            />
            {errors?.culturalTags && (
              <Text style={styles.errorText} color="#DC2626">
                {errors.culturalTags.message as string}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  fieldGroup: {
    marginBottom: 8,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: "Nunito",
    fontWeight: "500",
  },
});