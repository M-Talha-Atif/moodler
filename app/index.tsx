// app/index.tsx
import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2000);
  }, []);

  return (
    <View className="flex-1 bg-background justify-center items-center">
      <View className="items-center mb-8">
        <Text className="text-4xl font-bold text-primary mb-2">
          Moodler
        </Text>
        <Text className="text-lg text-muted-foreground">
          Your Emotional Companion
        </Text>
      </View>
      
      <ActivityIndicator size="large" color="#6366f1" />
      
      <Text className="text-sm text-muted-foreground absolute bottom-10">
        Made with 💙
      </Text>
    </View>
  );
}