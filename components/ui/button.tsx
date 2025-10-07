import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontWeight?: TextStyle["fontWeight"];
  fontSize?: number;
  lineHeight?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  width?: DimensionValue; 
  height?: DimensionValue; 
  paddingHorizontal?: number;
  paddingVertical?: number;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  backgroundColor = "#030303",
  textColor = "#EFEFE7",
  fontFamily = "Nunito",
  fontWeight = "700",
  fontSize = 14,
  lineHeight = 18,
  borderRadius = 9,
  borderWidth = 0,
  borderColor = "transparent",
  width = 116,
  height = 38,
  paddingHorizontal = 8,
  paddingVertical = 0,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor,
          borderRadius,
          borderWidth,
          borderColor,
          width,
          height,
          paddingHorizontal,
          paddingVertical,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontFamily,
            fontWeight,
            fontSize,
            lineHeight,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default Button;
