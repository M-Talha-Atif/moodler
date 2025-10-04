// src/modules/dailyCheckIn/screens/DailyCheckInScreen.tsx
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef } from "react";
import { MotiView } from "moti";
import MoodWheel from "../components/MoodWheel";
import VoiceRecorder from "../components/VoiceRecorder";
import TextAreaWithSentiment from "../components/TextAreaWithSentiment";
import PhotoUpload from "../components/PhotoUpload";
import SubmitButton from "../components/SubmitButton";
import { useMoodLog } from "../hooks/useMoodLog";
import { useRouter } from "expo-router";
import { useDailyCheckInStore } from "../store/useDailyCheckInStore";


const { width } = Dimensions.get("window");

export default function DailyCheckInScreen() {
  const [mood, setMood] = useState<any>(null);
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<any>(null); // { uri, type, name } | null
  const [voice, setVoice] = useState<any>(null); // { uri, type, name } | null
  const router = useRouter()
  const { setHasDailyCheckIn } = useDailyCheckInStore(); // ✅ store hook

  const scrollViewRef = useRef<ScrollView>(null);
  const { submitMoodLog, isLoading } = useMoodLog();

  const horizontalPadding = width > 768 ? 32 : width > 480 ? 16 : 12;
  const verticalSpacing = width > 768 ? 24 : width > 480 ? 16 : 12;

  const handleSubmit = async () => {
    if (!mood) return Alert.alert("Please select a mood!");

    try {
      const textSentiment = note.includes("happy")
        ? "positive"
        : note.includes("sad") || note.includes("angry")
          ? "negative"
          : "neutral";

      const payload = {
        moodLabel: mood.emotion,
        note: note || null,
        textSentiment,
        photo, // photo object with uri, type, name
        voice, // voice object with uri, type, name
        photoEmotion: null,
        voiceSentiment: null,
      };

      await submitMoodLog(payload);

      setHasDailyCheckIn(true); 

      Alert.alert("Success", "Your daily check-in has been saved!", [
      {
        text: "OK",
        onPress: () => router.replace("/(tabs)/(user)"), // ✅ navigate after OK
      },
    ]);
    } catch (err) {
      console.error("Mood log submit error:", err);
      Alert.alert("Error", "Failed to submit check-in");
    }
  };

  const isFormValid = mood && (photo || voice);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f9fafb" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalSpacing,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 w-full max-w-3xl self-center space-y-4">
          {/* Header */}
          <MotiView
            from={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 600 }}
            className="items-center mb-4"
          >
            <Text className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
              Daily Check-In
            </Text>
            <Text className="text-gray-600 text-sm md:text-base text-center">
              How are you feeling today?
            </Text>
          </MotiView>

          {/* Mood Picker */}
          <MotiView
            from={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 500 }}
            className="bg-white p-3 md:p-5 rounded-2xl shadow-sm"
          >
            <Text className="text-base md:text-lg font-semibold text-gray-900 mb-3">
              Select Your Mood
            </Text>
            <MoodWheel selected={mood} onSelect={setMood} screenWidth={width} />

            {mood && (
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="items-center p-3 rounded-xl bg-gray-100 mt-3"
              >
                <Text className="text-3xl md:text-4xl">{mood.emoji}</Text>
                <Text className="font-semibold capitalize mt-1 text-gray-800 text-sm md:text-base">
                  {mood.emotion}
                </Text>
              </MotiView>
            )}
          </MotiView>

          {/* Voice Recorder */}
          <View style={{ marginTop: verticalSpacing }}>
            <VoiceRecorder
              onRecordingComplete={(file) => {
                setVoice(file);
                setTimeout(
                  () => scrollViewRef.current?.scrollToEnd({ animated: true }),
                  300,
                );
              }}
              screenWidth={width}
            />
          </View>

          {/* Text Area */}
          <View style={{ marginTop: verticalSpacing }}>
            <TextAreaWithSentiment value={note} onChange={setNote} />
          </View>

          {/* Photo Upload */}
          <View style={{ marginTop: verticalSpacing }}>
            <PhotoUpload
              photo={photo}
              onUpload={(file) => {
                setPhoto(file);
                setTimeout(
                  () => scrollViewRef.current?.scrollToEnd({ animated: true }),
                  300,
                );
              }}
              onRemove={() => setPhoto(null)}
              screenWidth={width}
            />
          </View>
        </View>
      </ScrollView>

      {/* Submit Button always visible at bottom */}
      <View style={{ padding: 16, marginBottom: 32, backgroundColor: "white" }}>
        <SubmitButton
          onSubmit={handleSubmit}
          loading={isLoading}
          disabled={!isFormValid}
        >
          Complete Check-In
        </SubmitButton>
      </View>
    </KeyboardAvoidingView>
  );
}
