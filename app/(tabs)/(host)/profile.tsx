import React, { useState, useCallback } from "react";
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogOut } from "lucide-react-native";
import { useAuthStore } from "@/store/useAuthStore";
import { Text } from "@/components/ui/text";
import ListItem from "@/components/ui/listItem";
import Header from "@/modules/common/Header";
import Skeleton from "@/modules/common/components/Skeleton";
import Separator from "@/components/ui/separator";
import { getProfileImage } from "@/modules/host/profile/services/profileService";
import { router, useFocusEffect } from "expo-router";
import { useCancelableApi } from "@/hooks/useCanceleableApi";
import AlertDialog from "@/components/ui/alertDialog";

export default function HostProfileScreen() {
  const { user, logout } = useAuthStore();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const fetchProfileImage = useCancelableApi(getProfileImage);

  const handleEditProfile = useCallback(() => {
    router.push({ pathname: "/(host)/editProfile" });
  }, []);

  const handleEditPassword = useCallback(() => {
    router.push({ pathname: "/(host)/editPassword" });
  }, []);

  const handleNotifications = useCallback(() => {
    router.push({ pathname: "/notifications" });
  }, []);

  const handleInsightsScreen = useCallback(() => {
    router.push({ pathname: "/insights" });
  }, []);

  const handlePrivacySecurity = useCallback(() => {
    router.push({ pathname: "/privacySecurity" });
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchProfileImage()
        .then((data) => setAvatarUrl(data?.avatarUrl || null))
        .catch((err) => {
          if (err.name === "CanceledError") return;
          console.error("Failed to fetch profile image:", err);
        })
        .finally(() => setIsLoading(false));

      return () => console.log("🔹 Host profile screen unfocused, cleaning up...");
    }, [fetchProfileImage])
  );

  const handleLogout = () => setShowLogoutDialog(true);
  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    logout();
  };
  const handleCancelLogout = () => setShowLogoutDialog(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Profile" showBackButton={false} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileSection}>
          {isLoading ? (
            <Skeleton width={80} height={80} radius={40} />
          ) : (
            <Image
              source={avatarUrl ? { uri: avatarUrl } : require("@/assets/images/default-avatar.png")}
              style={styles.avatar}
            />
          )}
          <View style={styles.userInfo}>
            <Text variant="header">{user?.name || "Host"}</Text>
            <Text variant="caption" color="#6B7280">{user?.email || "host@example.com"}</Text>
          </View>
        </View>

        <Separator color="#E8E8E6" thickness={1} margin={16} />

        {/* Account Section */}
        <View style={styles.section}>
          <Text variant="subheader" style={styles.sectionTitle}>Account</Text>
          <View style={styles.listContainer}>
            <ListItem title="Edit Profile" icon="pencil-outline" onPress={handleEditProfile} />
            <ListItem title="Change Password" icon="key-outline" onPress={handleEditPassword} />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text variant="subheader" style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.listContainer}>
            <ListItem title="Notifications" icon="notifications-outline" onPress={handleNotifications} />
            <ListItem title="Privacy & Security" icon="shield-checkmark-outline" onPress={handlePrivacySecurity} />
          </View>
        </View>

        {/* Analytics Section */}
        <View style={styles.section}>
          <Text variant="subheader" style={styles.sectionTitle}>Analytics</Text>
          <View style={styles.listContainer}>
            <ListItem title="Insights" icon="bar-chart-outline" onPress={handleInsightsScreen} />
          </View>
        </View>
      </ScrollView>

      {/* Logout Button fixed at bottom */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
        <LogOut size={20} color="#EFEFE7" />
        <Text variant="button" style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Logout Confirmation */}
      <AlertDialog
        visible={showLogoutDialog}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FAFAF8" },
    scrollContent: { paddingBottom: 16 },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 20,
      backgroundColor: "#FAFAF8",
    },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#E8E8E6" },
    userInfo: { marginLeft: 16, flex: 1, justifyContent: "center" },
    section: { marginHorizontal: 24, marginTop: 8, marginBottom: 16 },
    sectionTitle: { marginBottom: 12, color: "#030303" },
    listContainer: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    logoutBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#030303",
      marginHorizontal: 24,
      marginVertical: 4,
      paddingVertical: 14,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    logoutText: { color: "#EFEFE7", marginLeft: 8, letterSpacing: 0.5 },
  });
