// src/modules/dailyCheckIn/components/VoiceRecorder.tsx
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";

interface VoiceRecorderProps {
  onRecordingComplete: (
    audio: { uri: string; type: string; name: string } | null,
  ) => void;
}

export default function VoiceRecorder({
  onRecordingComplete,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const screenWidth = Dimensions.get("window").width;
  const buttonHeight = screenWidth > 768 ? 60 : screenWidth > 480 ? 50 : 45;
  const iconSize = screenWidth > 768 ? 28 : screenWidth > 480 ? 24 : 20;
  const fontSize = screenWidth > 768 ? 16 : screenWidth > 480 ? 14 : 12;
  const buttonRadius = screenWidth > 768 ? 20 : 16;

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      setRecording(recording);
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(
        () => setRecordingTime((t) => t + 1),
        1000,
      );
    } catch (err) {
      console.error("Failed to start recording", err);
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

      const uri = recording.getURI();
      setAudioUri(uri);

      if (uri) {
        const file = {
          uri,
          type: "audio/m4a",
          name: `voice-${Date.now()}.m4a`,
        };
        onRecordingComplete(file);
      }

      setRecording(null);
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const playPauseAudio = async () => {
    if (!audioUri) return;

    try {
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
    } catch (err) {
      console.error("Playback error:", err);
    }
  };

  const removeAudio = async () => {
    if (soundRef.current) await soundRef.current.unloadAsync();
    setAudioUri(null);
    setIsPlaying(false);
    onRecordingComplete(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <MotiView
      style={{
        padding: screenWidth > 768 ? 24 : 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "#fff",
        marginVertical: 12,
      }}
      from={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 500, delay: 100 }}
    >
      <Text
        style={{
          fontSize: fontSize + 2,
          fontWeight: "600",
          color: "#111827",
          marginBottom: 8,
        }}
      >
        Voice Note
      </Text>

      {!audioUri ? (
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: buttonHeight,
            borderRadius: buttonRadius,
            backgroundColor: isRecording ? "#ef4444" : "#3b82f6",
          }}
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={iconSize}
            color="white"
          />
          <Text style={{ color: "white", fontSize, marginLeft: 8 }}>
            {isRecording
              ? `Stop (${formatTime(recordingTime)})`
              : "Record Voice"}
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
            borderRadius: buttonRadius,
            backgroundColor: "#f3f4f6",
          }}
        >
          <TouchableOpacity
            onPress={playPauseAudio}
            style={{
              padding: 6,
              backgroundColor: "#3b82f6",
              borderRadius: 999,
              marginRight: 8,
            }}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={20}
              color="white"
            />
          </TouchableOpacity>

          <Text style={{ fontSize, flex: 1, textAlign: "center" }}>
            {formatTime(recordingTime)}
          </Text>

          <TouchableOpacity
            onPress={removeAudio}
            style={{
              padding: 6,
              backgroundColor: "#ef4444",
              borderRadius: 999,
            }}
          >
            <Ionicons name="close" size={16} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </MotiView>
  );
}
