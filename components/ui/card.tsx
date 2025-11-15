import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

interface CardProps {
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  marginBottom?: number;
  shadow?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  width = "100%", // ✅ fills parent container (use scrollView padding to control spacing)
  height,
  backgroundColor = "#FFFFFF",
  borderRadius = 16,
  padding = 16,
  marginBottom = 16,
  shadow = true,
  onPress,
  style,
  children,
}) => {
  const baseStyle: ViewStyle = {
    width,
    height: height === "auto" ? undefined : height,
    backgroundColor,
    borderRadius,
    padding,
    marginBottom,
    alignSelf: "stretch", // ✅ prevents weird centering issues
    ...(shadow && {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3,
    }),
  };

  const content = <View style={[baseStyle, style]}>{children}</View>;

  return onPress ? (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{ width: "100%" }} // ✅ ensures proper pressable width
    >
      {content}
    </TouchableOpacity>
  ) : (
    content
  );
};

export default Card;
