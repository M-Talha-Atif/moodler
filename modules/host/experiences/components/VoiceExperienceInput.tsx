import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Alert, Dimensions } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import { Text } from "@/components/ui/text";

interface VoiceExperienceInputProps {
  onResult: (res: { uri: string; type: string; name: string } | null) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const WAVEFORM_WIDTH = SCREEN_WIDTH * 0.8;

export default function VoiceExperienceInput({ onResult }: VoiceExperienceInputProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackPosition, setPlaybackPosition] = useState<number>(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const animationInterval = useRef<NodeJS.Timeout | null>(null);
  const playbackInterval = useRef<NodeJS.Timeout | null>(null);

  // Cleanup
  useEffect(() => {
    return () => {
      (async () => {
        try {
          await sound?.unloadAsync();
          await recording?.stopAndUnloadAsync();
        } catch {}
      })();
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
      if (playbackInterval.current) {
        clearInterval(playbackInterval.current);
      }
    };
  }, [sound, recording]);

  // Generate random audio levels for animation
  const updateAudioLevels = () => {
    const newLevels = Array.from({ length: 7 }, () => 
      Math.random() * 0.7 + 0.3 // Random levels between 0.3 and 1.0
    );
    setAudioLevels(newLevels);
  };

  // Generate simulated waveform data
  const generateWaveformData = () => {
    const dataPoints = 50; // Number of bars in waveform
    const data = Array.from({ length: dataPoints }, () => 
      Math.random() * 0.8 + 0.2 // Random heights for waveform
    );
    setWaveformData(data);
  };

  // Update playback position
  const updatePlaybackPosition = async () => {
    if (sound && isPlaying) {
      try {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPlaybackPosition(status.positionMillis);
        }
      } catch (error) {
        console.error("Error getting playback status:", error);
      }
    }
  };

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
      
