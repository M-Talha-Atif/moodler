import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search experiences...",
  value = "",
  onChangeText,
  containerStyle,
  inputStyle,
}) => {
  const [text, setText] = useState(value);
  const debouncedChange = useRef(debounce(onChangeText || (() => {}), 400)).current;

  useEffect(() => {
    return () => debouncedChange.cancel();
  }, []);

  const handleChange = (t: string) => {
    setText(t);
    debouncedChange(t);
  };

  const clearInput = () => {
    setText("");
    onChangeText && onChangeText("");
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Search Icon */}
      <Ionicons name="search" size={18} color="#555" style={styles.iconLeft} />

      {/* Input */}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={text}
        onChangeText={handleChange}
        returnKeyType="search"
      />

      {/* Clear Button */}
      {text.length > 0 && (
        <TouchableOpacity onPress={clearInput} style={styles.iconRight}>
          <Ionicons name="close-circle" size={18} color="#777" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAF8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    paddingHorizontal: 12,
    height: 44,
    marginHorizontal: 24,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#030303",
    fontFamily: "Nunito",
    paddingVertical: 0,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default SearchBar;
