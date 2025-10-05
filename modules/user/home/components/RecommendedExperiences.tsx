import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { MotiView } from "moti";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "../services/homeService";
import CardSkeleton from "@/modules/common/components/CardSkeleton";

interface RecommendedExperiencesProps {
  experiences: Experience[];
  onJoinExperience: (experience: Experience) => void;
  loading?: boolean;
  error?: string | null;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export default function RecommendedExperiences({
  experiences,
  onJoinExperience,
  loading = false,
  error = null,
  refreshing = false,
  onRefresh,
}: RecommendedExperiencesProps) {
  useEffect(() => {
    console.log("🔄 [RecommendedExperiences] render");
    console.log("➡️ loading:", loading);
    console.log("➡️ error:", error);
    console.log("➡️ experiences:", experiences?.length || 0);
  }, [experiences, loading, error]);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      className="flex-1"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#7bf163"]}
              tintColor="#7bf163"
            />
          ) : undefined
        }
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {error ? (
          <View className="justify-center items-center py-8">
            <Text className="text-red-500 text-center mb-2">
              Failed to load experiences
            </Text>
            <Text className="text-gray-500 text-center text-sm">{error}</Text>
          </View>
        ) : loading && experiences.length === 0 ? (
          <View>
            {[1, 2, 3].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </View>
        ) : experiences.length === 0 ? (
          <View className="justify-center items-center py-8">
            <Text className="text-gray-500 text-center">
              No recommendations yet — check back soon!
            </Text>
          </View>
        ) : (
          <View className="space-y-4">
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onJoin={onJoinExperience}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </MotiView>
  );
}
