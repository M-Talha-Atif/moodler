//src/mpdules/user/home/screens
import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useHome } from "../hooks/useHome";
import StreakWidget from "../components/StreakWidget";
import MoodWidget from "../components/MoodWidget";
import RecommendedExperiences from "../components/RecommendedExperiences";
import { Experience } from "../services/homeService";
import DashboardHeader from "@/modules/user/home/components/DashboardHeader";


export default function HomeScreen() {
  const router = useRouter();
  const { homeData, loading, error, refetch } = useHome();

  const handleJoinExperience = useCallback(
    (experience: Experience) =>
      router.push(`/(user)/experienceDetail?id=${experience.id}`), 
    [router]
  );

  const handleRetry = () => refetch();

  // --- Loading State ---
  if (loading && !homeData) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="small" color="#030303" />
        <Text style={styles.loadingText}>Loading your journey...</Text>
      </View>
    );
  }

  // --- Error State ---
  if (error && !homeData) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={42} color="#030303" />
        <Text style={styles.errorTitle}>{error || "Something went wrong"}</Text>
        <Text style={styles.errorSubtitle}>
          Please check your connection and try again
        </Text>

        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Main UI ---
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <DashboardHeader
          userName={homeData?.userName}
          profilePic={homeData?.profilePic}
          greeting={homeData?.greeting}
        />
      </View>

      {/* Content (non-scrollable wrapper) */}
      <View style={styles.contentWrapper}>
        {/* Spacer under sticky header */}
        <View style={{ height: 60 }} />

        {/* Mood */}
        {homeData?.currentMood && (
          <View style={styles.section}>
            <MoodWidget mood={homeData.currentMood} />
          </View>
        )}

        {/* Streak */}
        {homeData?.streak !== undefined && (
          <View style={styles.section}>
            <StreakWidget streak={homeData.streak} />
          </View>
        )}

        {/* Recommended Experiences (already scrollable) */}
        <View style={[styles.section, { flex: 1 }]}>
          <RecommendedExperiences
            experiences={homeData?.recommendedExperiences || []}
            onJoinExperience={handleJoinExperience}
            loading={loading && !homeData?.recommendedExperiences?.length}
            error={error}
            refreshing={loading && !!homeData}
            onRefresh={refetch}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FAFAF8",
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  section: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#FAFAF8",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loadingText: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 8,
    fontFamily: "Nunito",
  },
  errorTitle: {
    color: "#030303",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 16,
    fontFamily: "Nunito",
  },
  errorSubtitle: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 16,
    fontFamily: "Nunito",
  },
  retryButton: {
    borderWidth: 1,
    borderColor: "#030303",
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  retryText: {
    color: "#030303",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Nunito",
  },
});
