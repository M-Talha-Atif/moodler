import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ChipSelectorProps {
  options: string[];
  multiSelect?: boolean;
  defaultSelected?: string | string[];
  selectedColor?: string;
  unselectedColor?: string;
  textColor?: string;
  selectedTextColor?: string;
  borderColor?: string;
  borderRadius?: number;
  fontFamily?: string;
  fontSize?: number;
  spacing?: number;
  onChange?: (selected: string[] | string) => void;
  containerStyle?: ViewStyle;
  chipStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({
  options,
  multiSelect = false,
  defaultSelected = [],
  selectedColor = "#030303",
  unselectedColor = "#d3d3d3",
  textColor = "#000",
  selectedTextColor = "#EFEFE7",
  borderColor = "#aaa",
  borderRadius = 16,
  fontFamily = "Nunito",
  fontSize = 14,
  spacing = 8,
  onChange,
  containerStyle,
  chipStyle,
  textStyle,
}) => {
  const normalizeDefault = Array.isArray(defaultSelected)
    ? defaultSelected
    : [defaultSelected];

  const [selected, setSelected] = useState<string[]>(normalizeDefault);

  useEffect(() => {
    setSelected(normalizeDefault);
  }, [defaultSelected]);

  const toggleChip = (option: string) => {
    let newSelected;
    if (multiSelect) {
      newSelected = selected.includes(option)
        ? selected.filter((i) => i !== option)
        : [...selected, option];
    } else {
      newSelected = selected.includes(option) ? [] : [option];
    }
    setSelected(newSelected);
    onChange?.(multiSelect ? newSelected : newSelected[0] || "");
  };

  return (
    <View style={[styles.container, { gap: spacing }, containerStyle]}>
      {options.map((option, index) => {
        const isSelected = selected.includes(option);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => toggleChip(option)}
            activeOpacity={0.8}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? selectedColor : unselectedColor,
                borderRadius,
                borderColor,
                borderWidth: 0.5,
              },
              chipStyle,
            ]}
          >
            <Text
              style={[
                styles.text,
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
  },
});

export default ChipSelector;
