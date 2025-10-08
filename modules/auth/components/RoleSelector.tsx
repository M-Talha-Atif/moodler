import React from "react";
import { View, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

interface RoleSelectorProps {
  selectedRole: "user" | "host";
  setSelectedRole: (role: "user" | "host") => void;
  isLoading?: boolean;
}

export default function RoleSelector({
  selectedRole,
  setSelectedRole,
  isLoading,
}: RoleSelectorProps) {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#1F2937" : "#F9FAFB",
    border: isDark ? "#374151" : "#E5E7EB",
    text: isDark ? "#F3F4F6" : "#111827",
    subText: isDark ? "#9CA3AF" : "#6B7280",
    activeUser: "#10B981",
    activeHost: "#3B82F6",
  };

  return (
    <View style={styles.container}>
      {/* User Role */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedRole("user")}
        disabled={isLoading}
        style={[
          styles.card,
          { backgroundColor: colors.bg, borderColor: colors.border },
          selectedRole === "user" && {
            borderColor: colors.activeUser,
            backgroundColor: isDark ? "#064E3B" : "#ECFDF5",
          },
        ]}
      >
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: colors.border },
            selectedRole === "user" && { backgroundColor: colors.activeUser },
          ]}
        >
          <Ionicons
            name="person"
            size={22}
            color={selectedRole === "user" ? "#fff" : colors.subText}
          />
        </View>
        <Text style={[styles.roleTitle, { color: colors.text }]}>User</Text>
        <Text style={[styles.roleDesc, { color: colors.subText }]}>
          Join experiences
        </Text>
      </TouchableOpacity>

      {/* Host Role */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedRole("host")}
        disabled={isLoading}
        style={[
          styles.card,
          { backgroundColor: colors.bg, borderColor: colors.border },
          selectedRole === "host" && {
            borderColor: colors.activeHost,
            backgroundColor: isDark ? "#1E3A8A" : "#EFF6FF",
          },
        ]}
      >
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: colors.border },
            selectedRole === "host" && { backgroundColor: colors.activeHost },
          ]}
        >
          <FontAwesome
            name="star"
            size={20}
            color={selectedRole === "host" ? "#fff" : colors.subText}
          />
        </View>
        <Text style={[styles.roleTitle, { color: colors.text }]}>Host</Text>
        <Text style={[styles.roleDesc, { color: colors.subText }]}>
          Create experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    paddingVertical: 14, // reduced from 22
    justifyContent: "center",
  },
  iconWrapper: {
    backgroundColor: "#E5E7EB",
    padding: 8, // smaller icon area
    borderRadius: 50,
    marginBottom: 6,
  },
  roleTitle: {
    color: "#030303",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  roleDesc: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
  },
});

