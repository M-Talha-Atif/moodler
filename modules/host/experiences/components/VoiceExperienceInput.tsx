import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  ScrollView 
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import { Text } from "@/components/ui/text";
import Toast from "react-native-toast-message";

interface VoiceExperienceInputProps {
  onResult: (res: { uri: string; type: string; name: string } | null) => void;
  onRecordingComplete?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function VoiceExperienceInput({ 
  onResult, 
  onRecordingComplete 
}: VoiceExperienceInputProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [showTips, setShowTips] = useState<boolean>(true);
  
  const animationInterval = useRef<NodeJS.Timeout | null>(null);
  const durationInterval = useRef<NodeJS.Timeout | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const startTimeRef = useRef<number>(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      (async () => {
        try {
          if (recordingRef.current) {
            await recordingRef.current.stopAndUnloadAsync();
          }
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
      
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
    };
  }, []);

  // Generate random audio levels for animation
  const updateAudioLevels = () => {
    const newLevels = Array.from({ length: 9 }, () => 
      Math.random() * 0.7 + 0.3
    );
    setAudioLevels(newLevels);
  };

  const startRecording = async () => {
    try {
      console.log("Requesting permissions...");
      
      // Request microphone permissions
      const { status, granted } = await Audio.requestPermissionsAsync();
      
      if (!granted) {
        Toast.show({
          type: "error",
          text1: "Microphone Access Required",
          text2: "Please enable microphone access in your device settings",
          position: "top",
        });
        return;
      }

      console.log("Permission granted, configuring audio mode...");

      // Configure audio mode for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      console.log("Starting recording...");

      // Start recording
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      console.log("Recording started successfully");

      // Store recording in both state and ref
      setRecording(newRecording);
      recordingRef.current = newRecording;
      
      // Reset and start duration tracking
      startTimeRef.current = Date.now();
      setRecordingDuration(0);
      setShowTips(false);
      
      // Start animation interval for visual feedback
      animationInterval.current = setInterval(updateAudioLevels, 150);
      
      // Start duration counter
      durationInterval.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setRecordingDuration(elapsed);
      }, 100); // Update more frequently for accuracy
      
      Toast.show({
        type: "success",
        text1: "Recording Started",
        text2: "Speak clearly about your experience",
        position: "top",
        visibilityTime: 2000,
      });
      
    } catch (err) {
      console.error("Error starting recording:", err);
      Toast.show({
        type: "error",
        text1: "Recording Error",
        text2: "Unable to start recording. Please try again.",
        position: "top",
      });
    }
  };

  const stopRecording = async () => {
    try {
      console.log("Stopping recording...");
      
      if (!recordingRef.current) {
        console.log("No recording found");
        return;
      }

      // Calculate actual duration before stopping
      const actualDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      console.log("Actual recording duration:", actualDuration, "seconds");

      // Clear intervals first
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
        animationInterval.current = null;
      }
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
        durationInterval.current = null;
      }
      
      setAudioLevels([]);

      // Stop recording and get URI
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      
      console.log("Recording stopped, URI:", uri);
      
      if (!uri) {
        Toast.show({
          type: "error",
          text1: "Recording Error",
          text2: "Failed to save your recording. Please try again.",
          position: "top",
        });
        setRecording(null);
        recordingRef.current = null;
        setRecordingDuration(0);
        return;
      }

      // Check minimum duration using actual duration
      if (actualDuration < 3) {
        Toast.show({
          type: "error",
          text1: "Recording Too Short",
          text2: `Please record for at least 3 seconds. You recorded ${actualDuration} second(s).`,
          position: "top",
          visibilityTime: 3000,
        });
        setRecording(null);
        recordingRef.current = null;
        setRecordingDuration(0);
        return;
      }

      console.log("Recording valid, passing to parent");

      // Pass the audio file to parent
      onResult({ uri, type: "audio/m4a", name: "voice.m4a" });
      setRecording(null);
      recordingRef.current = null;
      
      Toast.show({
        type: "success",
        text1: "Recording Complete",
        text2: "Processing your experience...",
        position: "top",
        visibilityTime: 2000,
      });
      
