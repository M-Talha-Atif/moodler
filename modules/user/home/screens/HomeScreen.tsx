// src/modules/user/home/screens/HomeScreen.tsx
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useHome } from "../hooks/useHome";
import StreakWidget from "../components/StreakWidget";
import MoodWidget from "../components/MoodWidget";
import RecommendedExperiences from "../components/RecommendedExperiences";
import { Experience } from "../services/homeService";

export default function HomeScreen() {
  const router = useRouter();
  const { homeData, loading, error, refetch } = useHome();

  const handleJoinExperience = (experience: Experience) => {
    Alert.alert(
      "Join Experience",
      `Are you sure you want to join "${experience.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Join", 
          onPress: () => {
            Alert.alert("Success", `You've joined ${experience.title}!`);
          }
        }
      ]
    );
  };

  const handleRetry = () => {
    refetch();
  };

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
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
      refreshControl={
        <RefreshControl
          refreshing={loading && !!homeData}
          onRefresh={refetch}
          colors={["#7bf163"]}
          tintColor="#7bf163"
        />
      }
    >
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-6">
        <View className="flex-row justify-between items-center mb-6">
          <MotiView
            from={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Text className="text-2xl font-bold text-gray-900">
              {homeData?.greeting}, {homeData?.userName} 👋
            </Text>
            <Text className="text-gray-600 mt-1">
              Ready to make today meaningful?
            </Text>
          </MotiView>

          {/* Profile + Notifications */}
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              className="relative"
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#374151"
              />
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Image
                source={{ uri: homeData?.profilePic }}
                className="w-9 h-9 rounded-full border border-gray-200"
                // defaultSource={require('../../../../assets/images/default-avatar.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Mood */}
      {homeData?.currentMood && (
        <View className="mx-6 mb-4">
          <MoodWidget mood={homeData.currentMood} />
        </View>
      )}

      {/* Streak */}
      {homeData?.streak !== undefined && (
        <View className="mx-6 mb-4">
          <StreakWidget streak={homeData.streak} />
        </View>
      )}

      {/* Recommended */}
      <View className="mx-6">
        <RecommendedExperiences
          experiences={homeData?.recommendedExperiences || []}
          onJoinExperience={handleJoinExperience}
          loading={loading}
          error={error}
        />
      </View>
    </ScrollView>
  );
}