// src/modules/dailyCheckIn/components/PhotoUpload.tsx
import React from "react";
import {
  View,
  Image,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import Button from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface PhotoUploadProps {
  photo: { uri: string; type: string; name: string } | null;
  onUpload: (file: { uri: string; type: string; name: string }) => void;
  onRemove: () => void;
}

export default function PhotoUpload({ photo, onUpload, onRemove }: PhotoUploadProps) {
  const screenWidth = Dimensions.get("window").width;
  const iconSize = screenWidth > 768 ? 26 : screenWidth > 480 ? 24 : 22;

  const createFileObject = (uri: string, name?: string) => ({
    uri,
    type: "image/jpeg",
    name: name || `photo-${Date.now()}.jpg`,
  });

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "We need access to your gallery 📸");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        const asset = result.assets[0];
        onUpload(createFileObject(asset.uri, asset.fileName));
        Haptics.selectionAsync();
      }
    } catch {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "We need camera access 📷");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        const asset = result.assets[0];
        onUpload(createFileObject(asset.uri, asset.fileName));
        Haptics.selectionAsync();
      }
    } catch {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 400 }}
    >

      {!photo ? (
        <View style={styles.card}>
          <Ionicons name="image-outline" size={48} color="#9CA3AF" />
          <Text style={styles.placeholderText}>
            Capture or select a photo that represents your day
          </Text>

          <View style={styles.actionRow}>
            <Button
              title="Camera"
              backgroundColor="#EFEFE7"
              textColor="#030303"
              borderColor="#D1D5DB"
              borderWidth={1}
              width={130}
              height={42}
              onPress={takePhoto}
              style={styles.btn}
            />
            <Button
              title="Gallery"
              backgroundColor="#EFEFE7"
              textColor="#030303"
              borderColor="#D1D5DB"
              borderWidth={1}
              width={130}
              height={42}
              onPress={pickImage}
              style={styles.btn}
            />
          </View>
        </View>
      ) : (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 300 }}
          style={styles.previewWrapper}
        >
          <Image
            source={{ uri: photo.uri }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
            <Ionicons name="trash-outline" size={16} color="#030303" />
          </TouchableOpacity>
        </MotiView>
      )}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginTop: 12,
  },
  heading: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 16,
    color: "#030303",
    marginBottom: 12,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",

    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  placeholderText: {
    fontFamily: "Nunito",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 260,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  previewWrapper: {
    marginTop: 8,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  removeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FFFFFFCC",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 8,
    borderRadius: 999,
  },
});
