import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfileScreen() {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Host Settings Screen</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleLogout}
        className="rounded-2xl overflow-hidden shadow-lg shadow-red-200"
      >
        <Text className="text-yellow text-center font-bold text-base">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
