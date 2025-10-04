// src/modules/user/bookings/components/ErrorState.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { AlertCircle, RefreshCw } from 'lucide-react-native';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-white">
      <AlertCircle size={64} className="text-red-500 mb-4" />
      <Text className="text-xl font-bold text-gray-900 text-center mb-2">
        Unable to Load Bookings
      </Text>
      <Text className="text-gray-600 text-center mb-6">
        {error || 'Something went wrong while loading your bookings.'}
      </Text>
      <TouchableOpacity
        onPress={onRetry}
        className="flex-row items-center px-6 py-3 bg-blue-500 rounded-lg"
        accessibilityLabel="Retry loading bookings"
      >
        <RefreshCw size={18} className="text-white mr-2" />
        <Text className="text-white font-semibold">Try Again</Text>
      </TouchableOpacity>
      <Text className="text-gray-500 text-sm mt-4 text-center">
        If the problem persists, run:{'\n'}npx expo start --clear
      </Text>
    </View>
  );
}