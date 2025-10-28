import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LogOut } from "lucide-react-native";
import { useAuthStore } from "@/store/useAuthStore";
import { Text } from "@/components/ui/text";
import ListItem from "@/components/ui/listItem";
import Header from "@/modules/common/Header";
import Skeleton from "@/modules/common/components/Skeleton";
import { getProfileImage } from "../services/profileService";
import { router, useFocusEffect } from "expo-router";
import { useCancelableApi } from "@/hooks/useCanceleableApi";
import AlertDialog from "@/components/ui/alertDialog";


export default function UserProfileScreen() {
  const { user, logout } = useAuthStore();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchProfileImage = useCancelableApi(getProfileImage);
  // Inside your component
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleEditProfile = useCallback(() => {
    console.log("First time rendered");
    router.push({
      pathname: "/(user)/editProfile",
    });
  }, []); // runs only once (first render)

    const handleInsightsScreen = useCallback(() => {
    console.log("First time rendered");
    router.push({
      pathname: "/(user)/insights",
    });
  }, []); // runs only once (first render)

   const handleEditPassword = useCallback(() => {
    console.log("First time rendered");
    router.push({
      pathname: "/(user)/editPassword",
    });
  }, []); // runs only once (first render)

  const handleNotifications = useCallback(() => {
    console.log("First time rendered");
    router.push({
      pathname: "/notifications",
    });
  }, []); // runs only once (first render)

  /** Fetch profile image on mount */
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      fetchProfileImage()
        .then((data) => {
          setAvatarUrl(data?.avatarUrl || null);
        })
        .catch((err) => {
          if (err.name === "CanceledError") return; // ignore canceled requests
          console.error("Failed to fetch profile image:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });

      // optional cleanup 
      return () => {
        console.log("🔹 Profile screen unfocused, cleaning up...");
      };
    }, [fetchProfileImage])
  );

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    logout(); // your existing logout function
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f9fafb" }}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Header title="Profile" showBackButton={false} />

      {/* Profile Info */}
      <View style={styles.profileSection}>
        {isLoading ? (
          <Skeleton width={72} height={72} radius={36} />
        ) : (
          <Image
            source={
              avatarUrl
                ? { uri: avatarUrl } : require("@/assets/images/default-avatar.png")
            }
            style={styles.avatar}
          />
        )}
        <View style={styles.userInfo}>
          <Text variant="header">{user?.name || "User"}</Text>
          <Text variant="caption" color="#6b7280">
            {user?.email || "user@example.com"}
          </Text>
        </View>
      </View>

      {/* Profile Actions */}
      <View style={{ marginTop: 32 }}>
        <ListItem title="Edit Profile" icon="pencil-outline" onPress={handleEditProfile} />
        <ListItem title="Change Password" icon="key-outline" onPress={handleEditPassword} />
        <ListItem title="Notifications" icon="notifications-outline" onPress={handleNotifications} />
        <ListItem title="Insights" icon="bar-chart-outline" onPress={handleInsightsScreen} />
        <ListItem title="Privacy & Security" icon="shield-checkmark-outline" onPress={() => { }} />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <LogOut size={20} color="#fff" />
        <Text variant="button" style={{ color: "#fff", marginLeft: 8 }}>
          Logout
        </Text>
      </TouchableOpacity>


      <AlertDialog
        visible={showLogoutDialog}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  userInfo: {
    marginLeft: 12,
    justifyContent: "center",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#d1d5db",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc2626",
    marginHorizontal: 20,
    marginTop: 40,
    paddingVertical: 12,
    borderRadius: 16,
  },
});
