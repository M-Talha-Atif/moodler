// modules/auth/components/LoginForm.tsx - UPDATED WITH EXPO ICONS
import { View, Text, TextInput, Pressable, ToastAndroid, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { isLoading, error, login, setError, clearError } = useAuthStore();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      clearError();
      await login(email, password);
      ToastAndroid.show('✅ Login successful!', ToastAndroid.SHORT);
    } catch (err) {
      console.error('Login error:', err);
      ToastAndroid.show('❌ Login failed', ToastAndroid.SHORT);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="space-y-8">
      {/* Error Message */}
      {error && (
        <View className="bg-red-50 border border-red-200 rounded-xl p-4 mb-2">
          <Text className="text-red-700 text-sm text-center font-medium">
            {error}
          </Text>
        </View>
      )}
      
      {/* Email Input */}
      <View className="space-y-3">
        <Text className="text-gray-900 text-sm font-semibold">Email Address</Text>
        <View className="relative">
          <TextInput
            className="w-full bg-white border border-gray-200 rounded-xl p-5 text-gray-900 text-base focus:border-[#7bf163]"
            placeholder="Enter your email address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading}
          />
        </View>
      </View>
      
      {/* Password Input with Eye Icon */}
      <View className="space-y-3">
        <Text className="text-gray-900 text-sm font-semibold">Password</Text>
        <View className="relative">
          <TextInput
            className="w-full bg-white border border-gray-200 rounded-xl p-5 text-gray-900 text-base pr-12 focus:border-[#7bf163]"
            placeholder="Enter your password"
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
      </View>

      {/* Spacing between fields and button */}
      <View className="h-2" />
      
      {/* Login Button */}
      <Pressable
        className={`w-full rounded-xl p-5 mt-4 shadow-sm ${
          isLoading 
            ? 'bg-gray-400' 
            : 'bg-[#7bf163] active:bg-[#6bd953]'
        }`}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text className="text-white text-center font-bold text-lg">
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Text>
      </Pressable>

      {/* Forgot Password Link */}
      <View className="flex-row justify-center pt-2">
        <TouchableOpacity>
          <Text className="text-[#7bf163] font-semibold text-sm">
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}