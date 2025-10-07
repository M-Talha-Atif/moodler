import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import * as Haptics from 'expo-haptics';

// If you use a theme hook/provider, you can import/use it here for dynamic colors.

type Props = {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  maxCount: number;
};

export default function ChipSelector({
  label,
  options,
  selected,
  onToggle,
  maxCount,
}: Props) {
  const handleToggle = (item: string) => {
    Haptics.selectionAsync();
    onToggle(item);
  };

  return (
    <View className="mb-3">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-base font-medium text-slate-700">{label}</Text>
        <Text className="text-xs text-muted-foreground">Selected: {selected.length}/{maxCount}</Text>
      </View>
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={o => o}
        renderItem={({ item }) => {
          const isActive = selected.includes(item);
          const disabled = !isActive && selected.length >= maxCount;
          return (
            <Pressable
              onPress={() => !disabled && handleToggle(item)}
              className={`
                px-4 py-2 mr-2 mb-2 rounded-full border
                ${isActive 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-secondary text-secondary-foreground border-border'}
                ${disabled ? 'opacity-40' : ''}
              `}
              accessibilityState={{ selected: isActive, disabled }}
              accessibilityLabel={item}
              style={[
                isActive
                  ? { backgroundColor: '#4ADE80', borderColor: '#4ADE80' } // primary
                  : { backgroundColor: '#F3F4F6', borderColor: '#E2E8F0' }, // secondary & border
                { marginRight: 8, marginBottom: 8, borderRadius: 9999, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 8 },
                disabled && { opacity: 0.4 }
              ]}
            >
              <Text
                style={{
                  color: isActive ? '#0F172A' : '#1E293B', // foreground (deep slate) for contrast
                  fontWeight: isActive ? '700' : '400',
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}