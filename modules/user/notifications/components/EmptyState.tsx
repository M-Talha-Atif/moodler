// src/modules/user/notifications/components/EmptyState.tsx
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

export default function EmptyState() {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 600 }}
      className="flex-1 justify-center items-center px-10"
    >
      <View className="items-center space-y-4">
        <View className="w-20 h-20 bg-muted rounded-2xl items-center justify-center">
          <Text className="text-3xl">🎉</Text>
        </View>
        <Text className="text-lg font-medium text-muted-foreground text-center">
          No notifications yet
        </Text>
        <Text className="text-sm text-muted-foreground text-center">
          You're all caught up!
        </Text>
      </View>
    </MotiView>
  );
}