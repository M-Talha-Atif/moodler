// UserProfileScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Header from "@/modules/common/Header";
import { LogOut } from "lucide-react-native";
import { useAuthStore } from "@/store/useAuthStore";
import StatCard from "@/modules/common/components/StatCard";
import MoodProgressChart from "@/modules/common/components/MoodProgressChart";
import { getInsights, getMoodLogsByRange } from "../services/insightsService";
import { Loader } from "@/components/ui/loader";
import { ErrorScreen } from "@/components/ui/errorScreen";
import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

export default function UserProfileScreen() {
  const { user, logout } = useAuthStore();
  const [insights, setInsights] = useState<any>(null);
  const [moodLogs, setMoodLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => await logout();

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

  if (loading) return <Loader message="Loading profile..." />;
  if (error) return <ErrorScreen error={error} onRetry={fetchData} />;

  const userProfile = {
    name: user?.name || "Talha",
    email: user?.email || "talha@example.com",
    image: "https://avatars.githubusercontent.com/u/9919?v=4",
  };

  return (
    <View style={styles.screen}>
      <Header title="Profile" showBackButton={false} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader {...userProfile} />

        {insights && (
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
                colors={["#FFFFFF", "#FFFFFF"]}
              />
          </View>
        )}
        <MoodProgressChart moodLogs={moodLogs} />

  
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6" },
  scrollContent: { paddingBottom: 60, paddingTop: 96, paddingHorizontal: 16 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  card: { flex: 1, marginHorizontal: 4 },
  chartContainer: { marginBottom: 24, padding: 16 },
  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 40,
  },
});
