import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { MotiView, AnimatePresence } from "moti";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

interface DropdownProps<T> {
  label?: string;
  options: { label: string; value: T }[];
  selectedValue: T | null;
  onSelect: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: string | number;
  modal?: boolean; 
}

export default function Dropdown<T>({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  disabled = false,
  width = "100%",
  modal = false,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = async () => {
    if (disabled) return;
    await Haptics.selectionAsync();
    setOpen(!open);
  };

  const handleSelect = async (value: T) => {
    await Haptics.selectionAsync();
    onSelect(value);
    setOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  const DropdownList = (
    <MotiView
      from={{ opacity: 0, translateY: -5 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -5 }}
      transition={{ type: "timing", duration: 150 }}
      className="bg-white border rounded-2xl shadow-lg"
      style={{ borderColor: "#E2E8F0" }}
    >
      <FlatList
        data={options}
        keyExtractor={(item) => String(item.value)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item.value)}
            className="px-4 py-3 border-b border-gray-100"
            activeOpacity={0.7}
          >
            <Text
              className={`text-sm ${
                item.value === selectedValue
                  ? "text-emerald-600 font-semibold text-sm"
                  : "text-gray-700 text-sm"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </MotiView>
  );

  return (
    <View style={{ width }}>
      {label && (
        <Text className="text-sm text-gray-700 mb-1 font-medium">{label}</Text>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleDropdown}
        className={`flex-row items-center justify-between rounded-2xl border px-4 py-3 bg-white ${
          disabled ? "opacity-60" : ""
        }`}
        style={{ borderColor: "#E2E8F0" }}
      >
        <Text
          className={`text-sm ${
            selectedValue ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {selectedLabel}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color="#4ADE80"
        />
      </TouchableOpacity>

      <AnimatePresence>
        {open && !modal && (
          <View className="absolute top-20 left-0 right-0 z-50">{DropdownList}</View>
        )}
      </AnimatePresence>
      {modal && (
        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <View className="flex-1 bg-black/40 justify-center items-start px-6">
              <View className="w-full rounded-2xl bg-white p-3 shadow-lg">
                <Text className="text-base font-semibold text-gray-800 mb-3">
                  {label}
                </Text>
                {DropdownList}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}
