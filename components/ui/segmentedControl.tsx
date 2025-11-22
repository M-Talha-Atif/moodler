import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";

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
      {tabs.map((tab, index) => {
        const isActive = selected === tab.value;
        const isFirst = index === 0;
        const isLast = index === tabs.length - 1;
        
        return (
          <TouchableOpacity
            key={tab.value}
            style={[
              styles.tab,
              isActive && styles.activeTab,
              isFirst && styles.firstTab,
              isLast && styles.lastTab,
            ]}
            onPress={() => handlePress(tab.value)}
            activeOpacity={0.7}
          >
            {isActive && (
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark-circle" size={14} color="#FAFAF8" />
              </View>
            )}
            <Text
              style={[
                styles.tabText,
                isActive && styles.activeTabText,
              ]}
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
    backgroundColor: "#EFEFE7",
    borderRadius: 14,
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "relative",
  },
  firstTab: {
    // Additional styling for first tab if needed
  },
  lastTab: {
    // Additional styling for last tab if needed
  },
  activeTab: {
    backgroundColor: "#030303",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkIcon: {
    marginRight: 4,
  },
  tabText: {
    fontFamily: "Nunito",
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#FAFAF8",
    fontWeight: "800",
  },
});

export default SegmentedControl;