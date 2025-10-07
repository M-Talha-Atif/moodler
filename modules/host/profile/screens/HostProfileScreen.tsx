import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Header from "@/modules/common/Header";
import { LogOut } from "lucide-react-native";
import { useAuthStore } from "@/store/useAuthStore";
import ProfileHeader from "../components/HostProfileHeader";


export default function UserProfileScreen() {
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => await logout();

  const userProfile = {
    name: user?.name || "Talha",
    email: user?.email || "talha@example.com",
    image: "https://avatars.githubusercontent.com/u/9919?v=4",
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="text-gray-500 mt-3">Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <Text className="text-red-500 font-semibold mb-2">Error</Text>
        <Text className="text-gray-500 text-center mb-4">{error}</Text>
        <TouchableOpacity
          onPress={() => {
            setError(null);
            setLoading(true);
          }}
          className="bg-emerald-500 px-6 py-2 rounded-full"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Profile" showBackButton={false} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        className="flex-1 pt-24 px-4"
        showsVerticalScrollIndicator={false}
      >
        {/* 👤 Profile Info */}
        <ProfileHeader
          name={userProfile.name}
          email={userProfile.email}
          image={userProfile.image}
        />

        {/* 🚪 Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          className="flex-row items-center justify-center bg-red-100 py-3 rounded-2xl mb-10"
        >
          <LogOut size={18} color="#dc2626" />
          <Text className="text-red-600 font-semibold text-base ml-2">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
