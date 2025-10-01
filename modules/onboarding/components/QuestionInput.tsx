// src/features/onboarding/components/QuestionInput.tsx
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';

// Emoji Picker
const EmojiPicker = ({ value, onChange }) => (
  <View className="flex-row justify-center gap-4 mt-2">
    {['😄', '🙂', '😐', '😕', '😢'].map((emoji) => (
      <TouchableOpacity
        key={emoji}
        onPress={() => onChange(emoji)}
        className={`p-3 rounded-full ${emoji === value ? 'bg-[#7bf163]/20 border-2 border-[#7bf163]' : 'bg-gray-100'}`}
      >
        <Text className="text-2xl">{emoji}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

// Chip Selector (Multi)
const ChipSelectorMulti = ({ options, value = [], onChange }) => {
  const toggleSelection = (option) => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <View className="w-full mt-3 space-y-4">
      <View className="flex-row flex-wrap gap-3">
        {options.map((option, index) => (
          <MotiView
            key={option}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 100 }}
          >
            <TouchableOpacity
              onPress={() => toggleSelection(option)}
              className={`px-4 py-3 rounded-full border flex-row items-center gap-2 ${
                value.includes(option)
                  ? 'bg-[#7bf163] border-[#7bf163]'
                  : 'bg-white border-gray-300'
              }`}
            >
              <Text className={`font-medium ${
                value.includes(option) ? 'text-white' : 'text-gray-800'
              }`}>
                {option}
              </Text>
              {value.includes(option) && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </TouchableOpacity>
          </MotiView>
        ))}
      </View>

      {value.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {value.map((v) => (
            <View key={v} className="bg-[#7bf163]/10 px-3 py-1 rounded-full">
              <Text className="text-[#7bf163] text-xs">{v}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Chip Selector (Single)
const ChipSelectorSingle = ({ options, value, onChange }) => (
  <View className="w-full mt-3">
    <View className="flex-row flex-wrap gap-3">
      {options.map((option, index) => (
        <MotiView
          key={option}
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 100 }}
        >
          <TouchableOpacity
            onPress={() => onChange(option)}
            className={`px-4 py-3 rounded-full border flex-row items-center gap-2 ${
              value === option
                ? 'bg-[#7bf163] border-[#7bf163]'
                : 'bg-white border-gray-300'
            }`}
          >
            <Text className={`font-medium ${
              value === option ? 'text-white' : 'text-gray-800'
            }`}>
              {option}
            </Text>
            {value === option && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </TouchableOpacity>
        </MotiView>
      ))}
    </View>
  </View>
);

// Toggle Input
const ToggleInput = ({ value, onChange }) => (
  <View className="flex-row items-center justify-between mt-3 p-4 rounded-xl bg-gray-100">
    <Text className="font-medium text-gray-800">Enable community features</Text>
    <Switch
      value={value === "true"}
      onValueChange={(checked) => onChange(checked ? "true" : "false")}
      thumbColor={value === "true" ? "#7bf163" : "#f4f4f5"}
      trackColor={{ false: "#e5e7eb", true: "#7bf163" }}
    />
  </View>
);

// Main QuestionInput Component
interface QuestionInputProps {
  type: 'emoji' | 'chips' | 'toggle';
  value: any;
  onChange: (value: any) => void;
  id: string;
  options?: string[];
}

export default function QuestionInput({ type, value, onChange, id, options }: QuestionInputProps) {
  switch (type) {
    case 'emoji':
      return <EmojiPicker value={value} onChange={onChange} />;

    case 'chips':
      // Single choice for specific IDs
      if (id === 'social' || id === 'learningStyle' || id === 'intro') {
        return <ChipSelectorSingle options={options || []} value={value} onChange={onChange} />;
      }
      // Multi choice for others
      return <ChipSelectorMulti options={options || []} value={value} onChange={onChange} />;

    case 'toggle':
      return <ToggleInput value={value} onChange={onChange} />;

    default:
      return null;
  }
}