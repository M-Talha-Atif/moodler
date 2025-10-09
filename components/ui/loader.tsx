// Loader.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "./text";

interface LoaderProps {
  message?: string;
  size?: "small" | "large";
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  message = "Loading...",
  size = "small",
  color = "#030303",
}) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
    <Text variant="body" style={styles.message}>
      {message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  message: { marginTop: 8, color: "#030303", textAlign: "center" },
});
