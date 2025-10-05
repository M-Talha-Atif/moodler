import { View, Text, TouchableOpacity, Image } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Experience } from "../services/homeService";
import Button from "@/modules/common/components/Button";
import { LinearGradient } from "expo-linear-gradient";

dayjs.extend(duration);

interface ExperienceCardProps {
  experience: Experience;
  onJoin: (experience: Experience) => void;
}

export default function ExperienceCard({ experience, onJoin }: ExperienceCardProps) {
  const spotsPercentage = (experience.spotsFilled / experience.totalSpots) * 100;

  const getDuration = () => {
    const start = dayjs(experience.sessionStartTime);
    const end = dayjs(experience.sessionEndTime);
    const diff = dayjs.duration(end.diff(start));
    const hours = diff.hours();
    const minutes = diff.minutes();
    if (hours > 0) return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    return `${minutes}m`;
  };

  const getStatusColor = () => {
    if (spotsPercentage > 80) return "#ef4444";
    if (spotsPercentage > 60) return "#f59e0b";
    return "#10b981";
  };

  const getStatusText = () => {
    if (spotsPercentage > 80) return "Almost Full";
    if (spotsPercentage > 60) return "Filling Up";
    return "Available";
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-5 overflow-hidden"
    >
      {/* Image */}
      <View className="relative">
        <Image
          source={{ uri: experience.image }}
          className="w-full h-48"
          resizeMode="cover"
        />
        {/* Overlay badges */}
        <View className="absolute top-3 left-3 flex-row space-x-2">
          {experience.culturalTags?.[0] && (
            <View className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Text className="text-white text-xs font-medium">
                {experience.culturalTags[0]}
              </Text>
            </View>
          )}
          {experience.isVirtual && (
            <View className="bg-purple-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Text className="text-white text-xs font-medium">Virtual</Text>
            </View>
          )}
        </View>
      </View>

      {/* Content */}
      <View className="p-5">
        {/* Title & Price */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold text-gray-900 flex-1 mr-3 leading-6" numberOfLines={2}>
            {experience.title}
          </Text>
          <LinearGradient
            colors={["#7bf163", "#4ade80", "#10B981"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-3 py-1.5 rounded-full shadow-sm"
          >
            <Text className="text-white text-sm font-bold tracking-wide">
              {experience.price === 0 ? "Free" : `$${experience.price}`}
            </Text>
          </LinearGradient>
        </View>

        {/* Emotion */}
        {experience.targetEmotions?.[0] && (
          <View className="flex-row items-center mb-3">
            <Ionicons name="sparkles-outline" size={14} color="#10B981" />
            <Text className="text-gray-500 text-sm ml-1 italic">
              For when you feel {experience.targetEmotions[0].toLowerCase()}
            </Text>
          </View>
        )}

        {/* Meta Section: Duration + Location (Column) */}
        <View
          className="flex-col space-y-2 mb-4 px-3 py-2 rounded-xl"
          style={{
            backgroundColor: "rgba(123, 241, 99, 0.06)",
            borderWidth: 1,
            borderColor: "rgba(123, 241, 99, 0.15)",
          }}
        >
          {/* Location */}
          {experience.location && !experience.isVirtual && (
            <View className="flex-row items-start space-x-2 flex-wrap">
              <View className="bg-rose-50 p-1.5 rounded-full">
                <Ionicons name="location-outline" size={12} color="#E11D48" />
              </View>
              <Text className="text-gray-700 text-[11px] font-medium flex-shrink mt-1">
                {experience.location}
              </Text>
            </View>
          )}

          {/* Duration */}
          <View className="flex-row items-center space-x-2">
            <View className="bg-emerald-50 p-1.5 rounded-full">
              <Ionicons name="time-outline" size={12} color="#059669" />
            </View>
            <Text className="text-gray-700 text-[11px] font-medium">{getDuration()}</Text>
          </View>
        </View>



        {/* Availability */}
        <View className="mb-5">
          <View className="flex-row justify-between mb-1">
            <Text className="text-xs text-gray-500">
              {experience.spotsFilled}/{experience.totalSpots} spots
            </Text>
            <Text className="text-xs font-medium" style={{ color: getStatusColor() }}>
              {getStatusText()}
            </Text>
          </View>
          <View className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <View
              className="h-2 rounded-full"
              style={{ backgroundColor: getStatusColor(), width: `${spotsPercentage}%` }}
            />
          </View>
        </View>

        {/* CTA Button */}
        <Button variant="primary" title="Join Experience" onPress={() => onJoin(experience)} />
      </View>
    </MotiView>
  );
}
