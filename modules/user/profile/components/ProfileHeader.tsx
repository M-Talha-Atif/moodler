// ProfileHeader.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Edit3 } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface ProfileHeaderProps {
  name: string;
  email: string;
  image: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, image }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.container}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
        <Edit3 size={16} color="#059669" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 32 },
  avatar: { width: 112, height: 112, borderRadius: 56, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  email: { fontSize: 14, color: "#6b7280" },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#d1fae5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
  },
  editText: { color: "#059669", fontWeight: "600", fontSize: 14, marginLeft: 4 },
});

export default ProfileHeader;
