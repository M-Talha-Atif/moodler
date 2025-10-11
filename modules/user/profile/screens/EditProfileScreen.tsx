import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import ImageCard from "@/components/ui/imageCard";
import Button from "@/components/ui/button";
import Alert from "@/components/ui/alert";
import * as ImagePicker from "expo-image-picker";
import api from "@/services/apiClient";
import { getProfileImage } from "../services/profileService";
import { useAuthStore } from "@/store/useAuthStore";
import Skeleton from "@/modules/common/components/Skeleton";

export default function EditProfile() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || "Talha");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [localImage, setLocalImage] = useState<any>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /** Fetch profile image only */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const profileImage = await getProfileImage();
        setAvatarUrl(profileImage?.avatarUrl || null);
      } catch (error: any) {
        setAlert({
          type: "error",
          message: error.response?.data?.reason || "Failed to load profile image",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  /** Pick image */
  const handleImagePick = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      setAlert({ type: "error", message: "Permission to access gallery denied." });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const picked = result.assets[0];
      setLocalImage({ uri: picked.uri });
    }
  };

  /** Save profile changes */
  const handleSave = async () => {
    if (!name.trim()) {
      setAlert({ type: "error", message: "Please enter your name." });
      return;
    }

    try {
      setIsSaving(true);
      setAlert(null);

      const formData = new FormData();
      formData.append("name", name);
      if (localImage) {
        const file: any = {
          uri: localImage.uri,
          name: "avatar.jpg",
          type: "image/jpeg",
        };
        formData.append("file", file);
      }

      const response = await api.patch("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { success, message, reason } = response.data;
      if (success) {
        setAlert({ type: "success", message: message || "Profile updated successfully" });
        if (response.data.data?.avatarUrl) {
          setAvatarUrl(response.data.data.avatarUrl);
          setLocalImage(null);
        }
      } else {
        setAlert({ type: "error", message: reason || "Failed to update profile" });
      }
    } catch (error: any) {
      setAlert({
        type: "error",
        message: error.response?.data?.reason || "Update failed",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Image Skeleton or Card */}
      {isLoading ? (
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Skeleton width={120} height={120} radius={60} />
          <Skeleton width={100} height={16} style={{ marginTop: 12 }} />
          <Skeleton width={140} height={14} style={{ marginTop: 6 }} />
        </View>
      ) : (
        <ImageCard
          image={
            localImage
              ? localImage
              : avatarUrl
              ? { uri: avatarUrl } : require("@/assets/images/default-avatar.png")}
          title={name || "Your Name"}
          subtitle="Tap to change photo"
          onPress={handleImagePick}
          style={{ marginBottom: 24 }}
        />
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
          editable={!isSaving}
        />
      </View>

      <Button
        title={isSaving ? "Saving..." : "Save Changes"}
        onPress={handleSave}
        disabled={isSaving}
        backgroundColor={isSaving ? "#9CA3AF" : "#030303"}
        textColor="#EFEFE7"
        width="100%"
        height={48}
        fontSize={16}
        borderRadius={9}
        style={{ marginTop: 24 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FAFAF8",
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#111827",
  },
});
