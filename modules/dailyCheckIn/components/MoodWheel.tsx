// src/modules/dailyCheckIn/components/MoodWheel.tsx
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { MotiView } from "moti";

const moods = [
  { emoji: "😊", emotion: "happy", color: "#fef08a" }, // yellow
  { emoji: "😐", emotion: "neutral", color: "#e5e7eb" }, // gray
  { emoji: "😢", emotion: "sad", color: "#bfdbfe" }, // blue
  { emoji: "😠", emotion: "angry", color: "#fecaca" }, // red
  { emoji: "😲", emotion: "surprise", color: "#e9d5ff" }, // purple
];

interface MoodWheelProps {
  selected: { emoji: string; emotion: string } | null;
  onSelect: (mood: { emoji: string; emotion: string }) => void;
  screenWidth?: number;
}

export default function MoodWheel({
  selected,
  onSelect,
  screenWidth,
}: MoodWheelProps) {
  const width = screenWidth || Dimensions.get("window").width;

  // Responsive button size
  const buttonSize = width > 768 ? 60 : width > 480 ? 50 : 40;
  const emojiSize = width > 768 ? 28 : width > 480 ? 24 : 20;

  // Horizontal spacing between buttons
  const totalSpacing = 16 * (moods.length - 1);
  const containerWidth = width - 32; // 16px padding each side
  const buttonSpacing =
    (containerWidth - moods.length * buttonSize) / (moods.length - 1);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 12,
        flexWrap: "wrap",
      }}
    >
      {moods.map((mood, index) => {
        const isActive = selected?.emoji === mood.emoji;

        return (
          <MotiView
            key={mood.emoji}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 100 }}
            style={{
              marginRight: index !== moods.length - 1 ? buttonSpacing : 0,
              marginBottom: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => onSelect(mood)}
              style={{
                width: buttonSize,
                height: buttonSize,
                borderRadius: buttonSize / 4, // smaller rounded corners
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isActive ? mood.color : "#f0f0f0",
                borderWidth: isActive ? 2 : 1,
                borderColor: isActive ? "#10b981" : "#d1d5db",
                transform: [{ scale: isActive ? 1.1 : 1 }],
              }}
            >
              <Text style={{ fontSize: emojiSize }}>{mood.emoji}</Text>
            </TouchableOpacity>
          </MotiView>
        );
      })}
    </View>
  );
}