      // Start animation interval
      animationInterval.current = setInterval(updateAudioLevels, 200);
      
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to start recording. Try again.");
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      // Clear animation interval
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
        animationInterval.current = null;
      }
      setAudioLevels([]);

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (!uri) return;

      const { sound, status } = await recording.createNewLoadedSoundAsync();
      setSound(sound);
      const durationSeconds = Math.round(status.durationMillis / 1000);
      setDuration(durationSeconds);
      setFileUri(uri);
      onResult({ uri, type: "audio/m4a", name: "voice.m4a" });
      setRecording(null);
      
      // Generate waveform data after recording
      generateWaveformData();
      
      // Set up playback listener
      sound.setOnPlaybackStatusUpdate(playbackStatusUpdate);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to stop recording. Try again.");
    }
  };

  const playbackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPlaybackPosition(0);
        if (playbackInterval.current) {
          clearInterval(playbackInterval.current);
          playbackInterval.current = null;
        }
      }
    }
  };

  const togglePlayPause = async () => {
    try {
      if (!sound) return;

      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
        if (playbackInterval.current) {
          clearInterval(playbackInterval.current);
          playbackInterval.current = null;
        }
      } else {
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });
        await sound.playAsync();
        setIsPlaying(true);
        
        // Start updating playback position
        playbackInterval.current = setInterval(updatePlaybackPosition, 100);
      }
    } catch {
      Alert.alert("Error", "Unable to play/pause audio.");
    }
  };

  const seekAudio = async (position: number) => {
    try {
      if (!sound) return;

      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        await sound.setPositionAsync(position);
        setPlaybackPosition(position);
      }
    } catch (error) {
      console.error("Error seeking audio:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (playbackInterval.current) {
        clearInterval(playbackInterval.current);
        playbackInterval.current = null;
      }
      await sound?.unloadAsync();
    } catch {}
    setSound(null);
    setFileUri(null);
    setDuration(0);
    setIsPlaying(false);
    setPlaybackPosition(0);
    setWaveformData([]);
    onResult(null);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateSeekPosition = (event: any) => {
    const { locationX } = event.nativeEvent;
    const seekPercentage = locationX / WAVEFORM_WIDTH;
    const newPosition = seekPercentage * (duration * 1000); // Convert duration to milliseconds
    return Math.max(0, Math.min(newPosition, duration * 1000));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tell us about what it will do, where, when, for which people</Text>

      {!fileUri ? (
        <View style={{ alignItems: "center" }}>
          {/* Improved Animated Wave */}
          <AnimatePresence>
            {recording && (
              <View style={styles.waveContainer}>
                {[...Array(7)].map((_, i) => (
                  <MotiView
                    key={i}
                    from={{ 
                      scaleY: 0.2, 
                      opacity: 0.3,
                      backgroundColor: "#030303"
                    }}
                    animate={{
                      scaleY: audioLevels[i] || [0.4, 0.8, 1.2, 0.6],
                      opacity: [0.6, 1, 0.8, 0.5],
                      backgroundColor: ["#030303", "#444", "#030303"],
                    }}
                    transition={{
                      duration: 600 + Math.random() * 400,
                      delay: i * 80,
                      loop: true,
                      type: "timing",
                    }}
                    style={[
                      styles.waveBar,
                      {
                        height: 24 + Math.sin(i) * 8, // Varying heights
                      }
                    ]}
                  />
                ))}
              </View>
            )}
          </AnimatePresence>

          {/* Recording Status */}
          {recording && (
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={styles.recordingStatus}
            >
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording...</Text>
            </MotiView>
          )}

          {/* Mic Button */}
          <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
            style={[styles.micButton, recording && styles.activeMic]}
          >
            <MotiView
              animate={{ 
                scale: recording ? [1, 1.1, 1] : 1,
              }}
              transition={{ 
                loop: recording, 
                duration: 2000,
                type: "timing" 
              }}
            >
              <Ionicons
                name={recording ? "stop" : "mic"}
                size={34}
                color={recording ? "#FAFAF8" : "#030303"}
              />
            </MotiView>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.playbackContainer}>
          {/* Waveform Display */}
          <TouchableOpacity 
            style={styles.waveformContainer}
            activeOpacity={0.8}
            onPress={(event) => {
              const newPosition = calculateSeekPosition(event);
              seekAudio(newPosition);
            }}
          >
            {waveformData.map((height, index) => {
              const barPosition = (index / waveformData.length) * (duration * 1000);
              const isActive = playbackPosition >= barPosition;
              
              return (
                <View
                  key={index}
                  style={[
                    styles.waveformBar,
                    {
                      height: height * 30 + 5, // Scale height
                      backgroundColor: isActive ? "#030303" : "#E8E8E6",
                    }
                  ]}
                />
              );
            })}
            
            {/* Playback Progress Indicator */}
            <View 
              style={[
                styles.progressIndicator,
                {
                  left: `${(playbackPosition / (duration * 1000)) * 100}%`,
                }
              ]} 
            />
          </TouchableOpacity>

          {/* Time Display */}
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(playbackPosition)}</Text>
            <Text style={styles.timeText}>{formatTime(duration * 1000)}</Text>
          </View>

          {/* Playback Controls */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.playPauseBtn} 
              onPress={togglePlayPause}
            >
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={24} 
                color="#FAFAF8" 
              />
              <Text style={[styles.actionText, { color: "#FAFAF8" }]}>
                {isPlaying ? "Pause" : "Play"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.deleteBtn]}
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={22} color="#FAFAF8" />
              <Text style={[styles.actionText, { color: "#FAFAF8" }]}>Delete</Text>
            </TouchableOpacity>
          </View>
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
    transform: [{ scale: 1.05 }],
  },
  waveContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 40,
    marginBottom: 16,
    gap: 4,
  },
  waveBar: {
    width: 5,
    borderRadius: 3,
    backgroundColor: "#030303",
  },
  recordingStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(3, 3, 3, 0.05)",
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DC2626",
    marginRight: 6,
  },
  recordingText: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: 12,
    color: "#666",
  },
  playbackContainer: {
    alignItems: "center",
    width: "100%",
  },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: WAVEFORM_WIDTH,
    height: 40,
    marginBottom: 8,
    paddingHorizontal: 4,
    position: "relative",
  },
  waveformBar: {
    flex: 1,
    marginHorizontal: 1,
    borderRadius: 1,
    minHeight: 5,
  },
  progressIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "#DC2626",
    zIndex: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WAVEFORM_WIDTH,
    marginBottom: 16,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "85%",
    marginTop: 8,
  },
  playPauseBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#030303",
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
});