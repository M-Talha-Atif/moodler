// app/_layout.tsx (main layout)
import { Stack } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

export default function RootLayout() {
  const { user, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
    } else if (user && !user.onboardingCompleted && !inOnboardingGroup) {
      // Redirect to onboarding if not completed
      router.replace('/(onboarding)');
    } else if (user && user.onboardingCompleted && (inAuthGroup || inOnboardingGroup)) {
      // Redirect to main app if already authenticated and completed onboarding
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      {/* <Stack.Screen name="(user)" />
      <Stack.Screen name="(host)" /> */}
    </Stack>
  );
}