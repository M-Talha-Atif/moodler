// src/modules/user/bookings/components/LoadingSkeleton.tsx
import { View } from 'react-native';

export default function LoadingSkeleton() {
  return (
    <View className="flex-1 bg-white p-4">
      {/* Header skeleton */}
      <View className="mb-6">
        <View className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
        <View className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
      </View>
      
      {/* Search bar skeleton */}
      <View className="h-14 bg-gray-200 rounded-xl mb-4 animate-pulse" />
      
      {/* Filters skeleton */}
      <View className="flex-row gap-3 mb-6">
        <View className="flex-1 h-14 bg-gray-200 rounded-lg animate-pulse" />
        <View className="flex-1 h-14 bg-gray-200 rounded-lg animate-pulse" />
      </View>
      
      {/* Stats skeleton */}
      <View className="flex-row gap-3 mb-6">
        {[1, 2, 3].map(item => (
          <View key={item} className="flex-1 h-20 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </View>
      
      {/* Booking cards skeleton */}
      {[1, 2, 3].map(item => (
        <View key={item} className="bg-gray-200 rounded-2xl p-4 mb-4 animate-pulse">
          <View className="h-40 bg-gray-300 rounded-xl mb-3" />
          <View className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
          <View className="h-3 bg-gray-300 rounded w-1/2" />
        </View>
      ))}
    </View>
  );
}