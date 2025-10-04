// src/features/onboarding/components/OnboardingScreen.tsx
import { View, Text, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { ProgressBar } from "react-native-paper";
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
      try {
        // Check if user is authenticated
        if (!token) {
          setError("Please login first");
          setTimeout(() => router.replace("/(auth)/login"), 2000);
          return;
        }

        // Check if user already completed onboarding
        if (user?.onboardingCompleted) {
          console.log(
            "✅ User already completed onboarding, redirecting to tabs",
          );
          router.replace("/(tabs)");
          return;
        }

        // Check onboarding status from backend
        const statusRes = await getOnboardingStatus();
        const status = statusRes.data || {};
        console.log("Onboarding status:", status);

        if (status.completed) {
          console.log("✅ Onboarding already completed in backend");
          router.replace("/(tabs)");
          return;
        }

        if (!status.started) {
          await startOnboarding();
        }

        setStep(status.currentStep || 0);
        setInput([]);
      } catch (err) {
        console.error("Failed to initialize onboarding:", err);
        setError("Failed to start onboarding");
      } finally {
        setIsLoading(false);
      }
    };

    initOnboarding();
  }, []);

  const handleNext = async () => {
    if (!currentQuestion) return;

    try {
      setError(null);

      // Save answer based on question type
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

      setInput([]);

      // Move to next step or complete
      if (step < onboardingQuestions.length - 1) {
        setStep(step + 1);
      } else {
        // Complete onboarding
        setIsBuildingProfile(true);

        // Simulate profile building
        const interval = setInterval(() => {
          setProgressValue((prev) => {
            if (prev >= 100) {
              clearInterval(interval);

              // Complete onboarding both in backend and local state
              completeOnboarding()
                .then(() => {
                  console.log(
                    "🎉 Onboarding fully completed, redirecting to tabs",
                  );
                  setTimeout(() => router.replace("/(tabs)"), 500);
                })
                .catch((err) => {
                  console.error("Error completing onboarding:", err);
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
      console.error("Onboarding step failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text>Loading onboarding...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Progress Bar */}
      <View className="px-6 pt-12">
        <ProgressBar
          progress={
            isBuildingProfile
              ? progressValue / 100
              : step / (onboardingQuestions.length - 1)
          }
          color="#7bf163"
        />
      </View>

      {/* Error Message */}
      {error && (
        <View className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
          <Text className="text-red-700 text-sm text-center font-medium">
            {error}
          </Text>
        </View>
      )}

      {/* Main Content */}
      <View className="flex-1 justify-center px-6">
        {isBuildingProfile ? (
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="items-center space-y-6"
          >
            {/* Animated Gear */}
            <MotiView
              from={{ rotate: "0deg" }}
              animate={{ rotate: "360deg" }}
              transition={{
                loop: true,
                repeatReverse: false,
                type: "timing",
                duration: 2000,
              }}
            >
              <Text className="text-5xl">⚙️</Text>
            </MotiView>

            <Text className="text-xl font-semibold text-center">
              Building your profile...
            </Text>
            <Text className="text-gray-600 text-center">
              Please wait while we personalize your experience
            </Text>

            {/* Progress Text */}
            <Text className="text-[#7bf163] font-medium">{progressValue}%</Text>
          </MotiView>
        ) : (
          <MotiView
            key={step}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="space-y-8"
          >
            {/* Emoji */}
            <View className="items-center mb-8">
              <Text className="text-5xl mb-8">🤖</Text>
            </View>

            {/* Chat Bubble */}
            <ChatBubble sender="ai" text={currentQuestion?.text} />

            {/* Question Input */}
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

      {/* Footer */}
      {!isBuildingProfile && currentQuestion && (
        <View className="px-6 pb-8 mb-8">
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
        </View>
      )}
    </View>
  );
}
