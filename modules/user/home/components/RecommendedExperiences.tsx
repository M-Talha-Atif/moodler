// src/modules/user/home/components/RecommendedExperiences.tsx
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MotiView } from "moti";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "../services/homeService";

interface RecommendedExperiencesProps {
  experiences: Experience[];
  onJoinExperience: (experience: Experience) => void;
  loading?: boolean;
  error?: string | null;
}

export default function RecommendedExperiences({
  experiences,
  onJoinExperience,
  loading = false,
  error = null,
}: RecommendedExperiencesProps) {
  if (loading) {
    return (
      <MotiView
        from={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <View className="flex-row justify-between items-center px-1">
          <Text className="text-xl font-bold text-gray-900">For You Today</Text>
        </View>
        <View className="justify-center items-center py-8">
          <ActivityIndicator size="small" color="#7bf163" />
          <Text className="text-gray-500 mt-2">Loading experiences...</Text>
        </View>
      </MotiView>
    );
  }

  if (error) {
    return (
      <MotiView
        from={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <View className="flex-row justify-between items-center px-1">
          <Text className="text-xl font-bold text-gray-900">For You Today</Text>
        </View>
        <View className="justify-center items-center py-8">
          <Text className="text-red-500 text-center mb-2">Failed to load experiences</Text>
          <Text className="text-gray-500 text-center text-sm">{error}</Text>
        </View>
      </MotiView>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <MotiView
        from={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <View className="flex-row justify-between items-center px-1">
          <Text className="text-xl font-bold text-gray-900">For You Today</Text>
        </View>
        <View className="justify-center items-center py-8">
          <Text className="text-gray-500 text-center">
            No recommendations yet—check back soon!
          </Text>
        </View>
      </MotiView>
    );
  }

  return (
    <MotiView
      from={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header Row */}
      <View className="flex-row justify-between items-center px-1">
        <Text className="text-xl font-bold text-gray-900">For You Today</Text>
        <TouchableOpacity onPress={() => console.log("See all experiences")}>
          <Text className="text-green-600 font-semibold">See All</Text>
        </TouchableOpacity>
      </View>

      {/* Experience List */}
      <View className="space-y-4">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            onJoin={onJoinExperience}
          />
        ))}
      </View>
    </MotiView>
  );
}