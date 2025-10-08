// src/features/onboarding/components/OnboardingScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";

import ChatBubble from "./ChatBubble";
import QuestionInput from "./QuestionInput";
import ProgressFooter from "./ProgressFooter";
import onboardingQuestions from "../utils/onboardingQuestions";

import {
  startOnboarding,
  answerQuestion,
  setGoals,
  setActivities,
  completeOnboarding,
  getOnboardingStatus,
} from "../services/onboardingService";

import { useAuthStore } from "@/store/useAuthStore";
import ProgressBar from "@/components/ui/progressBar";
import ScreenWrapper from "@/components/ui/layout/screenWrapper";

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<any>(null);
  const [isBuildingProfile, setIsBuildingProfile] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user, token } = useAuthStore();
  const currentQuestion = onboardingQuestions[step];

  useEffect(() => {
    const initOnboarding = async () => {
      console.log("🚀 [Onboarding] Initializing...");
      try {
        if (!token) {
          console.warn("⚠️ No token found — redirecting to login.");
          setError("Please login first");
          setIsLoading(false);
          setTimeout(() => router.replace("/(auth)/login"), 2000);
          return;
        }

        if (user?.onboardingCompleted) {
          console.log("✅ User already completed onboarding — redirecting.");
          setIsLoading(false);
          router.replace("/(tabs)/(user)");
          return;
        }

        console.log("🌐 Fetching onboarding status...");
        const statusRes = await getOnboardingStatus();
        console.log("📡 Backend raw response:", statusRes);

        const status = statusRes?.data ?? { started: false, completed: false, currentStep: 0 };
        console.log("🧭 Parsed onboarding status:", status);

        if (status.completed) {
          console.log("🏁 Onboarding completed — redirecting.");
          setIsLoading(false);
          router.replace("/(tabs)/(user)");
          return;
        }

        if (!status.started) {
          console.log("🆕 Starting fresh onboarding...");
          await startOnboarding();
          setStep(0);
        } else {
          console.log(`🔄 Resuming onboarding at step ${status.currentStep ?? 0}`);
          setStep(status.currentStep ?? 0);
        }

        setInput([]);
      } catch (err) {
        console.error("💥 Failed to start onboarding:", err);
        setError("Failed to start onboarding");
      } finally {
        console.log("✅ [Onboarding] Initialization finished");
        setIsLoading(false);
      }
    };

    initOnboarding();
  }, []);

  const handleNext = async () => {
    if (!currentQuestion) {
      console.warn("⚠️ No current question found for step:", step);
      return;
    }

    console.log(`➡️ [Next] Handling question ${currentQuestion.id} (step ${step})`);
    console.log("📝 User input:", input);

    try {
      setError(null);

      if (currentQuestion.id === "goals") {
        await setGoals(Array.isArray(input) ? input : [input]);
      } else if (currentQuestion.id === "activities") {
        await setActivities(Array.isArray(input) ? input : [input]);
      } else if (currentQuestion.id === "community") {
        await answerQuestion(currentQuestion.id, input ? "true" : "false");
      } else {
        const normalized =
          Array.isArray(input) && input.length > 0 ? input[0] : input;
        await answerQuestion(currentQuestion.id, normalized);
      }

      console.log("✅ Answer saved successfully");
      setInput([]);

      if (step < onboardingQuestions.length - 1) {
        console.log("⏭️ Moving to next question...");
        setStep(step + 1);
      } else {
        console.log("⚙️ Starting profile build animation...");
        setIsBuildingProfile(true);

        const interval = setInterval(() => {
          setProgressValue((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              console.log("🏁 Profile build complete — marking onboarding done...");
              completeOnboarding()
                .then(() => {
                  console.log("✅ Onboarding completed successfully — navigating to tabs.");
                  setTimeout(() => router.replace("/(tabs)/(user)"), 500);
                })
                .catch((err) => {
                  console.error("❌ Failed to complete onboarding:", err);
                  setError("Failed to complete onboarding");
                  setIsBuildingProfile(false);
                });
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      }
    } catch (err) {
      console.error("💥 Something went wrong while answering:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (isLoading) {
    console.log("⏳ Still loading onboarding...");
    return (
      <ScreenWrapper scrollable={false} showLogo={false}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your onboarding...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  console.log("📋 Current Step:", step);
  console.log("🧠 Showing Question:", currentQuestion?.text);

  return (
    <ScreenWrapper
      scrollable
      showLogo={false}
      backgroundColor="#FAFAF8"
      contentStyle={{ justifyContent: "space-between", flexGrow: 1 }}
      footer={
        !isBuildingProfile &&
        currentQuestion && (
          <ProgressFooter
            step={step}
            total={onboardingQuestions.length}
            onNext={handleNext}
            disabled={
              currentQuestion.type === "chips"
                ? !input || (Array.isArray(input) && input.length === 0)
                : currentQuestion.type !== "toggle" && !input
            }
          />
        )
      }
    >
      {/* 🧭 Progress Header */}
      <View style={styles.header}>
        <ProgressBar
          progress={
            isBuildingProfile
              ? progressValue / 100
              : step / (onboardingQuestions.length - 1)
          }
          height={8}
          backgroundColor="#E8E8E6"
          fillColor="#030303"
          borderRadius={4}
        />
      </View>

      {/* 🚨 Error Banner */}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* 🌱 Main Body */}
      <View style={styles.content}>
        {isBuildingProfile ? (
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.buildingContainer}
          >
            <MotiView
              from={{ rotate: "0deg" }}
              animate={{ rotate: "360deg" }}
              transition={{ loop: true, type: "timing", duration: 2000 }}
            >
              <Text style={styles.emoji}>⚙️</Text>
            </MotiView>
            <Text style={styles.title}>Building your profile...</Text>
            <Text style={styles.subtitle}>
              We’re creating a space that feels just right for you ✨
            </Text>
            <Text style={styles.progressText}>{progressValue}%</Text>
          </MotiView>
        ) : (
          <MotiView
            key={step}
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.stepContainer}
          >
            <View style={styles.emojiWrapper}>
              <Text style={styles.emoji}>🤖</Text>
            </View>

            <ChatBubble sender="ai" text={currentQuestion?.text} />

            {currentQuestion && (
              <QuestionInput
                type={currentQuestion.type}
                value={input}
                onChange={setInput}
                id={currentQuestion.id}
                options={currentQuestion.options}
              />
            )}
          </MotiView>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 24, paddingTop: 16 },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 24,
    marginTop: 16,
  },
  errorText: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#B91C1C",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    marginTop: 24,
  },
  emojiWrapper: { alignItems: "center", marginBottom: 24 },
  emoji: { fontSize: 48 },
  buildingContainer: { alignItems: "center", gap: 16 },
  stepContainer: { gap: 32 },
  title: {
    fontFamily: "Nunito",
    fontSize: 20,
    fontWeight: "700",
    color: "#030303",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  progressText: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: "600",
    color: "#030303",
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { fontFamily: "Nunito", fontSize: 16, color: "#6B7280" },
});
