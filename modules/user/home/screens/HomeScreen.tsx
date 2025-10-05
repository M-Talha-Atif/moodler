import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
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
      router.push({
        pathname: "/experienceDetail",
        params: { id: experience.id },
      }),
    [router]
  );

  const handleRetry = () => refetch();

  if (loading && !homeData) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#7bf163" />
        <Text className="text-gray-600 mt-4">Loading your journey...</Text>
      </View>
    );
  }

  if (error && !homeData) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center p-6">
        <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
        <Text className="text-red-600 text-lg mb-2 mt-4 text-center">
          {error || "Failed to load data"}
        </Text>
        <Text className="text-gray-500 text-sm mb-6 text-center">
          Please check your connection and try again
        </Text>
        <TouchableOpacity
          className="bg-green-500 px-6 py-3 rounded-xl"
          onPress={handleRetry}
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <DashboardHeader
        userName={homeData?.userName}
        profilePic={homeData?.profilePic}
        greeting={homeData?.greeting}
      />

      <View className="mt-16" />

      {/* Mood Widget */}
      {homeData?.currentMood && (
        <View className="mx-6 mb-4">
          <MoodWidget mood={homeData.currentMood} />
        </View>
      )}

      {/* Streak Widget */}
      {homeData?.streak !== undefined && (
        <View className="mx-6 mb-4">
          <StreakWidget streak={homeData.streak} />
        </View>
      )}

      {/* For You Today Section */}
      <View className="mx-6 mt-4 flex-1">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-bold text-gray-900">For You Today</Text>
          <TouchableOpacity onPress={() => console.log("👀 See all clicked")}>
            <Text className="text-green-600 font-semibold">See All</Text>
          </TouchableOpacity>
        </View>

        {/* Only this scrolls */}
        <RecommendedExperiences
          experiences={homeData?.recommendedExperiences || []}
          onJoinExperience={handleJoinExperience}
          loading={loading && !homeData?.recommendedExperiences?.length}
          error={error}
          refreshing={loading && !!homeData}
          onRefresh={refetch}
        />
      </View>
    </SafeAreaView>
  );
}
