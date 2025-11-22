import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ChipSelectorProps {
  label?: string;
  options: string[];
  selectedValues?: string[];
  maxCount: number;
  onToggle: (value: string) => void;
  selectedColor?: string;
  unselectedColor?: string;
  textColor?: string;
  selectedTextColor?: string;
  borderColor?: string;
  borderRadius?: number;
  fontFamily?: string;
  fontSize?: number;
  spacing?: number;
  containerStyle?: ViewStyle;
  chipStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({
  label,
  options,
  selectedValues = [],
  maxCount,
  onToggle,
  selectedColor = "#4ADE80",
  unselectedColor = "#F3F4F6",
  textColor = "#1E293B",
  selectedTextColor = "#0F172A",
  borderColor = "#CBD5E1",
  borderRadius = 16,
  fontFamily = "Nunito",
  fontSize = 14,
  spacing = 8,
  containerStyle,
  chipStyle,
  textStyle,
}) => {
  const handleChipPress = (value: string) => {
    const isSelected = selectedValues.includes(value);
    const isMaxReached = selectedValues.length >= maxCount;
    
    // Don't allow selection if max count reached and chip is not already selected
    if (!isSelected && isMaxReached) {
      return;
    }
    
    // Pass the clicked value to parent
    onToggle(value);
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <View style={styles.header}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.count}>
            Selected: {selectedValues.length}/{maxCount}
          </Text>
        </View>
      )}
      
      <View style={[styles.container, { gap: spacing }, containerStyle]}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);
          const isDisabled = !isSelected && selectedValues.length >= maxCount;

          return (
            <TouchableOpacity
              key={option}
              onPress={() => handleChipPress(option)}
              activeOpacity={0.8}
              disabled={isDisabled}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected ? selectedColor : unselectedColor,
                  borderColor: isSelected ? selectedColor : borderColor,
                  borderRadius,
                  opacity: isDisabled ? 0.35 : 1,
                },
                chipStyle,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color: isSelected ? selectedTextColor : textColor,
                    fontFamily,
                    fontSize,
                  },
                  textStyle,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Nunito",
    color: "#1E293B",
  },
  count: {
    fontSize: 12,
    fontFamily: "Nunito",
    fontWeight: "500",
    color: "#64748B",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1.5,
  },
  chipText: {
    fontWeight: "600",
  },
});

export default ChipSelector;