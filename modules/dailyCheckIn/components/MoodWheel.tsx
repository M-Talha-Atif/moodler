// src/modules/dailyCheckIn/components/MoodWheel.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import { MotiView } from "moti";
import Separator from "@/components/ui/separator"; // ✅ Reusable separator

const moods = [
  { emoji: "😄", emotion: "Happy" },
  { emoji: "😌", emotion: "Calm" },
  { emoji: "😐", emotion: "Neutral" },
  { emoji: "😢", emotion: "Sad" },
  { emoji: "😠", emotion: "Angry" },
  { emoji: "😲", emotion: "Surprised" },
];

export default function MoodWheel({ selected, onSelect }) {
  const width = Dimensions.get("window").width;
  const buttonSize = width > 480 ? 72 : 64;

  // Split moods into two rows
  const topRow = moods.slice(0, 3);
  const bottomRow = moods.slice(3);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select your current mood</Text>

      {/* Top Row */}
      <View style={styles.row}>
        {topRow.map((mood, i) => {
          const active = selected?.emoji === mood.emoji;
          return (
            <MotiView
              key={mood.emoji}
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 60 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onSelect(mood)}
                style={[
                  styles.moodButton,
                  {
                    width: buttonSize,
                    height: buttonSize,
                    backgroundColor: active ? "#030303" : "#FFFFFF",
                    borderColor: active ? "#030303" : "#E5E7EB",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.emoji,
                    { color: active ? "#EFEFE7" : "#030303" },
                  ]}
                >
                  {mood.emoji}
                </Text>
                <Text
                  style={[
                    styles.label,
                    { color: active ? "#EFEFE7" : "#030303" },
                  ]}
                >
                  {mood.emotion}
                </Text>
              </TouchableOpacity>
            </MotiView>
          );
        })}
      </View>

      {/* Separator */}
      <Separator
        orientation="horizontal"
        thickness={1}
        color="#E5E7EB"
        length="85%"
        margin={16}
      />

      {/* Bottom Row */}
      <View style={styles.row}>
        {bottomRow.map((mood, i) => {
          const active = selected?.emoji === mood.emoji;
          return (
            <MotiView
              key={mood.emoji}
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 60 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onSelect(mood)}
                style={[
                  styles.moodButton,
                  {
                    width: buttonSize,
                    height: buttonSize,
                    backgroundColor: active ? "#030303" : "#FFFFFF",
                    borderColor: active ? "#030303" : "#E5E7EB",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.emoji,
                    { color: active ? "#EFEFE7" : "#030303" },
                  ]}
                >
                  {mood.emoji}
                </Text>
                <Text
                  style={[
                    styles.label,
                    { color: active ? "#EFEFE7" : "#030303" },
                  ]}
                >
                  {mood.emotion}
                </Text>
              </TouchableOpacity>
            </MotiView>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
  },
  heading: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 16,
    color: "#030303",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  moodButton: {
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 4,
  },
});
