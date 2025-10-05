// app/(tabs)/(host)/settings.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/useAuthStore";
export default function UserSettings() {
  const { logout } = useAuthStore();
   const handleLogout = async () => {
    await logout;
   }
  return (
    <View className="flex-1 items-center justify-center">
      <Text>User Settings Screen</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleLogout}
        className="rounded-2xl overflow-hidden shadow-lg shadow-red-200"
      >
        <Text className="text-yellow text-center font-bold text-base">
          {"Logout"}
        </Text>
      </TouchableOpacity>
    </View>


  );
}
