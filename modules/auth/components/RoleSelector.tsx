// components/RoleSelector.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
  return (
    <View className="flex-row space-x-4">
      {/* User Role */}
      <TouchableOpacity
        className="flex-1 rounded-2xl shadow-md"
        onPress={() => setSelectedRole("user")}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            selectedRole === "user"
              ? ["#4ade80", "#22c55e"] // green when selected
              : ["#f3f4f6", "#e5e7eb"] // gray when not selected
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16, borderRadius: 16 }}
        >
          <View className="items-center space-y-2">
            <View
              className={`p-3 rounded-full ${
                selectedRole === "user" ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <Ionicons
                name="person"
                size={20}
                color={selectedRole === "user" ? "white" : "#6B7280"}
              />
            </View>
            <Text
              style={{
                fontWeight: "600",
                textAlign: "center",
                color: selectedRole === "user" ? "white" : "#374151", // white text when selected
              }}
            >
              User
            </Text>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: selectedRole === "user" ? "white" : "#6B7280", // muted when not selected
              }}
            >
              Join experiences
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Host Role */}
      <TouchableOpacity
        className="flex-1 rounded-2xl shadow-md"
        onPress={() => setSelectedRole("host")}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            selectedRole === "host"
              ? ["#60a5fa", "#2563eb"] // blue when selected
              : ["#f3f4f6", "#e5e7eb"] // gray when not selected
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16, borderRadius: 16 }}
        >
          <View className="items-center space-y-2">
            <View
              className={`p-3 rounded-full ${
                selectedRole === "host" ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <FontAwesome
                name="star"
                size={20}
                color={selectedRole === "host" ? "white" : "#6B7280"}
              />
            </View>
            <Text
              style={{
                fontWeight: "600",
                textAlign: "center",
                color: selectedRole === "host" ? "white" : "#374151", // white text when selected
              }}
            >
              Host
            </Text>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: selectedRole === "host" ? "white" : "#6B7280",
              }}
            >
              Create experiences
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
