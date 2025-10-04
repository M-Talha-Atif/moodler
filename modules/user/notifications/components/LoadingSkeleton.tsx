// src/modules/user/notifications/components/LoadingSkeleton.tsx
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingSkeleton() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header Skeleton */}
      <View className="px-5 pt-4 pb-3 border-b border-border bg-card">
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <MotiView
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, loop: true }}
              className="h-8 bg-muted rounded-lg w-48 mb-2"
            />
            <MotiView
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, loop: true, delay: 200 }}
              className="h-4 bg-muted rounded w-64"
            />
          </View>
        </View>
      </View>

      {/* Content Skeleton */}
      <View className="flex-1 p-5 space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <MotiView
            key={item}
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ 
              type: 'timing', 
              duration: 1000, 
              loop: true,
              delay: item * 100 
            }}
            className="bg-card p-4 rounded-2xl border border-border"
          >
            <View className="flex-row items-start space-x-3">
              <View className="w-10 h-10 bg-muted rounded-full" />
              <View className="flex-1 space-y-2">
                <View className="h-4 bg-muted rounded w-3/4" />
                <View className="h-3 bg-muted rounded w-1/2" />
                <View className="h-3 bg-muted rounded w-1/4" />
              </View>
            </View>
          </MotiView>
        ))}
      </View>
    </SafeAreaView>
  );
}