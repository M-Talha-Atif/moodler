// src/components/ui/Skeleton.tsx
import React from "react";
import { View, ViewStyle } from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  style?: ViewStyle;
  gradientColors?: string[];
}

export default function Skeleton({
  width = "100%",
  height = 16,
  radius = 8,
  style,
  gradientColors = ["#f0f0f0", "#e5e5e5", "#f0f0f0"],
}: SkeletonProps) {
  return (
    <MotiView
      from={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 1200,
        loop: true,
        repeatReverse: true,
      }}
      style={[
        {
          width,
          height,
          borderRadius: radius,
          overflow: "hidden",
          backgroundColor: "#e5e7eb",
        },
        style,
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: "150%",
          height: "100%",
          transform: [{ translateX: -50 }],
        }}
      />
    </MotiView>
  );
}
