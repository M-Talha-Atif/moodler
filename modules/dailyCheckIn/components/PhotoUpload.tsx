// src/modules/dailyCheckIn/components/PhotoUpload.tsx
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface PhotoUploadProps {
  photo: { uri: string; type: string; name: string } | null;
  onUpload: (file: { uri: string; type: string; name: string }) => void;
  onRemove: () => void;
}

export default function PhotoUpload({
  photo,
  onUpload,
  onRemove,
}: PhotoUploadProps) {
  const screenWidth = Dimensions.get("window").width;

  const buttonHeight = screenWidth > 768 ? 60 : screenWidth > 480 ? 50 : 45;
  const iconSize = screenWidth > 768 ? 28 : screenWidth > 480 ? 24 : 20;
  const fontSize = screenWidth > 768 ? 16 : screenWidth > 480 ? 14 : 12;
  const buttonRadius = screenWidth > 768 ? 20 : 16;

  const createFileObject = (uri: string, name?: string) => ({
    uri,
    type: "image/jpeg", // default for expo images
    name: name || `photo-${Date.now()}.jpg`,
  });

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "We need access to your gallery!");
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
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "We need camera access!");
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
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  return (
    <MotiView
      style={{ marginVertical: 12 }}
      from={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 500, delay: 300 }}
    >
      <Text
        style={{
          fontSize: fontSize + 2,
          fontWeight: "600",
          color: "#111827",
          marginBottom: 8,
        }}
      >
        Add a Photo
      </Text>

      {!photo ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={takePhoto}
            style={{
              flex: 1,
              height: buttonHeight,
              borderRadius: buttonRadius,
              backgroundColor: "#3b82f6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="camera" size={iconSize} color="white" />
            <Text style={{ color: "white", fontSize, marginTop: 4 }}>
              Camera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickImage}
            style={{
              flex: 1,
              height: buttonHeight,
              borderRadius: buttonRadius,
              backgroundColor: "#10b981",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="image" size={iconSize} color="white" />
            <Text style={{ color: "white", fontSize, marginTop: 4 }}>
              Gallery
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <MotiView
          style={{ marginTop: 12, position: "relative" }}
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Image
            source={{ uri: photo.uri }}
            style={{
              width: "100%",
              height: screenWidth > 768 ? 300 : screenWidth > 480 ? 220 : 180,
              borderRadius: 16,
            }}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={onRemove}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#ef4444",
              padding: 6,
              borderRadius: 999,
            }}
          >
            <Ionicons name="trash" size={16} color="white" />
          </TouchableOpacity>
        </MotiView>
      )}
    </MotiView>
  );
}
