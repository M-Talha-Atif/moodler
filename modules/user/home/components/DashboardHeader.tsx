import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";

interface DashboardHeaderProps {
  userName?: string;
  profilePic?: string;
  greeting?: string;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  gradientColors?: string[];
  height?: number;
}

export default function DashboardHeader({
  userName = "User",
  profilePic,
  greeting = "Hello",
  onProfilePress,
  onNotificationPress,
  gradientColors = ["#16a34a", "#22c55e", "#4ade80"],
  height = 80,
}: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <MotiView
      from={{ opacity: 0, translateY: -8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 350 }}
      className="w-full absolute top-0 left-0 z-50"
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full shadow-sm"
        style={{
          height,
          paddingHorizontal: 16,
        }}
      >
        <SafeAreaView edges={["top"]} className="flex-1 justify-center">
          <View className="flex-row items-center justify-between">
            {/* Profile Icon */}
            <TouchableOpacity
              onPress={onProfilePress || (() => router.push("/profile"))}
            >
              <Image
                source={
                  profilePic
                    ? { uri: profilePic }
                    : require("@/assets/images/default-avatar.png")
                }
                className="w-10 h-10 rounded-full border border-white/30"
              />
            </TouchableOpacity>

            {/* Greeting */}
            <MotiView
              from={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
            >
              <Text className="text-xl font-semibold text-white text-center">
                {greeting}, {userName} 👋
              </Text>
            </MotiView>

            {/* Notification Icon */}
            <TouchableOpacity
              onPress={
                onNotificationPress || (() => router.push("/notifications"))
              }
            >
              <Ionicons name="notifications-outline" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </MotiView>
  );
}
