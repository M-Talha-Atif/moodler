// src/components/layout/DashboardHeader.tsx
import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";

interface DashboardHeaderProps {
  userName?: string;
  profilePic?: string;
  greeting?: string;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  height?: number;
  backgroundColor?: string;
  showNotification?: boolean;
}

export default function DashboardHeader({
  userName = "User",
  profilePic,
  greeting = "Hello",
  onProfilePress,
  onNotificationPress,
  height = 80,
  backgroundColor = "#FAFAF8",
  showNotification = true,
}: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <MotiView
      from={{ opacity: 0, translateY: -8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300 }}
      style={[
        styles.container,
        { backgroundColor, height },
      ]}
    >
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.row}>
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
              style={styles.avatar}
            />
          </TouchableOpacity>

          {/* Greeting */}
          <MotiView
            from={{ opacity: 0, translateY: -6 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400 }}
          >
            <Text className="text-lg font-semibold text-[#030303]">
              {greeting}, {userName} 👋
            </Text>
          </MotiView>

          {/* Notification Icon */}
          {showNotification && (
            <TouchableOpacity
              onPress={
                onNotificationPress || (() => router.push("/notifications"))
              }
              style={styles.iconContainer}
            >
              <Ionicons name="notifications-outline" size={24} color="#030303" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
    zIndex: 10,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  iconContainer: {
    padding: 4,
  },
});
