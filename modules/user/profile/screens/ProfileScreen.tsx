// UserProfileScreen.tsx
import React, { useState } from "react";
import { ScrollView, View, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LogOut } from "lucide-react-native";
import { useAuthStore } from "@/store/useAuthStore";
import { Text } from "@/components/ui/text";
import ListItem from "@/components/ui/listItem";
import Header from "@/modules/common/Header";

export default function UserProfileScreen() {
  const { user, logout } = useAuthStore();
  const [name, setName] = useState(user?.name || "Talha");
  const [email, setEmail] = useState(user?.email || "talha@example.com");

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9fafb" }} contentContainerStyle={{ paddingBottom: 60 }}>
      <Header title="Profile" showBackButton={false} />

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.image || "https://avatars.githubusercontent.com/u/9919?v=4" }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text variant="header">{name}</Text>
          <Text variant="caption" color="#6b7280">{email}</Text>
        </View>
      </View>


      {/* Profile Actions */}
      <View style={{ marginTop: 32 }}>
        <ListItem title="Edit Profile" icon="pencil-outline" onPress={() => {}} />
        <ListItem title="Change Password" icon="key-outline" onPress={() => {}} />
        <ListItem title="Notifications" icon="notifications-outline" onPress={() => {}} />
        <ListItem title="Insights" icon="bar-chart-outline" onPress={() => {}} />
        <ListItem title="Privacy & Security" icon="shield-checkmark-outline" onPress={() => {}} />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <LogOut size={20} color="#fff" />
        <Text variant="button" style={{ color: "#fff", marginLeft: 8 }}>Logout</Text>
      </TouchableOpacity>
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
