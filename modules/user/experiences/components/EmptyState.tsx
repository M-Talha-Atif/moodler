// src/modules/user/experiences/components/EmptyState.tsx
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

export default function EmptyState() {
  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="items-center space-y-3"
      >
        <View className="w-16 h-16 bg-muted rounded-2xl items-center justify-center">
          <Text className="text-muted-foreground text-2xl">🔍</Text>
        </View>
        <Text className="text-muted-foreground text-lg font-medium text-center">
          Experience not found
        </Text>
        <Text className="text-muted-foreground text-center">
          The experience you're looking for doesn't exist or may have been removed.
        </Text>
      </MotiView>
    </View>
  );
}