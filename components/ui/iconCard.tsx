import React from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from "react-native";

interface IconCardProps {
  size?: number;
  backgroundColor?: string;
  borderRadius?: number;
  shadow?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const IconCard: React.FC<IconCardProps> = ({
  size = 72,
  backgroundColor = "#d3d3d3",
  borderRadius = 12,
  shadow = true,
  onPress,
  style,
  children,
}) => {
  const baseStyle: ViewStyle = {
    width: size,
    height: size,
    backgroundColor,
    borderRadius,
    justifyContent: "center",
    alignItems: "center",
    ...(shadow && {
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    }),
  };

  const content = <View style={[baseStyle, style]}>{children}</View>;

  return onPress ? (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      {content}
    </TouchableOpacity>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconCard;
