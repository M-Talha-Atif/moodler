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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
      const validHostRoutes = ["(tabs)", "(host)"];
      if (!validHostRoutes.includes(segments[0])) {
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
        return; // Add return here
      }

      // Only redirect if user is in wrong area (auth, host, etc)
      // Don't redirect if already in user areas
      if (hasDailyCheckIn === true) {
        const validUserRoutes = ["(tabs)", "(user)"];

        if (!validUserRoutes.includes(segments[0])) {
          router.replace("/(tabs)/(user)");
        }
      }
    }
  }, [user, isLoading, segments, isNavigationReady, hasDailyCheckIn, router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen
            name="(user)"
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)/(user)" />
          <Stack.Screen name="(tabs)/(host)" />
          <Stack.Screen name="daily-check-in" />
          <Stack.Screen name="index" />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
