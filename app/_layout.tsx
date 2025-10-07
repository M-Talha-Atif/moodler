// app/_layout.tsx
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useRouter, useSegments, Stack } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";
import "../global.css";
import { useDailyCheckInStore } from "@/modules/dailyCheckIn/store/useDailyCheckInStore";
import { useMoodLog } from "@/modules/dailyCheckIn/hooks/useMoodLog";
import Animated, { FadeIn, FadeOut, ZoomIn } from "react-native-reanimated";
import * as Font from "expo-font";
import { useFonts } from "expo-font"

export default function RootLayout() {
  const { user, isLoading, checkAuth } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const { hasDailyCheckIn, setHasDailyCheckIn } = useDailyCheckInStore();
  const { checkTodayMoodLog } = useMoodLog();

  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-Regular.ttf"),
  });



  // 🔍 Daily check-in fetch
  useEffect(() => {
    const checkDaily = async () => {
      if (user?.role === "user") {
        try {
          const log = await checkTodayMoodLog();
          setHasDailyCheckIn(!!log);
        } catch {
          setHasDailyCheckIn(false);
        }
      } else if (user?.role === "host") {
        setHasDailyCheckIn(true);
      } else {
        setHasDailyCheckIn(null);
      }
    };

    if (user) checkDaily();
  }, [user]);

  // 🔐 Auth check
  useEffect(() => {
    checkAuth().finally(() => {
      setIsNavigationReady(true);
    });
  }, []);

  // 🚦 AUTO NAVIGATION
  useEffect(() => {
    if (!isNavigationReady || isLoading) return;

    // Agar user hai aur role "user" hai aur abhi daily status null hai → wait karo
    if (user?.role === "user" && hasDailyCheckIn === null) {
      return;
    }

    const currentSegment = segments[0];

    // 1️⃣ No user → Login
    if (!user) {
      if (currentSegment !== "(auth)") {
        router.replace("/(auth)/login");
      }
      return;
    }

    // Host
    if (user.role === "host") {
      if (segments[0] !== "(tabs)" || segments[1] !== "(host)") {
        router.replace("/(tabs)/(host)");
      }
      return;
    }

    // User
    if (user.role === "user") {
      if (!user.onboardingCompleted) {
        if (segments[0] !== "onboarding") {
          router.replace("/onboarding");
        }
        return;
      }

      if (hasDailyCheckIn === false) {
        if (segments[0] !== "daily-check-in") {
          router.replace("/daily-check-in");
        }
      } else if (hasDailyCheckIn === true) {
        if (segments[0] !== "(tabs)" || segments[1] !== "(user)") {
          router.replace("/(tabs)/(user)");
        }
      }
    }


  }, [user, isLoading, segments, isNavigationReady, hasDailyCheckIn, router]);

  // 🌀 Loader
  if (
    !isNavigationReady ||
    (user?.role === "user" && hasDailyCheckIn === null)
  ) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="text-gray-600 mt-4">
          {user?.role === "user" && hasDailyCheckIn === null
            ? "Checking your mood status..."
            : "Loading your journey..."}
        </Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)/(user)" />
      <Stack.Screen name="(tabs)/(host)" />
      <Stack.Screen name="daily-check-in" />
      <Stack.Screen name="index" />
      {/* for non tabs */}
      <Stack.Screen name="(user)" />
    </Stack>
  );
}
