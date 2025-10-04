// src/modules/user/experiences/components/LoadingState.tsx
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

export default function LoadingState() {
  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 600 }}
        className="items-center"
      >
        <View className="w-16 h-16 bg-primary/20 rounded-2xl mb-4" />
        <Text className="text-muted-foreground text-lg font-medium">
          Loading experience...
        </Text>
      </MotiView>
    </View>
  );
}