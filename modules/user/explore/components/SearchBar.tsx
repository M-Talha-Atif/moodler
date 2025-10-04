// SearchBar.tsx - FIXED
import { useRef, useEffect } from "react";
import { View, TextInput } from "react-native";
import { debounce } from "lodash";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) {
  const debouncedChange = useRef(debounce(onChange, 500)).current;

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedChange.cancel();
    };
  }, []);

  return (
    <View className="p-4 bg-white border-b border-gray-200">
      <TextInput
        placeholder="🔍 Search experiences..."
        defaultValue={value}
        onChangeText={(text) => {
          // Immediate update for better UX
          debouncedChange(text);
        }}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900"
        returnKeyType="search"
      />
    </View>
  );
}