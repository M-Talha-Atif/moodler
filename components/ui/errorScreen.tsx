// ErrorScreen.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./text";
import Button from "./button";
import { Ionicons } from "@expo/vector-icons";

interface ErrorScreenProps {
  error?: string;
  onRetry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => (
  <View style={styles.container}>
    <Ionicons name="alert-circle-outline" size={42} color="#030303" />
    <Text variant="header" style={styles.title}>
      {error || "Something went wrong"}
    </Text>
    <Text variant="body" style={styles.subtitle}>
      Please check your connection and try again
    </Text>

    <Button title="Retry" onPress={onRetry} backgroundColor="#030303" textColor="#fff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: { marginTop: 12, textAlign: "center" },
  subtitle: { marginVertical: 8, textAlign: "center", color: "#6b7280" },
});
