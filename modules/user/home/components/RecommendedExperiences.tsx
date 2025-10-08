import React, { useEffect } from "react";
import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { MotiView } from "moti";
import SectionHeader from "@/components/ui/sectionHeader";
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
  onSeeAll?: () => void;
}

export default function RecommendedExperiences({
  experiences,
  onJoinExperience,
  loading = false,
  error = null,
  refreshing = false,
  onRefresh,
  onSeeAll,
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
      style={styles.container}
    >
      {/* Header */}
      <SectionHeader title="Recommended for You" onSeeAll={onSeeAll} />

      {/* Scroll Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#030303"
            />
          ) : undefined
        }
        contentContainerStyle={styles.scrollContent}
      >
        {error ? (
          <View style={styles.centered}>
            <Text style={styles.errorTitle}>Failed to load experiences</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        ) : loading && experiences.length === 0 ? (
          <View>
            {[1, 2, 3].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </View>
        ) : experiences.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No recommendations yet — check back soon.</Text>
          </View>
        ) : (
          <View style={styles.list}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF8", // matches the card theme
  },
  scrollContent: {
    paddingBottom: 80,
  },
  list: {
    gap: 12,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  errorTitle: {
    color: "#030303",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  errorMessage: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 13,
    textAlign: "center",
  },
});
