import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

interface VoiceExperienceInputProps {
  onResult: (res: { uri: string; type: string; name: string } | null) => void;
}

export default function VoiceExperienceInput({ onResult }: VoiceExperienceInputProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      (async () => {
        try {
          await sound?.unloadAsync();
          await recording?.stopAndUnloadAsync();
        } catch { }
      })();
    };
  }, [sound, recording]);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission required", "Please allow microphone access.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.error("Start recording failed:", err);
      Alert.alert("Error", "Unable to start recording. Try again.");
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      if (recording) {
        const status = await recording.getStatusAsync();
        if (status.isRecording) {
          await recording.stopAndUnloadAsync();
        }
      }

      const uri = recording.getURI();
      if (!uri) {
        Alert.alert("Error", "Recording failed. Please try again.");
        return;
      }

      // Load sound from file manually (fixes "sound not loaded" issue)
      const { sound: newSound, status } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      setDuration(Math.round((status.durationMillis || 0) / 1000));
      setFileUri(uri);
      onResult({ uri, type: "audio/m4a", name: "voice.m4a" });

      setRecording(null);
    } catch (err) {
      console.error("Stop recording failed:", err);
      Alert.alert("Error", "Unable to stop recording. Try again.");
    }
  };

  const playSound = async () => {
    try {
      if (!fileUri) {
        Alert.alert("No Audio", "Please record audio first.");
        return;
      }

      // Reload if sound was unloaded
      let soundToPlay = sound;
      if (!soundToPlay) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: fileUri });
        setSound(newSound);
        soundToPlay = newSound;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      await soundToPlay.replayAsync();
      setIsPlaying(true);

      soundToPlay.setOnPlaybackStatusUpdate((status) => {
        if ((status as any).didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.error("Playback error:", err);
      Alert.alert("Playback error", "Unable to play the audio.");
    }
  };

  const handleDelete = async () => {
    try {
      await sound?.unloadAsync();
    } catch { }
    setSound(null);
    setFileUri(null);
    setDuration(0);
    setIsPlaying(false);
    onResult(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Record your mood vibes via voice </Text>

      {!fileUri ? (
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={[styles.micButton, recording && styles.activeMic]}
        >
          <Ionicons
            name={recording ? "stop" : "mic"}
            size={34}
            color={recording ? "#FAFAF8" : "#030303"}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={playSound}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={22} color="#030303" />
            <Text style={styles.actionText}>
              {isPlaying ? "Playing..." : "Play"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={22} color="#FAFAF8" />
            <Text style={[styles.actionText, { color: "#FAFAF8" }]}>Delete</Text>
          </TouchableOpacity>

          <Text style={styles.duration}>{duration}s</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: 14,
    color: "#030303",
    marginBottom: 10,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#030303",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAF8",
    elevation: 3,
  },
  activeMic: {
    backgroundColor: "#030303",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "85%",
    marginTop: 16,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#E8E8E6",
  },
  deleteBtn: {
    backgroundColor: "#DC2626",
  },
  actionText: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
  },
  duration: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
});
