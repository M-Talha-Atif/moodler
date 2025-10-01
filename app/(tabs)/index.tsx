// app/(tabs)/index.tsx
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-2xl font-bold text-foreground">Home Screen</Text>
      <Text className="text-muted-foreground mt-4">Welcome to Moodler! 🎉</Text>
    </View>
  );
}