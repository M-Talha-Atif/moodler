// src/modules/user/security/components/SecurityFeatureCard.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

/**
 * SecurityFeatureCard Component
 * 
 * Displays a card representing a protected feature or data category.
 * Shows an icon, title, and description of what's encrypted.
 * 
 * @param icon - Ionicon name for the feature
 * @param iconColor - Color for the icon
 * @param title - Feature title
 * @param description - Description of what's protected
 */
interface SecurityFeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  description: string;
}

export default function SecurityFeatureCard({
  icon,
  iconColor,
  title,
  description,
}: SecurityFeatureCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <Text variant="body" style={styles.title}>
        {title}
      </Text>
      <Text variant="micro" style={styles.description}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    marginBottom: 6,
    fontFamily: "Nunito-SemiBold",
    color: "#030303",
    fontSize: 15,
  },
  description: {
    lineHeight: 18,
    color: "#6B7280",
    fontSize: 12,
  },
});