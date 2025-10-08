// src/components/widgets/StreakWidget.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

interface StreakWidgetProps {
  streak: number;
}

export default function StreakWidget({ streak }: StreakWidgetProps) {
  const level =
    streak >= 30 ? "🔥 Veteran"
    : streak >= 10 ? "⚡ Consistent"
    : streak >= 3 ? "🌱 Getting Started"
    : "💡 Let's Go!";

  const color =
    streak >= 30 ? "#EA580C" // deep orange
    : streak >= 10 ? "#F59E0B" // amber
    : "#7BF163"; // soft green for early streaks

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 300 }}
      style={[styles.card, { borderColor: color + "40" }]}
    >
      <View style={styles.row}>
        {/* Left: Text Section */}
        <View style={styles.textSection}>
          <Text className="text-xs font-medium text-gray-500">
            Current Streak
          </Text>
          <Text
            className="font-bold mt-1"
            style={{ fontSize: 22, color: "#030303" }}
          >
            {streak} days
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: "#6B7280" }}
            numberOfLines={1}
          >
            {level}
          </Text>
        </View>

        {/* Right: Icon */}
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: color + "20" },
          ]}
        >
          <Ionicons name="flame" size={28} color={color} />
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textSection: {
    flex: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});
