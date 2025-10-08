// src/modules/dailyCheckIn/screens/DailyCheckInScreen.tsx
import {
  View,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from "react-native";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import IconCard from "@/components/ui/iconCard";
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
import { Text } from "@/components/ui/text";
import BottomSheet from "@/components/ui/bottomSheet";
import { Modalize } from "react-native-modalize";
import { Icon } from "lucide-react-native";
import Card from "@/components/ui/card";
import Separator from "@/components/ui/separator";
import SearchBar from "@/components/ui/searchBar";
import ChipSelector from "@/components/ui/chipSelector";
import DatePicker from "@/components/ui/datePicker";
import ProgressBar from "@/components/ui/progressBar";
import ImageCard from "@/components/ui/imageCard";
import AlertDialog from "@/components/ui/alertDialog";
import { GestureHandlerRootView } from "react-native-gesture-handler";



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

  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [showAlert, setShowAlert] = useState(true);

  const [showDialog, setShowDialog] = useState(false);

  const [visible, setVisible] = useState(false);

  const sheetRef = useRef<Modalize>(null);

  return (

    <GestureHandlerRootView>

   
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


          <AlertDialog
            visible={showDialog}
            title="Delete Experience?"
            message="Are you sure you want to delete this experience? This action cannot be undone."
            confirmText="Yes, Delete"
            cancelText="Cancel"
            onConfirm={() => {
              setShowDialog(false);
              console.log("Deleted");
            }}
            onCancel={() => setShowDialog(false)}
          />;

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9fafb",
            }}
          >
            <TouchableOpacity
              onPress={() => sheetRef.current?.open()}
              style={{
                backgroundColor: "#030303",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", fontFamily: "Nunito" }}>
                Open Bottom Sheet
              </Text>
            </TouchableOpacity>

            <BottomSheet ref={sheetRef} title="Experience Details">
              <Text
                style={{
                  fontFamily: "Nunito",
                  fontSize: 16,
                  color: "#030303",
                  textAlign: "center",
                }}
              >
                Add any custom content or actions here.
              </Text>

              <TouchableOpacity
                onPress={() => sheetRef.current?.close()}
                style={{
                  marginTop: 20,
                  backgroundColor: "#030303",
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontFamily: "Nunito",
                    fontWeight: "600",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </BottomSheet>
          </View>




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
     </GestureHandlerRootView>
  );
}
