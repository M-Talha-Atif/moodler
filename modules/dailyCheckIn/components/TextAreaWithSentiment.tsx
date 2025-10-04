// src/modules/dailyCheckIn/components/TextAreaWithSentiment.tsx
import { View, Text, TextInput } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";

interface TextAreaWithSentimentProps {
  value: string;
  onChange: (text: string) => void;
}

export default function TextAreaWithSentiment({
  value,
  onChange,
}: TextAreaWithSentimentProps) {
  const getSentiment = (text: string) => {
    if (
      text.includes("sad") ||
      text.includes("angry") ||
      text.includes("bad")
    ) {
      return "negative";
    } else if (
      text.includes("happy") ||
      text.includes("good") ||
      text.includes("great")
    ) {
      return "positive";
    }
    return "neutral";
  };

  const sentiment = getSentiment(value.toLowerCase());

  const sentimentConfig = {
    positive: {
      color: "bg-green-100 border-green-500",
      icon: <Ionicons name="happy" size={16} color="#16a34a" />,
      label: "Positive",
    },
    negative: {
      color: "bg-red-100 border-red-500",
      icon: <Ionicons name="sad" size={16} color="#dc2626" />,
      label: "Negative",
    },
    neutral: {
      color: "bg-blue-100 border-blue-500",
      icon: <Ionicons name="neutral" size={16} color="#2563eb" />,
      label: "Neutral",
    },
  };

  const current = sentimentConfig[sentiment];

  return (
    <MotiView
      className="space-y-4"
      from={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 500, delay: 200 }}
    >
      <Text className="text-lg font-semibold text-gray-900">
        How are you feeling today?
      </Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Today I'm feeling..."
        multiline
        numberOfLines={4}
        className="min-h-[120px] text-lg p-4 rounded-2xl border border-gray-300 bg-white"
        textAlignVertical="top"
      />

      {value ? (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex-row items-center self-start px-3 py-2 rounded-full border ${current.color}`}
        >
          {current.icon}
          <Text className="ml-2 font-medium text-gray-800">
            {current.label} sentiment
          </Text>
        </MotiView>
      ) : null}
    </MotiView>
  );
}
