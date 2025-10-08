import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ViewStyle,
} from "react-native";
import { Text } from "./text"; // using your text component
import { Ionicons } from "@expo/vector-icons";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  data: DropdownItem[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  data,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  style,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          variant="label"
          color="#030303"
          style={{ marginBottom: 6, fontFamily: "Nunito" }}
        >
          {label}
        </Text>
      )}

      {/* Dropdown button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text
          variant="body"
          color={selectedValue ? "#030303" : "#9CA3AF"}
          style={{ fontFamily: "Nunito" }}
        >
          {selectedValue
            ? data.find((item) => item.value === selectedValue)?.label
            : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#030303" />
      </TouchableOpacity>

      {/* Dropdown modal */}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdownList}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text variant="body" color="#030303">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#E8E8E6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  dropdownList: {
    backgroundColor: "#FAFAF8",
    borderRadius: 12,
    paddingVertical: 10,
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default Dropdown;
