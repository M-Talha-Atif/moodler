// components/RoleSelector.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

interface RoleSelectorProps {
  selectedRole: 'user' | 'host';
  setSelectedRole: (role: 'user' | 'host') => void;
  isLoading?: boolean;
}

export default function RoleSelector({ selectedRole, setSelectedRole, isLoading }: RoleSelectorProps) {
  return (
    <View className="flex-row space-x-4">
      {/* User Role */}
      <TouchableOpacity
        className={`flex-1 rounded-2xl p-4 border-2 
          ${selectedRole === "user"
            ? "border-primary bg-gradient-to-br from-primary/20 to-primary/5"
            : "border-border bg-secondary"
          } shadow-md`}
        onPress={() => setSelectedRole("user")}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <View className="items-center space-y-2">
          <View
            className={`p-3 rounded-full ${
              selectedRole === "user" ? "bg-primary" : "bg-muted"
            } shadow-sm`}
          >
            <Ionicons
              name="person"
              size={20}
              color={selectedRole === "user" ? "white" : "#6B7280"}
            />
          </View>
          <Text
            className={`font-semibold text-center ${
              selectedRole === "user" ? "text-primary" : "text-foreground"
            }`}
          >
            User
          </Text>
          <Text className="text-muted-foreground text-xs text-center">
            Join experiences
          </Text>
        </View>
      </TouchableOpacity>

      {/* Host Role */}
      <TouchableOpacity
        className={`flex-1 rounded-2xl p-4 border-2 
          ${selectedRole === "host"
            ? "border-primary bg-gradient-to-br from-primary/20 to-primary/5"
            : "border-border bg-secondary"
          } shadow-md`}
        onPress={() => setSelectedRole("host")}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <View className="items-center space-y-2">
          <View
            className={`p-3 rounded-full ${
              selectedRole === "host" ? "bg-primary" : "bg-muted"
            } shadow-sm`}
          >
            <FontAwesome
              name="star"
              size={20}
              color={selectedRole === "host" ? "white" : "#6B7280"}
            />
          </View>
          <Text
            className={`font-semibold text-center ${
              selectedRole === "host" ? "text-primary" : "text-foreground"
            }`}
          >
            Host
          </Text>
          <Text className="text-muted-foreground text-xs text-center">
            Create experiences
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}