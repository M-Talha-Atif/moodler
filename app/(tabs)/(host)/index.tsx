import React, { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "@/modules/common/Header";
import StatCard from "@/modules/common/components/StatCard";
import Skeleton from "@/modules/common/components/Skeleton";
import RecentBookingCard from "@/modules/host/home/components/RecentBookingCard";
import { fetchBookingStats, fetchRecentBookings } from "@/modules/host/home/services/hostHomeService";
import { router } from "expo-router";
import Button from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import SegmentedControl from "@/components/ui/segmentedControl";
import { useBookingTrend } from "@/modules/host/home/hooks/useBookingTrend";
import BookingTrendChart from "@/modules/host/home/components/BookingTrendChart";
import { Ionicons } from "@expo/vector-icons";

export default function HostHomeScreen() {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trendRange, setTrendRange] = useState("7");
  
  const { data: trendData, isLoading: trendLoading, refetch: refetchTrend } = useBookingTrend(trendRange);

  /**
   * Load dashboard data (stats and recent bookings)
   */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsData, recentData] = await Promise.all([
        fetchBookingStats(),
        fetchRecentBookings(),
      ]);
      
      setStats(statsData);
      setRecentBookings(recentData);
    } catch (err: any) {
      console.error("Error loading dashboard data:", err);
      setError(err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * useFocusEffect: Refetch data when screen comes into focus
   * This ensures data is always fresh when user navigates back
   */
  useFocusEffect(
    useCallback(() => {
      console.log("📌 HostHomeScreen focused - fetching data");
      
      // Load stats and recent bookings
      loadData();
      
      // Refetch booking trend data
      refetchTrend();

      // Optional: Cleanup function (runs when screen loses focus)
      return () => {
        console.log("📌 HostHomeScreen unfocused");
      };
    }, [loadData, refetchTrend])
  );

  return (
    <View style={styles.container}>
      <Header title="Dashboard" showBackButton={false} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Booking Stats */}
        <View style={styles.section}>
          {loading ? (
            <>
              <View style={styles.row}>
                <Skeleton height={80} width="48%" radius={16} />
                <Skeleton height={80} width="48%" radius={16} />
              </View>
              <View style={styles.row}>
                <Skeleton height={80} width="48%" radius={16} />
                <Skeleton height={80} width="48%" radius={16} />
              </View>
            </>
          ) : (
            <>
              <View style={styles.row}>
                <StatCard
                  title="Bookings Made"
                  value={stats?.total || 0}
                  subtitle="All bookings"
                  colors={["#34d399", "#10b981"]}
                />
                <StatCard
                  title="Total Earnings"
                  value={`$${stats?.revenue || 0}`}
                  subtitle="Generated"
                  colors={["#60a5fa", "#3b82f6"]}
                />
              </View>
              <View style={styles.row}>
                <StatCard
                  title="Your Experiences"
                  value={stats?.experiences || 0}
                  subtitle="Created by you"
                  colors={["#f59e0b", "#d97706"]}
                />
                <StatCard
                  title="Average Rating"
                  value={stats?.avgRating || 0}
                  subtitle="Across experiences"
                  colors={["#ec4899", "#be185d"]}
                />
              </View>
            </>
          )}
        </View>

        {/* Create Experience Buttons (Horizontal) */}
        <View style={styles.createRow}>
          <Button
            title="Design Every Detail"
            onPress={() => router.push("/(host)/createExperience")}
            width="48%"
            height={42}
            fontSize={14}
          />

          <Button
            title="AI-Assisted Setup"
            onPress={() => router.push("/(host)/hostExperienceInput")}
            backgroundColor="#EFEFE7"
            textColor="#030303"
            borderWidth={1}
            borderColor="#D1D5DB"
            width="48%"
            height={42}
            fontSize={14}
          />
        </View>

        {/* Booking Trend Section */}
        <View style={styles.trendSection}>
          {/* Segmented Control */}
          <SegmentedControl
            tabs={[
              { label: "7 Days", value: "7" },
              { label: "30 Days", value: "30" },
              { label: "90 Days", value: "90" },
            ]}
            initialValue="7"
            onChange={(v) => setTrendRange(v)}
            style={styles.segmentControl}
          />

          {/* Chart/Loading/Empty State */}
          {trendLoading ? (
            <Skeleton height={380} radius={16} style={{ marginTop: 16 }} />
          ) : trendData && Array.isArray(trendData) && trendData.length > 0 ? (
            <BookingTrendChart data={trendData} />
          ) : (
            <View style={styles.noDataContainer}>
              <View style={styles.noDataIconContainer}>
                <Ionicons name="bar-chart-outline" size={48} color="#999" />
              </View>
              <Text style={styles.noDataTitle}>No Data Available</Text>
              <Text style={styles.noDataDescription}>
                No booking data for the selected {trendRange}-day period
              </Text>
            </View>
          )}
        </View>

        {/* Recent Bookings */}
        <Text variant="header" style={styles.sectionTitle}>
          Recent Bookings
        </Text>

        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={120} radius={12} style={{ marginBottom: 8 }} />
          ))
        ) : error ? (
          <Text color="#DC2626" style={styles.centerText}>
            {error}
          </Text>
        ) : recentBookings.length === 0 ? (
          <Text color="#6B7280" style={styles.centerText}>
            No recent bookings yet.
          </Text>
        ) : (
          recentBookings.map((b) => (
            <RecentBookingCard key={b.bookingId} booking={b} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 10,
  },
  section: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  createRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  trendSection: {
    marginBottom: 24,
    backgroundColor: "#FAFAF8",
  },
  segmentControl: {
    marginBottom: 16,
  },
  noDataContainer: {
    backgroundColor: "#FAFAF8",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    borderWidth: 2,
    borderColor: "#E8E8E6",
    minHeight: 200,
  },
  noDataIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EFEFE7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#E8E8E6",
  },
  noDataTitle: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Nunito",
    color: "#030303",
    marginBottom: 6,
    textAlign: "center",
  },
  noDataDescription: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Nunito",
    color: "#666",
    textAlign: "center",
    lineHeight: 19,
  },
  sectionTitle: {
    marginBottom: 8,
    color: "#1F2937",
    fontWeight: "bold",
  },
  centerText: {
    textAlign: "center",
    marginVertical: 8,
  },
});