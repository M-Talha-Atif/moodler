// app/(tabs)/(host)/index.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HostDashboardScreen() {
  const stats = [
    { label: "Total Events", value: "12", icon: "calendar", color: "#3b82f6" },
    { label: "Participants", value: "245", icon: "people", color: "#10b981" },
    { label: "Rating", value: "4.8", icon: "star", color: "#f59e0b" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-6">
        <Text className="text-2xl font-bold text-gray-900">Host Dashboard</Text>
        <Text className="text-gray-600 mt-1">Manage your experiences</Text>
      </View>

      {/* Stats */}
      <View className="px-6 my-4">
        <View className="flex-row -mx-2">
          {stats.map((stat, index) => (
            <View key={stat.label} className="flex-1 px-2">
              <View className="bg-white p-4 rounded-2xl shadow-sm">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </Text>
                    <Text className="text-gray-600 text-sm">{stat.label}</Text>
                  </View>
                  <Ionicons name={stat.icon} size={24} color={stat.color} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 my-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap -mx-2">
          <TouchableOpacity className="w-1/2 px-2 mb-4">
            <View className="bg-white p-4 rounded-2xl shadow-sm items-center">
              <Ionicons name="add-circle" size={32} color="#3b82f6" />
              <Text className="text-gray-900 font-medium mt-2">
                Create Event
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 px-2 mb-4">
            <View className="bg-white p-4 rounded-2xl shadow-sm items-center">
              <Ionicons name="analytics" size={32} color="#3b82f6" />
              <Text className="text-gray-900 font-medium mt-2">Analytics</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