      // Trigger completion callback to auto-submit
      if (onRecordingComplete) {
        onRecordingComplete();
      }
      
    } catch (err) {
      console.error("Error stopping recording:", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to stop recording. Please try again.",
        position: "top",
      });
      setRecording(null);
      recordingRef.current = null;
      setRecordingDuration(0);
    }
  };

  // Format duration as MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView 
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.iconContainer}>
          <Ionicons name="mic-circle" size={40} color="#030303" />
        </View>
        <Text style={styles.mainTitle}>Voice Recording Guide</Text>
        <Text style={styles.subtitle}>
          Describe your experience in your own words
        </Text>
      </View>

      {/* Tips Section - Show when not recording */}
      <AnimatePresence>
        {showTips && !recording && (
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ type: "timing", duration: 300 }}
            style={styles.tipsCard}
          >
            <View style={styles.tipsHeader}>
              <View style={styles.tipHeaderIcon}>
                <Ionicons name="bulb" size={18} color="#030303" />
              </View>
              <Text style={styles.tipsTitle}>What to Include</Text>
            </View>
            
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>1</Text>
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipLabel}>Experience Title</Text>
                  <Text style={styles.tipDescription}>
                    Give it a catchy name like "Sunset Yoga on the Beach"
                  </Text>
                </View>
              </View>

              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>2</Text>
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipLabel}>Description & Activities</Text>
                  <Text style={styles.tipDescription}>
                    Explain what guests will do and what makes it special
                  </Text>
                </View>
              </View>

              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>3</Text>
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipLabel}>Schedule & Duration</Text>
                  <Text style={styles.tipDescription}>
                    Mention start time, end time (e.g., 6 PM to 7 PM)
                  </Text>
                </View>
              </View>

              <View style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>4</Text>
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipLabel}>Target Audience</Text>
                  <Text style={styles.tipDescription}>
                    Who is this for? (Beginners, families, couples, etc.)
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.exampleBox}>
              <View style={styles.exampleHeader}>
                <Ionicons name="chatbox-ellipses" size={16} color="#030303" />
                <Text style={styles.exampleLabel}>Example:</Text>
              </View>
              <Text style={styles.exampleText}>
                "I want to host a sunset yoga session on Clifton Beach. It's a relaxing 
                one-hour class from 6 PM to 7 PM, perfect for beginners who want to unwind. 
                We'll do gentle poses with beautiful ocean views."
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.dismissTipsButton}
              onPress={() => setShowTips(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.dismissTipsText}>Got it, Let's Record</Text>
              <Ionicons name="arrow-forward" size={18} color="#FAFAF8" />
            </TouchableOpacity>
          </MotiView>
        )}
      </AnimatePresence>

      {/* Recording Interface */}
      <View style={styles.recordingSection}>
        {/* Animated Wave Visualization */}
        <AnimatePresence>
          {recording && (
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={styles.waveWrapper}
            >
              <View style={styles.waveContainer}>
                {[...Array(9)].map((_, i) => (
                  <MotiView
                    key={i}
                    from={{ 
                      scaleY: 0.3, 
                      opacity: 0.4,
                    }}
                    animate={{
                      scaleY: audioLevels[i] || [0.4, 0.9, 1.3, 0.7],
                      opacity: [0.6, 1, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 500 + Math.random() * 300,
                      delay: i * 60,
                      loop: true,
                      type: "timing",
                    }}
                    style={[
                      styles.waveBar,
                      {
                        height: 32 + Math.sin(i) * 12,
                      }
                    ]}
                  />
                ))}
              </View>
            </MotiView>
          )}
        </AnimatePresence>

        {/* Recording Status with Duration */}
        {recording && (
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.recordingStatus}
          >
            <View style={styles.recordingIndicator}>
              <MotiView
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ 
                  loop: true, 
                  duration: 1500,
                  type: "timing" 
                }}
                style={styles.recordingDot}
              />
              <Text style={styles.recordingText}>Recording</Text>
            </View>
            <Text style={styles.durationText}>{formatDuration(recordingDuration)}</Text>
          </MotiView>
        )}

        {/* Microphone Button */}
        <View style={styles.micButtonContainer}>
          <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
            style={[styles.micButton, recording && styles.activeMic]}
            activeOpacity={0.8}
          >
            <MotiView
              animate={{ 
                scale: recording ? [1, 1.08, 1] : 1,
              }}
              transition={{ 
                loop: recording, 
                duration: 2000,
                type: "timing" 
              }}
            >
              <Ionicons
                name={recording ? "stop" : "mic"}
                size={38}
                color={recording ? "#FAFAF8" : "#030303"}
              />
            </MotiView>
          </TouchableOpacity>
        </View>

        {/* Instruction Text */}
        {!recording ? (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 300 }}
            style={styles.instructionContainer}
          >
            <Text style={styles.instructionText}>
              Tap to start recording
            </Text>
            <Text style={styles.subInstructionText}>
              Speak clearly and include all 4 points
            </Text>
          </MotiView>
        ) : (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.instructionContainer}
          >
            <Text style={styles.recordingInstructionText}>
              Tap to stop recording
            </Text>
            <Text style={styles.recordingSubText}>
              Minimum 3 seconds required
            </Text>
          </MotiView>
        )}

        {/* Quick Tips While Recording */}
        {recording && recordingDuration < 15 && (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 1000 }}
            style={styles.quickTipBox}
          >
            <View style={styles.quickTipIcon}>
              <Ionicons name="information-circle" size={16} color="#030303" />
            </View>
            <Text style={styles.quickTipText}>
              Mention: title, activities, schedule, and audience
            </Text>
          </MotiView>
        )}
      </View>

      {/* Help Section */}
      {!recording && !showTips && (
        <TouchableOpacity 
          style={styles.helpButton}
          onPress={() => setShowTips(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="help-circle-outline" size={20} color="#030303" />
          <Text style={styles.helpButtonText}>View tips again</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Spacer */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EFEFE7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  mainTitle: {
    fontFamily: "Nunito",
    fontWeight: "800",
    fontSize: 20,
    color: "#030303",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  tipsCard: {
    width: "100%",
    backgroundColor: "#FAFAF8",
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    borderWidth: 2,
    borderColor: "#E8E8E6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E6",
  },
  tipHeaderIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EFEFE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  tipsTitle: {
    fontFamily: "Nunito",
    fontWeight: "800",
    fontSize: 16,
    color: "#030303",
  },
  tipsList: {
    marginBottom: 20,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 18,
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#030303",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    marginTop: 2,
  },
  tipNumberText: {
    fontFamily: "Nunito",
    fontWeight: "800",
    fontSize: 14,
    color: "#FAFAF8",
  },
  tipContent: {
    flex: 1,
    paddingTop: 2,
  },
  tipLabel: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 14,
    color: "#030303",
    marginBottom: 4,
  },
  tipDescription: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#666",
    lineHeight: 19,
  },
  exampleBox: {
    backgroundColor: "#EFEFE7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#030303",
  },
  exampleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  exampleLabel: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 13,
    color: "#030303",
    marginLeft: 6,
  },
  exampleText: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#444",
    lineHeight: 20,
    fontStyle: "italic",
  },
  dismissTipsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#030303",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dismissTipsText: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 15,
    color: "#FAFAF8",
    marginRight: 8,
  },
  recordingSection: {
    alignItems: "center",
    width: "100%",
  },
  waveWrapper: {
    marginBottom: 20,
  },
  waveContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 60,
    gap: 6,
  },
  waveBar: {
    width: 7,
    borderRadius: 4,
    backgroundColor: "#030303",
  },
  recordingStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#FAFAF8",
    borderWidth: 2,
    borderColor: "#030303",
    minWidth: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordingIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DC2626",
    marginRight: 8,
  },
  recordingText: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 14,
    color: "#030303",
  },
  durationText: {
    fontFamily: "Nunito",
    fontWeight: "800",
    fontSize: 16,
    color: "#030303",
  },
  micButtonContainer: {
    marginBottom: 20,
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#030303",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAF8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  activeMic: {
    backgroundColor: "#030303",
    borderColor: "#030303",
  },
  instructionContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  instructionText: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: "700",
    color: "#030303",
    textAlign: "center",
    marginBottom: 6,
  },
  subInstructionText: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
  recordingInstructionText: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: "700",
    color: "#030303",
    textAlign: "center",
    marginBottom: 6,
  },
  recordingSubText: {
    fontFamily: "Nunito",
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  quickTipBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFE7",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    maxWidth: SCREEN_WIDTH * 0.88,
  },
  quickTipIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FAFAF8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  quickTipText: {
    fontFamily: "Nunito",
    fontSize: 12,
    fontWeight: "600",
    color: "#030303",
    flex: 1,
    lineHeight: 17,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#EFEFE7",
  },
  helpButtonText: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "600",
    color: "#030303",
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 40,
  },
});