// src/modules/dailyCheckIn/components/VoiceRecorder.tsx

import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MotiView, MotiText } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button"; // ✅ Reusable Button

interface VoiceRecorderProps {
  onRecordingComplete: (
    audio: { uri: string; type: string; name: string } | null
  ) => void;
}

export default function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
    } catch {
      alert("Failed to start recording");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    if (uri) {
      onRecordingComplete({
        uri,
        type: "audio/m4a",
        name: `voice-${Date.now()}.m4a`,
      });
      setAudioUri(uri);
    }
    setRecording(null);
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const playPauseAudio = async () => {
    if (!audioUri) return;
    if (isPlaying && soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
      return;
    }
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          soundRef.current?.unloadAsync();
          soundRef.current = null;
        }
      });
      setIsPlaying(true);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const removeAudio = async () => {
    if (soundRef.current) await soundRef.current.unloadAsync();
    setAudioUri(null);
    setIsPlaying(false);
    onRecordingComplete(null);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 400 }}
      style={styles.wrapper}
    >
      {!audioUri ? (
        <View>
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: isRecording ? 1.05 : 1 }}
            transition={{
              loop: isRecording,
              type: "timing",
              duration: 700,
            }}
          >
            <Button
              title={
                isRecording
                  ? `Recording ${formatTime(recordingTime)}`
                  : "Start Recording"
              }
              onPress={isRecording ? stopRecording : startRecording}
              backgroundColor={isRecording ? "#dc2626" : "#030303"}
              textColor="#EFEFE7"
              width="100%"
              height={48}
              borderRadius={12}
              fontSize={14}
              fontWeight="600"
              lineHeight={18}
            />
          </MotiView>
        </View>
      ) : (
        // 🎧 Playback UI
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 300 }}
          style={styles.playbackCard}
        >
          <View style={styles.playbackRow}>
            <TouchableOpacity
              style={styles.circleBtn}
              onPress={playPauseAudio}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={18}
                color="#EFEFE7"
              />
            </TouchableOpacity>

            <MotiText
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 150 }}
              style={styles.timerText}
            >
              {formatTime(recordingTime)}
            </MotiText>

            <TouchableOpacity
              style={[styles.circleBtn, { backgroundColor: "#ef4444" }]}
              onPress={removeAudio}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={16} color="#EFEFE7" />
            </TouchableOpacity>
          </View>
        </MotiView>
      )}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
      backgroundColor: "#F9FAFB",
    padding: 16,
  },
  recordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 48,
    gap: 10,
  },
  playbackCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  playbackRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circleBtn: {
    backgroundColor: "#030303",
    padding: 8,
    borderRadius: 999,
  },
  timerText: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: 14,
    color: "#030303",
  },
});
