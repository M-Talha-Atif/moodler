import React from "react";
import { View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";

interface AnimatedBorderCardProps {
  children: React.ReactNode;
  status?: "confirmed" | "pending" | "cancelled" | "default";
  borderSpeed?: number;
  borderThickness?: number;
  containerStyle?: ViewStyle;
}

const colorMap = {
  confirmed: ["#7bf163", "#10B981", "#7bf163"],
  pending: ["#F59E0B", "#FBBF24", "#F59E0B"],
  cancelled: ["#EF4444", "#F87171", "#EF4444"],
  default: ["#7bf163", "#10B981", "#7bf163"],
} as const;

export default function AnimatedBorderCard({
  children,
  status = "default",
  borderSpeed = 3000,
  borderThickness = 2,
  containerStyle,
}: AnimatedBorderCardProps) {
  const colors = colorMap[status];

  return (
    <View
      style={containerStyle}
      className="relative rounded-3xl overflow-hidden bg-card shadow-sm"
    >
      {/* Animated Border Glow - All sides */}
      <MotiView
        from={{ translateX: -200 }}
        animate={{ translateX: 200 }}
        transition={{
          loop: true,
          repeatReverse: false,
          duration: borderSpeed,
        }}
        className="absolute top-0 left-0 right-0 z-10"
        style={{ height: borderThickness }}
      >
        <LinearGradient
          colors={["transparent", ...colors, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: "100%", height: "100%" }}
        />
      </MotiView>

      {/* Right Border */}
      <MotiView
        from={{ translateY: -200 }}
        animate={{ translateY: 200 }}
        transition={{
          loop: true,
          repeatReverse: false,
          duration: borderSpeed,
          delay: borderSpeed / 4,
        }}
        className="absolute top-0 right-0 bottom-0 z-10"
        style={{ width: borderThickness }}
      >
        <LinearGradient
          colors={["transparent", ...colors, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ width: "100%", height: "100%" }}
        />
      </MotiView>

      {/* Bottom Border */}
      <MotiView
        from={{ translateX: 200 }}
        animate={{ translateX: -200 }}
        transition={{
          loop: true,
          repeatReverse: false,
          duration: borderSpeed,
          delay: borderSpeed / 2,
        }}
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ height: borderThickness }}
      >
        <LinearGradient
          colors={["transparent", ...colors, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: "100%", height: "100%" }}
        />
      </MotiView>

      {/* Left Border */}
      <MotiView
        from={{ translateY: 200 }}
        animate={{ translateY: -200 }}
        transition={{
          loop: true,
          repeatReverse: false,
          duration: borderSpeed,
          delay: (borderSpeed * 3) / 4,
        }}
        className="absolute top-0 left-0 bottom-0 z-10"
        style={{ width: borderThickness }}
      >
        <LinearGradient
          colors={["transparent", ...colors, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ width: "100%", height: "100%" }}
        />
      </MotiView>

      {/* Actual card content */}
      <View className="p-2 rounded-3xl border border-gray-200 space-y-3 bg-white">
        {children}
      </View>
    </View>
  );
}