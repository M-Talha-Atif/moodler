// src/features/onboarding/components/ChatBubble.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";

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
      {/* Chat Bubble */}
      <View
        style={[
          styles.bubble,
          isAI ? styles.aiBubble : styles.userBubble,
        ]}
      >
        <Text
          variant="body"
          style={isAI ? styles.aiText : styles.userText}
        >
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
    paddingHorizontal: 24,
  },
  leftAlign: {
    justifyContent: "flex-start",
  },
  rightAlign: {
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "80%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  aiBubble: {
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: "#030303",
    borderTopRightRadius: 4,
  },
  aiText: {
    color: "#030303",
  },
  userText: {
    color: "#EFEFE7",
  },
});
