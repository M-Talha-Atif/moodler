import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface ContainerProps {
  padding?: number;
  margin?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  backgroundColor?: string;
  radius?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  padding = 16,
  margin = 0,
  paddingHorizontal,
  paddingVertical,
  marginHorizontal,
  marginVertical,
  backgroundColor = "#FAFAF8",
  radius = 12,
  style,
  children,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          padding,
          margin,
          paddingHorizontal,
          paddingVertical,
          marginHorizontal,
          marginVertical,
          backgroundColor,
          borderRadius: radius,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default Container;
