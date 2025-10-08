// src/components/widgets/MoodWidget.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

interface MoodWidgetProps {
  mood: string;
}

const moodConfig: Record<
  string,
  { icon: keyof typeof Ionicons.glyphMap; color: string; message: string }
> = {
  happy: {
    icon: "happy-outline",
    color: "#7BF163",
    message: "Feeling great! 🌞",
  },
  calm: {
    icon: "leaf-outline",
    color: "#60A5FA",
    message: "Peaceful and balanced 🌿",
  },
  sad: {
    icon: "cloudy-outline",
    color: "#9CA3AF",
    message: "It's okay to take it slow 💙",
  },
  tired: {
    icon: "bed-outline",
    color: "#A78BFA",
    message: "Rest and recharge 💤",
  },
  default: {
    icon: "sparkles-outline",
    color: "#22C55E",
    message: "Keep shining ✨",
  },
};

export default function MoodWidget({ mood }: MoodWidgetProps) {
  const config = moodConfig[mood.toLowerCase()] || moodConfig.default;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 300 }}
      style={[styles.card, { borderColor: config.color + "40" }]} // subtle accent border
    >
      <View style={styles.row}>
        <View style={styles.textSection}>
          <Text className="text-xs font-medium text-gray-500">
            Today’s Mood
          </Text>
          <Text
            className="font-bold mt-1"
            style={{ fontSize: 22, color: "#030303" }}
          >
            {mood}
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: "#6B7280" }}
            numberOfLines={1}
          >
            {config.message}
          </Text>
        </View>

        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: config.color + "20" },
          ]}
        >
          <Ionicons name={config.icon} size={28} color={config.color} />
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
