// src/modules/user/experiences/components/ErrorState.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="items-center space-y-4"
      >
        <View className="w-16 h-16 bg-error/20 rounded-2xl items-center justify-center">
          <Text className="text-error text-2xl">⚠️</Text>
        </View>
        <Text className="text-error text-center text-lg font-medium mb-2">
          {error}
        </Text>
        <TouchableOpacity
          onPress={onRetry}
          className="bg-primary px-6 py-3 rounded-xl"
        >
          <Text className="text-primary-foreground font-semibold">
            Try Again
          </Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}