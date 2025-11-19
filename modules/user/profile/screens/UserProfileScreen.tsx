import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogOut } from "lucide-react-native";
import { useAuthStore } from "@/store/useAuthStore";
import { Text } from "@/components/ui/text";
import ListItem from "@/components/ui/listItem";
import Header from "@/modules/common/Header";
import Skeleton from "@/modules/common/components/Skeleton";
import Separator from "@/components/ui/separator";
import { getProfileImage } from "../services/profileService";
import { router, useFocusEffect } from "expo-router";
import { useCancelableApi } from "@/hooks/useCanceleableApi";
import AlertDialog from "@/components/ui/alertDialog";

/**
 * UserProfileScreen Component
 * 
 * Displays user profile information with actions menu and logout functionality.
 * Follows the app's design system with consistent spacing, typography, and colors.
 */
export default function UserProfileScreen() {
  const { user, logout } = useAuthStore();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const fetchProfileImage = useCancelableApi(getProfileImage);

  /**
   * Navigate to edit profile screen
   */
  const handleEditProfile = useCallback(() => {
    router.push({
      pathname: "/(user)/editProfile",
    });
  }, []);

  /**
   * Navigate to insights screen
   */
  const handleInsightsScreen = useCallback(() => {
    router.push({
      pathname: "/(user)/insights",
    });
  }, []);

  /**
   * Navigate to change password screen
   */
  const handleEditPassword = useCallback(() => {
    router.push({
      pathname: "/(user)/editPassword",
    });
  }, []);

  
   /**
   * Navigate to privacy security screen
   */
  const handlePrivacySecurity = useCallback(() => {
    router.push({
      pathname: "/(user)/privacySecurity",
    });
  }, []);

  /**
   * Navigate to notifications screen
   */
  const handleNotifications = useCallback(() => {
    router.push({
      pathname: "/notifications",
    });
  }, []);

  /**
   * Fetch profile image when screen comes into focus
   * Includes cleanup to cancel ongoing requests when screen loses focus
   */
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      fetchProfileImage()
        .then((data) => {
          setAvatarUrl(data?.avatarUrl || null);
        })
        .catch((err) => {
          // Ignore canceled requests to prevent unnecessary error logs
          if (err.name === "CanceledError") return;
          console.error("Failed to fetch profile image:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });

      // Cleanup function to abort request when screen loses focus
      return () => {
        console.log("🔹 Profile screen unfocused, cleaning up...");
      };
    }, [fetchProfileImage])
  );

  /**
   * Show logout confirmation dialog
   */
  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  /**
   * Confirm logout and clear user session
   */
  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    logout();
  };

  /**
   * Cancel logout action
   */
  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Profile" showBackButton={false} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Section */}
        <View style={styles.profileSection}>
          {isLoading ? (
            <Skeleton width={80} height={80} radius={40} />
          ) : (
            <Image
              source={
                avatarUrl
                  ? { uri: avatarUrl }
                  : require("@/assets/images/default-avatar.png")
              }
              style={styles.avatar}
            />
          )}
          <View style={styles.userInfo}>
            <Text variant="header" style={styles.userName}>
              {user?.name || "User"}
            </Text>
            <Text variant="caption" color="#6B7280" style={styles.userEmail}>
              {user?.email || "user@example.com"}
            </Text>
          </View>
        </View>

        <Separator color="#E8E8E6" thickness={1} margin={16} />

        {/* Account Section */}
        <View style={styles.section}>
          <Text variant="subheader" style={styles.sectionTitle}>
            Account
          </Text>
          <View style={styles.listContainer}>
            <ListItem
              title="Edit Profile"
              icon="pencil-outline"
              onPress={handleEditProfile}
            />
            <ListItem
              title="Change Password"
              icon="key-outline"
              onPress={handleEditPassword}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text variant="subheader" style={styles.sectionTitle}>
            Preferences
          </Text>
          <View style={styles.listContainer}>
            <ListItem
              title="Notifications"
              icon="notifications-outline"
              onPress={handleNotifications}
            />
            <ListItem
              title="Privacy & Security"
              icon="shield-checkmark-outline"
              onPress={handlePrivacySecurity}
            />
          </View>
        </View>

        {/* Analytics Section */}
        <View style={styles.section}>
          <Text variant="subheader" style={styles.sectionTitle}>
            Analytics
          </Text>
          <View style={styles.listContainer}>
            <ListItem
              title="Insights"
              icon="bar-chart-outline"
              onPress={handleInsightsScreen}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={20} color="#EFEFE7" />
          <Text
            variant="button"
            style={styles.logoutText}
            fontWeight="700"
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Dialog */}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  scrollContent: {
    paddingBottom: 80,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FAFAF8",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8E8E6",
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    marginBottom: 4,
  },
  userEmail: {
    lineHeight: 20,
  },
  section: {
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    color: "#030303",
  },
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
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logoutText: {
    color: "#EFEFE7",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
});