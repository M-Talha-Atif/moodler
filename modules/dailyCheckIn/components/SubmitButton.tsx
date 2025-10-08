// src/modules/dailyCheckIn/components/SubmitButton.tsx
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import Button from "@/components/ui/button";

export default function SubmitButton({ onPress, loading, disabled, title }) {
  return (
    <View style={{ marginTop: 24 }}>
      <Button
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          styles.button,
          { backgroundColor: disabled ? "#9CA3AF" : "#030303" },
        ]}
      >
        {loading ? <ActivityIndicator color="#EFEFE7" /> : title}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
