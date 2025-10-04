import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StreakWidgetProps {
  streak: number;
}

export default function StreakWidget({ streak }: StreakWidgetProps) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl shadow-lg overflow-hidden"
    >
      <LinearGradient
        colors={["#4ade80", "#22c55e"]} // green-400 to green-500
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 16, borderRadius: 16 }}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-sm font-semibold mb-1">
              Current Streak
            </Text>
            <Text className="text-white text-2xl font-bold">{streak} days</Text>
            <Text className="text-white/80 text-xs mt-1">Keep going! 🔥</Text>
          </View>
          <Ionicons name="flame" size={32} color="white" />
        </View>
      </LinearGradient>
    </MotiView>
  );
}
