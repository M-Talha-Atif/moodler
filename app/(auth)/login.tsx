// app/(auth)/login.tsx - FIXED
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import LoginForm from '@/modules/auth/components/LoginForm';

export default function LoginScreen() { 
  const router = useRouter();

  return (
    <ScrollView 
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 px-6 justify-center">
        {/* Header */}
        <View className="mb-12">
          <Text className="text-4xl font-bold text-gray-900 text-center mb-3">
            Welcome Back
          </Text>
          <Text className="text-gray-600 text-center text-base">
            Sign in to your account
          </Text>
        </View>
        
        {/* Login Form */}
        <LoginForm />

        {/* Test Onboarding Button - FIXED PATH */}
        <TouchableOpacity
          onPress={() => router.push('/onboarding')} 
          className="mt-4 p-4 bg-blue-500 rounded-xl"
        >
          <Text className="text-white text-center font-semibold">
            🚀 Test Onboarding Screen
          </Text>
        </TouchableOpacity>
        
        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600 text-sm">Don't have an account? </Text>
          <Link href="/signup" asChild>
            <Text className="text-[#7bf163] font-semibold text-sm">Sign up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}