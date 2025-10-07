import React from 'react';
import { View } from 'react-native';
import { useWatch } from 'react-hook-form';
import ChipSelector from '@/modules/common/components/ChipSelector';
import Input from '@/modules/common/components/Input';

const emotions = ["happy", "sad", "angry", "excited", "calm", "anxious", "peaceful", "inspired"]
const outcomes = ["happiness", "calmness", "relief", "excitement", "peace", "inspiration", "connection", "relaxation"]
const tags = ["beach", "music", "dance", "food", "art", "nature", "festival", "cultural"]

export default function ExperienceFocusSection({ control, setValue }: any) {
  // Use useWatch for each field to guarantee reactivity!
  const targetEmotions = useWatch({ control, name: 'targetEmotions' }) || [];
  const desiredOutcomes = useWatch({ control, name: 'desiredOutcomes' }) || [];
  const culturalTags = useWatch({ control, name: 'culturalTags' }) || [];

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
    <View>
      <ChipSelector
        label="Target Emotions"
        options={emotions}
        selected={targetEmotions}
        maxCount={5}
        onToggle={v => handleChip('targetEmotions', 5, v, targetEmotions)}
      />
      <ChipSelector
        label="Desired Outcomes"
        options={outcomes}
        selected={desiredOutcomes}
        maxCount={5}
        onToggle={v => handleChip('desiredOutcomes', 5, v, desiredOutcomes)}
      />
      <ChipSelector
        label="Cultural Tags"
        options={tags}
        selected={culturalTags}
        maxCount={8}
        onToggle={v => handleChip('culturalTags', 8, v, culturalTags)}
      />
    </View>
  );
}