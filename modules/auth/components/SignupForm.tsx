// modules/auth/components/SignupForm.tsx
import {
  View,
  Text,
  TextInput,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import RoleSelector from "./RoleSelector";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"user" | "host">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isLoading, error, signup, setError, clearError } = useAuthStore();

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      clearError();
      await signup(name, email, password, selectedRole);
      ToastAndroid.show("✅ Account created successfully!", ToastAndroid.SHORT);
    } catch (err) {
      console.error("Signup error:", err);
      ToastAndroid.show("❌ Signup failed", ToastAndroid.SHORT);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View className="space-y-8">
      {/* Error Message */}
      {error && (
        <View className="bg-red-50 border border-red-200 rounded-xl p-4">
          <Text className="text-red-700 text-sm text-center font-medium">
            {error}
          </Text>
        </View>
      )}

      {/* Role Picker - Using RoleSelector Component */}
      <View className="space-y-4">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          Choose Your Role
        </Text>

        <RoleSelector
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          isLoading={isLoading}
        />
      </View>

      {/* Name Input */}
      <View className="space-y-3">
        <Text className="text-gray-900 text-sm font-semibold">Full Name</Text>
        <TextInput
          className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-900 text-base"
          placeholder="Enter your full name"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
          editable={!isLoading}
        />
      </View>

      {/* Email Input */}
      <View className="space-y-3">
        <Text className="text-gray-900 text-sm font-semibold">
          Email Address
        </Text>
        <TextInput
          className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-900 text-base"
          placeholder="Enter your email address"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!isLoading}
        />
      </View>

      {/* Password Input */}
      <View className="space-y-3">
        <Text className="text-gray-900 text-sm font-semibold">Password</Text>
        <View className="relative">
          <TextInput
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-900 text-base pr-12"
            placeholder="Create a password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!isLoading}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={togglePasswordVisibility}
            disabled={isLoading}
          >
            {showPassword ? (
              <Ionicons name="eye-off" size={20} color="#6B7280" />
            ) : (
              <Ionicons name="eye" size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
        <Text className="text-gray-500 text-xs">
          Must be at least 6 characters
        </Text>
      </View>

      {/* Confirm Password Input */}
      <View className="space-y-3">
        <Text className="text-gray-900 text-sm font-semibold">
          Confirm Password
        </Text>
        <View className="relative">
          <TextInput
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-900 text-base pr-12"
            placeholder="Confirm your password"
            placeholderTextColor="#9CA3AF"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            editable={!isLoading}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={toggleConfirmPasswordVisibility}
            disabled={isLoading}
          >
            {showConfirmPassword ? (
              <Ionicons name="eye-off" size={20} color="#6B7280" />
            ) : (
              <Ionicons name="eye" size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Spacing */}
      <View className="h-2" />

      {/* Signup Button */}
      <Pressable
        className={`w-full rounded-xl p-4 shadow-sm ${
          isLoading ? "bg-gray-400" : "bg-[#7bf163] active:bg-[#6bd953]"
        }`}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text className="text-white text-center font-bold text-lg">
          {isLoading
            ? "Creating Account..."
            : `Sign Up as ${selectedRole === "user" ? "User" : "Host"}`}
        </Text>
      </Pressable>
    </View>
  );
}
