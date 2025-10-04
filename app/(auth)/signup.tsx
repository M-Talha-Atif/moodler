// app/(auth)/signup.tsx - CLEAN VERSION
import { View, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import SignupForm from "@/modules/auth/components/SignupForm";

export default function SignupScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 px-6 justify-center py-8">
        {/* Header */}
        <View className="mb-12">
          <Text className="text-4xl font-bold text-gray-900 text-center mb-3">
            Join Moodler
          </Text>
          <Text className="text-gray-600 text-center text-base">
            Create your account and start your journey
          </Text>
        </View>

        {/* Signup Form */}
        <SignupForm />

        {/* Login Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600 text-sm">
            Already have an account?{" "}
          </Text>
          <Link href="/(auth)/login" asChild>
            <Text className="text-[#7bf163] font-semibold text-sm">
              Sign in
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
