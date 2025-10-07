import React from "react";
import { View, StyleSheet } from "react-native";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  color?: string;
  thickness?: number;
  length?: number | string;
  margin?: number;
  type?: "solid" | "dashed" | "dotted";
  style?: object;
}

const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
  color = "#d3d3d3",
  thickness = 1,
  length = "100%",
  margin = 0,
  type = "solid",
  style,
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: type === "solid" ? color : "transparent",
          borderStyle: type,
          borderColor: color,
          borderWidth: thickness,
          width: isHorizontal ? length : 0,
          height: isHorizontal ? 0 : length,
          margin,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    alignSelf: "center",
  },
});

export default Separator;
