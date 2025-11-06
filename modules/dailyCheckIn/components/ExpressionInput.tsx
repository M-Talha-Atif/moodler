// src/modules/dailyCheckIn/components/ExpressionInput.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { MotiView } from "moti";
import PhotoUpload from "./PhotoUpload";
import VoiceRecorder from "./VoiceRecorder";

export default function ExpressionInput({ photo, voice, onPhotoUpload, onPhotoRemove, onVoiceComplete }) {
  const [mode, setMode] = useState(photo ? "photo" : voice ? "voice" : "photo");

  const toggleMode = () => setMode((m) => (m === "photo" ? "voice" : "photo"));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Express Yourself</Text>
        <TouchableOpacity style={styles.toggle} onPress={toggleMode}>
          <Ionicons
            name={mode === "photo" ? "mic-outline" : "image-outline"}
            size={16}
            color="#030303"
          />
          <Text style={styles.toggleText}>{mode === "photo" ? "Use Voice" : "Use Photo"}</Text>
        </TouchableOpacity>
      </View>

      <MotiView
        key={mode}
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 300 }}
      >
        {mode === "photo" ? (
          <PhotoUpload photo={photo} onUpload={onPhotoUpload} onRemove={onPhotoRemove} />
        ) : (
          <VoiceRecorder onResult={onVoiceComplete} />
        )}
      </MotiView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  heading: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 16,
    color: "#030303",
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EFEFE7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  toggleText: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: 13,
    color: "#030303",
  },
});
