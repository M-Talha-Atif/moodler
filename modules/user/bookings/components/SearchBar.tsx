// src/modules/user/bookings/components/SearchBar.tsx
import { useRef, useEffect } from "react";
import { View, TextInput } from "react-native";
import { debounce } from "lodash";

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const debouncedChange = useRef(debounce(onChange, 500)).current;

  useEffect(() => {
    return () => {
      debouncedChange.cancel();
    };
  }, [debouncedChange]);

  return (
    <View className="p-4 bg-white border-b border-gray-200">
      <TextInput
        placeholder="🔍 Search experiences..."
        defaultValue={value}
        onChangeText={debouncedChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900"
        returnKeyType="search"
        accessibilityLabel="Search bookings"
      />
    </View>
  );
}