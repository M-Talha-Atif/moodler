import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  paddingHorizontal?: number;
  height?: number;
  textColor?: string;
  placeholderColor?: string;
  iconColor?: string;
  showClear?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChangeText,
  backgroundColor = "#d3d3d3",
  borderColor = "#ccc",
  borderRadius = 10,
  borderWidth = 0,
  paddingHorizontal = 10,
  height = 40,
  textColor = "#000",
  placeholderColor = "#666",
  iconColor = "#000",
  showClear = true,
  containerStyle,
  inputStyle,
}) => {
  const [text, setText] = useState(value || "");

  const handleChange = (t: string) => {
    setText(t);
    onChangeText && onChangeText(t);
  };

  const clearInput = () => {
    setText("");
    onChangeText && onChangeText("");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderWidth,
          borderRadius,
          paddingHorizontal,
          height,
        },
        containerStyle,
      ]}
    >
      <Ionicons name="search" size={18} color={iconColor} />
      <TextInput
        style={[
          styles.input,
          {
            color: textColor,
            fontFamily: "Nunito",
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={text}
        onChangeText={handleChange}
      />
      {showClear && text.length > 0 && (
        <TouchableOpacity onPress={clearInput}>
          <Ionicons name="close-circle" size={18} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 8,
  },
});

export default SearchBar;
