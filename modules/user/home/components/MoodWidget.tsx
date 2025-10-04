import { View, Text } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface MoodWidgetProps {
  mood: string;
}

export default function MoodWidget({ mood }: MoodWidgetProps) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 100 }}
      className="rounded-2xl shadow-lg overflow-hidden"
    >
      <LinearGradient
        colors={["#60a5fa", "#3b82f6"]} // blue-400 to blue-500
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 16, borderRadius: 16 }}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-sm font-semibold mb-1">
              Today's Mood
            </Text>
            <Text className="text-white text-2xl font-bold">{mood}</Text>
            <Text className="text-white/80 text-xs mt-1">
              Looking great! ✨
            </Text>
          </View>
          <Ionicons name="happy" size={32} color="white" />
        </View>
      </LinearGradient>
    </MotiView>
  );
}
