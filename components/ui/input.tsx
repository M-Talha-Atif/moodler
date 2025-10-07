import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  TextStyle,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native"; // already in your deps

interface InputProps extends TextInputProps {
  label?: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  lineHeight?: number;
  iconColor?: string;
  isPassword?: boolean;
  width?: number | string;
  height?: number;
  style?: any;
}

const Input: React.FC<InputProps> = ({
  label,
  description,
  backgroundColor = "#D3C9CC",
  textColor = "#000000",
  placeholderColor = "#5A5A5A",
  borderColor = "transparent",
  borderWidth = 0,
  borderRadius = 4,
  fontFamily = "Nunito",
  fontSize = 12,
  fontWeight = "400",
  lineHeight,
  iconColor = "#000",
  isPassword = false,
  width = "100%",
  height = 36,
  style,
  ...props
}) => {
  const [secure, setSecure] = useState(isPassword);

  return (
    <View style={{ width }}>
      {label && <Text style={[styles.label, { fontFamily }]}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor,
            borderColor,
            borderWidth,
            borderRadius,
            height,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: textColor,
              fontFamily,
              fontSize,
              fontWeight,
              lineHeight,
            },
            style,
          ]}
          placeholderTextColor={placeholderColor}
          secureTextEntry={secure}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            {secure ? (
              <EyeOff size={18} color={iconColor} />
            ) : (
              <Eye size={18} color={iconColor} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {description && (
        <Text
          style={[
            styles.description,
            { color: "#5A5A5A", fontFamily, fontSize: 10 },
          ]}
        >
          {description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#030303",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  description: {
    marginTop: 4,
  },
});

export default Input;
