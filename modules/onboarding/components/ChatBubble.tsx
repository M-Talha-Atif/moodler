// src/features/onboarding/components/ChatBubble.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ChatBubbleProps {
  sender: "ai" | "user";
  text: string;
}

export default function ChatBubble({ sender, text }: ChatBubbleProps) {
  const isAI = sender === "ai";

  return (
    <View
      style={[
        styles.row,
        isAI ? styles.leftAlign : styles.rightAlign,
      ]}
    >
      {/* 🤖 AI Avatar Icon */}
      {isAI && (
        <View style={styles.iconWrapper}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#030303" />
        </View>
      )}

      {/* 💬 Chat Bubble */}
      <View
        style={[
          styles.bubble,
          isAI ? styles.aiBubble : styles.userBubble,
        ]}
      >
        <Text style={[styles.text, isAI ? styles.aiText : styles.userText]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 16,
    paddingHorizontal: 24, // consistent with content margin
  },
  leftAlign: {
    justifyContent: "flex-start",
  },
  rightAlign: {
    justifyContent: "flex-end",
  },
  iconWrapper: {
    justifyContent: "flex-end",
    marginRight: 8,
    paddingBottom: 4,
  },
  bubble: {
    maxWidth: "80%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  aiBubble: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: "#030303",
    borderColor: "#030303",
    borderTopRightRadius: 4,
  },
  text: {
    fontFamily: "Nunito",
    fontSize: 15,
    lineHeight: 22,
  },
  aiText: {
    color: "#030303",
  },
  userText: {
    color: "#EFEFE7",
  },
});
