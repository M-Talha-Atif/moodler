// src/modules/user/home/components/ExperienceCard.tsx
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Experience } from "../services/homeService";

dayjs.extend(duration);

interface ExperienceCardProps {
  experience: Experience;
  onJoin: (experience: Experience) => void;
}

export default function ExperienceCard({ experience, onJoin }: ExperienceCardProps) {
  const spotsPercentage = (experience.spotsFilled / experience.totalSpots) * 100;
  
  // Calculate duration from session times
  const getDuration = () => {
    const start = dayjs(experience.sessionStartTime);
    const end = dayjs(experience.sessionEndTime);
    const diff = dayjs.duration(end.diff(start));
    
    const hours = diff.hours();
    const minutes = diff.minutes();
    
    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`.trim();
    }
    return `${minutes}m`;
  };

  const getStatusColor = () => {
    if (spotsPercentage > 80) return "bg-red-500";
    if (spotsPercentage > 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusText = () => {
    if (spotsPercentage > 80) return "Almost Full";
    if (spotsPercentage > 60) return "Filling Up";
    return "Available";
  };

  const handleImageError = () => {
    console.warn(`Failed to load image for experience: ${experience.title}`);
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden mb-4"
    >
      {/* 📸 Image */}
      <View className="relative">
        <Image
          source={{ uri: experience.image }}
          className="w-full h-44"
          resizeMode="cover"
          onError={handleImageError}
        />

        {/* Category - Use first cultural tag or fallback */}
        {experience.culturalTags?.[0] && (
          <View className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded-full">
            <Text className="text-white text-xs">{experience.culturalTags[0]}</Text>
          </View>
        )}

        {/* Virtual Badge */}
        {experience.isVirtual && (
          <View className="absolute top-3 right-3 bg-purple-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs">Virtual</Text>
          </View>
        )}

        {/* Language Badge */}
        {experience.language && (
          <View className="absolute top-12 right-3 bg-blue-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs">{experience.language}</Text>
          </View>
        )}
      </View>

      {/* 📄 Content */}
      <View className="p-4">
        {/* Title + Price */}
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-semibold text-gray-900 flex-1 mr-2">
            {experience.title}
          </Text>
          <Text className="text-green-600 font-bold text-base">
            {experience.price === 0 ? "Free" : `$${experience.price}`}
          </Text>
        </View>

        {/* Host Name */}
        <Text className="text-gray-500 text-sm mb-1">
          Hosted by {experience.host.name}
        </Text>

        {/* Target Emotion Subtitle */}
        {experience.targetEmotions?.[0] && (
          <Text className="text-gray-600 text-sm mb-2 italic">
            For when you're feeling {experience.targetEmotions[0].toLowerCase()}
          </Text>
        )}

        {/* Description */}
        <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
          {experience.description}
        </Text>

        {/* Meta Info */}
        <View className="flex-row flex-wrap items-center gap-x-4 mb-3">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={14} color="#6b7280" />
            <Text className="text-gray-600 text-xs ml-1">{getDuration()}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={14} color="#6b7280" />
            <Text className="text-gray-600 text-xs ml-1">{experience.spotsFilled} joined</Text>
          </View>
          {experience.location && !experience.isVirtual && (
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={14} color="#6b7280" />
              <Text className="text-gray-600 text-xs ml-1">
                {experience.location.split(" ")[0]}
              </Text>
            </View>
          )}
        </View>

        {/* Availability */}
        <View className="mb-3">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-gray-600 text-xs">
              {experience.spotsFilled}/{experience.totalSpots} spots
            </Text>
            <Text
              className={`text-xs font-medium ${
                spotsPercentage > 80
                  ? "text-red-600"
                  : spotsPercentage > 60
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {getStatusText()}
            </Text>
          </View>
          <View className="w-full bg-gray-200 rounded-full h-2">
            <View
              className={`h-2 rounded-full ${getStatusColor()}`}
              style={{ width: `${spotsPercentage}%` }}
            />
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={() => onJoin(experience)}
          className="w-full py-3 rounded-xl bg-green-500"
        >
          <Text className="text-white font-semibold text-center">
            Join Experience
          </Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}