// src/modules/user/notifications/components/ErrorState.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <SafeAreaView className="flex-1 bg-background justify-center items-center px-10">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="items-center space-y-6"
      >
        <View className="w-20 h-20 bg-error/20 rounded-2xl items-center justify-center">
          <Text className="text-3xl">⚠️</Text>
        </View>
        
        <View className="items-center space-y-2">
          <Text className="text-lg font-medium text-foreground text-center">
            Failed to load notifications
          </Text>
          <Text className="text-sm text-muted-foreground text-center">
            {error}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onRetry}
          className="bg-primary px-6 py-3 rounded-xl"
          accessibilityLabel="Retry loading notifications"
          accessibilityRole="button"
        >
          <Text className="text-primary-foreground font-semibold">
            Try Again
          </Text>
        </TouchableOpacity>
      </MotiView>
    </SafeAreaView>
  );
}