// app/(onboarding)/index.tsx
import OnboardingScreen from "@/modules/onboarding/screens/OnboardingScreen";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function OnboardingPage() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If user is already authenticated and completed onboarding, redirect to main app
    if (!isLoading && user?.onboardingCompleted) {
      router.replace("/(tabs)");
    }
  }, [user, isLoading, router]);

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#7bf163" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  //   // If user already completed onboarding, show nothing (will redirect)
  if (user?.onboardingCompleted) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#7bf163" />
        <Text className="mt-4 text-gray-600">Redirecting...</Text>
      </View>
    );
  }

  return <OnboardingScreen />;
}
