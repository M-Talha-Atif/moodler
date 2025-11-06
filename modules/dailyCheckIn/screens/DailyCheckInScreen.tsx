import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import MoodWheel from "../components/MoodWheel";
import ExpressionInput from "../components/ExpressionInput";
import TextAreaWithSentiment from "../components/TextAreaWithSentiment";
import Button from "@/components/ui/button";
import { useDailyCheckInStore } from "../store/useDailyCheckInStore";
import { useMoodLog } from "../hooks/useMoodLog";
import { LogOut } from "lucide-react-native";
import { useAuthStore } from "@/store/useAuthStore";
import AlertDialog from "@/components/ui/alertDialog";
import { StatusBar } from "expo-status-bar";
import Header from "@/modules/common/Header";
import IconCard from "@/components/ui/iconCard";



export default function DailyCheckInScreen() {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState(null);
  const [voice, setVoice] = useState(null);
  const [buttonSubmitLoading, setButtonSubmitLoading] = useState(false);
  const { submitMoodLog, isLoading } = useMoodLog();
  const { setHasDailyCheckIn } = useDailyCheckInStore();
  const router = useRouter();

  const { logout } = useAuthStore();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    logout();
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };


  const handleSubmit = async () => {
    if (!mood) return Alert.alert("Please select your mood ❤️");
    if (!photo && !voice)
      return Alert.alert("Add either a photo or a short voice note 🎙️📸");

    const sentiment = note.match(/happy|good/)
      ? "positive"
      : note.match(/sad|angry/)
        ? "negative"
        : "neutral";

    const payload = { moodLabel: mood.emotion, note, textSentiment: sentiment, photo, voice };

    setButtonSubmitLoading(true);

    try {

      await submitMoodLog(payload);
      setHasDailyCheckIn(true);
      Alert.alert("✨ Check-In Complete", "Your reflection has been saved.", [
        { text: "Continue", onPress: () => router.replace("/(tabs)/(user)") },
      ]);
    } catch {
      setButtonSubmitLoading(false);
      Alert.alert("Oops!", "Something went wrong while saving your check-in.");
    }
    finally {
      setButtonSubmitLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.stickyHeader}>
        <Header
          title="Submit your mood vibes"
          showBackButton={false}
          rightIcon={
            <IconCard
              size={36}
              borderRadius={12}
              backgroundColor="#fff"
              shadow={true}
              onPress={handleLogout} // optional, can also use Header's onRightPress
            >
              <LogOut size={20} color="#DC2626" />
            </IconCard>
          }
          onRightPress={handleLogout} // optional if you already handle inside IconCard
        />
      </View>

      <StatusBar style="dark" backgroundColor="#FAFAF8" translucent={false} />



      <AlertDialog
        visible={showLogoutDialog}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
      <KeyboardAvoidingView
        style={styles.flex}
      >

        {/* 🪶 Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >

          {/* Mood Selection */}
          <MotiView from={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} delay={100}>
            <MoodWheel selected={mood} onSelect={setMood} />
          </MotiView>

          {/* Expression Input */}
          <MotiView from={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} delay={200}>
            <ExpressionInput
              photo={photo}
              voice={voice}
              onPhotoUpload={(file) => {
                setPhoto(file);
                setVoice(null);
              }}
              onPhotoRemove={() => setPhoto(null)}
              onVoiceComplete={(audio) => {
                setVoice(audio);
                setPhoto(null);
              }}
            />
          </MotiView>

          {/* Reflection Input */}
          <MotiView from={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} delay={300}>
            <TextAreaWithSentiment value={note} onChange={setNote} />
          </MotiView>

          {/* Spacer to prevent overlap */}
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* 🪷 Sticky Button */}
        <View style={styles.stickyButtonWrapper}>
          <Button
            title={buttonSubmitLoading ? "Submitting your vibes.." : "Submit your mood vibe"}
            onPress={handleSubmit}
            disabled={!mood || (!photo && !voice)}
            backgroundColor="#030303"
            textColor="#EFEFE7"
            fontFamily="Nunito"
            fontWeight="700"
            fontSize={15}
            height={48}
            width="100%"
            borderRadius={12}
            style={styles.shadow}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FAFAF8",
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 16,
    gap: 24,
  },
  headerTitle: {
    fontFamily: "Nunito",
    fontWeight: "800",
    fontSize: 22,
    color: "#030303",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },
  stickyButtonWrapper: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
