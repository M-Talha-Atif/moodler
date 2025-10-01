// app/(user)/index.tsx - UPDATED WITH THEME
import { View, Text } from 'react-native';
import { useAuthStore } from '@/store/useAuthStore';

export default function UserHomeScreen() {
  const { user } = useAuthStore();

  return (
    <View className="flex-1 bg-background justify-center items-center p-6">
      {/* Welcome Section */}
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-foreground mb-4">
          Welcome to Moodler! 🎉
        </Text>
        <Text className="text-muted-foreground text-center text-lg mb-2">
          Hello, {user?.name}!
        </Text>
        <Text className="text-muted-foreground text-center">
          You are successfully logged in.
        </Text>
      </View>
      
      {/* User Info Card */}
      <View className="bg-card border border-border rounded-2xl p-6 w-full max-w-xs">
        <Text className="text-foreground font-semibold text-center mb-4">
          Account Information
        </Text>
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">Email:</Text>
            <Text className="text-foreground font-medium">{user?.email}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">Role:</Text>
            <Text className="text-primary font-medium capitalize">{user?.role}</Text>
          </View>
        </View>
      </View>
      
      {/* Bottom Text */}
      <Text className="text-sm text-muted-foreground absolute bottom-10 text-center">
        Start your emotional wellness journey today
      </Text>
    </View>
  );
}