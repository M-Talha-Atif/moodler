import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "@/modules/common/Header";
import { useAuthStore } from "@/store/useAuthStore";
import StatCard from "@/modules/common/components/StatCard";
import MoodProgressChart from "@/modules/common/components/MoodProgressChart";
import { getInsights, getMoodLogsByRange } from "../services/insightsService";
import { Loader } from "@/components/ui/loader";
import { ErrorScreen } from "@/components/ui/errorScreen";
import { Text } from "@/components/ui/text";

export default function InsightsScreen() {
  const { user } = useAuthStore();
  const [insights, setInsights] = useState<any>(null);
  const [moodLogs, setMoodLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const insightsData = await getInsights(60);
      const moodLogsData = await getMoodLogsByRange("2025-09-01", "2025-11-30");
      setInsights(insightsData);
      setMoodLogs(moodLogsData);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader message="Gathering your insights..." />;
  if (error) return <ErrorScreen error={error} onRetry={fetchData} />;

  const userName = user?.name?.split(" ")[0] || "Talha";

  const getEmotionMessage = (avg: number) => {
    if (avg >= 8) return "You’ve been glowing with positivity lately. Keep it up 🌞";
    if (avg >= 5) return "Your emotional balance looks steady — keep nurturing your calm 🌿";
    if (avg > 0) return "It’s okay to have ups and downs. Every emotion teaches you something 💭";
    return "Start tracking your moods to see your emotional story unfold ✨";
  };

  return (
    <View style={styles.screen}>
      <Header title="Your Journey" showBackButton={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome message */}
        <View style={styles.introContainer}>
          <Text style={styles.greeting}>Hey {userName} 👋</Text>
          <Text style={styles.subGreeting}>
            Here’s a gentle look into your emotional journey over the past months.
          </Text>
        </View>

        {/* Stats */}
        {insights && (
          <>
            <View style={styles.statsRow}>
              <StatCard
                title="Mood Average"
                value={`${insights.moodAvg || 0}/10`}
                subtitle="Last 60 days"
              />
              <StatCard
                title="Total Bookings"
                value={insights.experiences || 0}
                subtitle="Confirmed Experiences"
              />
            </View>

            {/* Emotional reflection */}
            <View style={styles.reflectionCard}>
              <Text style={styles.reflectionText}>
                {getEmotionMessage(insights.moodAvg || 0)}
              </Text>
            </View>
          </>
        )}

        {/* Mood chart */}
        <MoodProgressChart moodLogs={moodLogs} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6" },
  scrollContent: { paddingBottom: 60, paddingTop: 10, paddingHorizontal: 16 },
  introContainer: {
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  greeting: {
    fontFamily: "Nunito",
    fontSize: 22,
    fontWeight: "700",
    color: "#030303",
    marginBottom: 4,
  },
  subGreeting: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  reflectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 28,
  },
  reflectionText: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#333",
    lineHeight: 21,
  },
});
