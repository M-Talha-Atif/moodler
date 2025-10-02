// modules/onboarding/components/QuestionInput.tsx
import { View, Text, TouchableOpacity, Switch } from 'react-native';
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

// Chip Selector (Multi) - FIXED: Handle null/undefined value
const ChipSelectorMulti = ({ options, value = [], onChange }) => {
  // Ensure value is always an array
  const safeValue = Array.isArray(value) ? value : [];
  
  const toggleSelection = (option) => {
    const newValue = safeValue.includes(option)
      ? safeValue.filter((v) => v !== option)
      : [...safeValue, option];
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
                safeValue.includes(option)
                  ? 'bg-[#7bf163] border-[#7bf163]'
                  : 'bg-white border-gray-300'
              }`}
            >
              <Text className={`font-medium ${
                safeValue.includes(option) ? 'text-white' : 'text-gray-800'
              }`}>
                {option}
              </Text>
              {safeValue.includes(option) && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </TouchableOpacity>
          </MotiView>
        ))}
      </View>

      {safeValue.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {safeValue.map((v) => (
            <View key={v} className="bg-[#7bf163]/10 px-3 py-1 rounded-full">
              <Text className="text-[#7bf163] text-xs">{v}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Chip Selector (Single) - FIXED: Handle null/undefined value
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

// Toggle Input - FIXED: Handle null/undefined value
const ToggleInput = ({ value, onChange }) => {
  const safeValue = value === "true"; // Convert to boolean
  
  return (
    <View className="flex-row items-center justify-between mt-3 p-4 rounded-xl bg-gray-100">
      <Text className="font-medium text-gray-800">Enable community features</Text>
      <Switch
        value={safeValue}
        onValueChange={(checked) => onChange(checked ? "true" : "false")}
        thumbColor={safeValue ? "#7bf163" : "#f4f4f5"}
        trackColor={{ false: "#e5e7eb", true: "#7bf163" }}
      />
    </View>
  );
};

// Main QuestionInput Component - FIXED: Provide default values
interface QuestionInputProps {
  type: 'emoji' | 'chips' | 'toggle';
  value: any;
  onChange: (value: any) => void;
  id: string;
  options?: string[];
}

export default function QuestionInput({ type, value, onChange, id, options = [] }: QuestionInputProps) {
  // Ensure we have safe default values
  const safeValue = value !== null && value !== undefined ? value : 
                   type === 'chips' ? [] : 
                   type === 'toggle' ? "false" : null;

  switch (type) {
    case 'emoji':
      return <EmojiPicker value={safeValue} onChange={onChange} />;

    case 'chips':
      // Single choice for specific IDs
      if (id === 'social' || id === 'learningStyle' || id === 'intro') {
        return <ChipSelectorSingle options={options} value={safeValue} onChange={onChange} />;
      }
      // Multi choice for others
      return <ChipSelectorMulti options={options} value={safeValue} onChange={onChange} />;

    case 'toggle':
      return <ToggleInput value={safeValue} onChange={onChange} />;

    default:
      return null;
  }
}