// src/modules/dailyCheckIn/components/TextAreaWithSentiment.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Text } from "@/components/ui/text";

export default function TextAreaWithSentiment({ value, onChange }) {
  const getSentiment = (text: string) => {
    if (text.match(/sad|angry|bad/)) return "negative";
    if (text.match(/happy|good|great/)) return "positive";
    return "neutral";
  };

  const sentiment = getSentiment(value.toLowerCase());
  const config = {
    positive: {
      bg: "#E6F9EE",
      border: "#16a34a",
      icon: "happy-outline",
      text: "You seem in good spirits 🌿",
    },
    negative: {
      bg: "#FEF2F2",
      border: "#FCA5A5",
      icon: "sad-outline",
      text: "It’s okay to feel that 💭",
    },
    neutral: {
      bg: "#EFF6FF",
      border: "#93C5FD",
      icon: "remove-circle-outline",
      text: "Balanced energy ⚖️",
    },
  }[sentiment];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reflect on your day 💬</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Write freely... how are you feeling today?"
        placeholderTextColor="#9CA3AF"
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        style={styles.input}
      />
      {value.length > 2 && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={[styles.sentiment, { backgroundColor: config.bg, borderColor: config.border }]}
        >
          <Ionicons name={config.icon} size={16} color={config.border} />
          <Text style={styles.sentimentText}>{config.text}</Text>
        </MotiView>
      )}
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
  title: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 16,
    color: "#030303",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 14,
    fontSize: 15,
    fontFamily: "Nunito",
    color: "#030303",
    minHeight: 120,
  },
  sentiment: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
  },
  sentimentText: {
    marginLeft: 8,
    fontFamily: "Nunito",
    fontWeight: "600",
    color: "#030303",
  },
});
