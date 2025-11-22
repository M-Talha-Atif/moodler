// src/modules/user/security/components/PrivacySettingItem.tsx
import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

/**
 * PrivacySettingItem Component
 * 
 * Displays a privacy setting with a toggle switch.
 * Shows an icon, title, description, and switch control.
 * 
 * @param icon - Ionicon name for the setting
 * @param title - Setting title
 * @param description - Description of what the setting controls
 * @param value - Current toggle state
 * @param onToggle - Callback when switch is toggled
 */
interface PrivacySettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  value: boolean;
  onToggle: () => void;
}

export default function PrivacySettingItem({
  icon,
  title,
  description,
  value,
  onToggle,
}: PrivacySettingItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color="#030303" />
      </View>
      <View style={styles.textContainer}>
        <Text variant="body" style={styles.title}>
          {title}
        </Text>
        <Text variant="caption" style={styles.description}>
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#E5E7EB", true: "#86EFAC" }}
        thumbColor={value ? "#10B981" : "#F3F4F6"}
        ios_backgroundColor="#E5E7EB"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
    fontFamily: "Nunito-SemiBold",
    color: "#030303",
  },
  description: {
    lineHeight: 18,
    color: "#6B7280",
  },
});