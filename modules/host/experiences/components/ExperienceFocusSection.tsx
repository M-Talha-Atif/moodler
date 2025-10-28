import React from "react";
import { View, StyleSheet } from "react-native";
import { useWatch, Controller, useFormState } from "react-hook-form";
import ChipSelector from "@/modules/common/components/ChipSelector";
import { Text } from "@/components/ui/text";

const emotions = [
  "happy", "sad", "angry", "excited", "calm", "anxious", "peaceful", "inspired"
];
const outcomes = [
  "happiness", "calmness", "relief", "excitement", "peace", "inspiration", "connection", "relaxation"
];
const tags = [
  "beach", "music", "dance", "food", "art", "nature", "festival", "cultural"
];

export default function ExperienceFocusSection({ control, setValue }: any) {
  const targetEmotions = useWatch({ control, name: "targetEmotions" }) || [];
  const desiredOutcomes = useWatch({ control, name: "desiredOutcomes" }) || [];
  const culturalTags = useWatch({ control, name: "culturalTags" }) || [];

  // Access all validation errors from React Hook Form
  const { errors } = useFormState({ control });

  const handleChip = (field: string, max: number, val: string, selected: string[]) => {
    setValue(
      field,
      selected.includes(val)
        ? selected.filter((v: string) => v !== val)
        : selected.length < max
        ? [...selected, val]
        : selected,
      { shouldValidate: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Target Emotions */}
      <Controller
        control={control}
        name="targetEmotions"
        render={() => (
          <View style={styles.fieldGroup}>
            <ChipSelector
              label="Target Emotions"
              options={emotions}
              selected={targetEmotions}
              maxCount={5}
              onToggle={(v) => handleChip("targetEmotions", 5, v, targetEmotions)}
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
        render={() => (
          <View style={styles.fieldGroup}>
            <ChipSelector
              label="Desired Outcomes"
              options={outcomes}
              selected={desiredOutcomes}
              maxCount={5}
              onToggle={(v) => handleChip("desiredOutcomes", 5, v, desiredOutcomes)}
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
        render={() => (
          <View style={styles.fieldGroup}>
            <ChipSelector
              label="Cultural Tags"
              options={tags}
              selected={culturalTags}
              maxCount={8}
              onToggle={(v) => handleChip("culturalTags", 8, v, culturalTags)}
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
  },
});
