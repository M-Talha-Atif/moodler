import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@/components/ui/text";

interface Tab {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  tabs: Tab[];
  onChange: (value: string) => void;
  initialValue?: string;
  style?: ViewStyle;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  tabs,
  onChange,
  initialValue,
  style,
}) => {
  const [selected, setSelected] = useState(initialValue || tabs[0].value);

  const handlePress = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => {
        const isActive = selected === tab.value;
        return (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => handlePress(tab.value)}
            activeOpacity={0.8}
          >
            <Text
              variant="body"
              color={isActive ? "#FAFAF8" : "#030303"}
              style={{ fontWeight: isActive ? "700" : "500" }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E8E8E6",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#030303",
  },
});

export default SegmentedControl;
