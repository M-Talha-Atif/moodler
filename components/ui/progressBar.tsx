import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { DimensionValue } from "react-native";

interface ProgressBarProps {
  progress: number; // value between 0 and 1
  height?: DimensionValue;
  backgroundColor?: string;
  fillColor?: string;
  borderRadius?: number;
  width?: DimensionValue;
  style?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor = "#E8E8E6",
  fillColor = "#0066FF",
  borderRadius = 4,
  width = "100%",
  style,
}) => {
  const safeProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, height, borderRadius, width },
        style,
      ]}
    >
      <View
        style={{
          backgroundColor: fillColor,
          width: `${safeProgress * 100}%`,
          height: "100%",
          borderRadius,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});

export default ProgressBar;
