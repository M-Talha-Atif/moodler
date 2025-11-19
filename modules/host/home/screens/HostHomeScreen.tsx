import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "@/modules/common/Header";
import StatCard from "@/modules/common/components/StatCard";
import Skeleton from "@/modules/common/components/Skeleton";
import RecentBookingCard from "../components/RecentBookingCard";
import { fetchBookingStats, fetchRecentBookings } from "../services/hostHomeService";
import { router } from "expo-router";
import Button from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import SegmentedControl from "@/components/ui/segmentedControl";
import { useBookingTrend } from "../hooks/useBookingTrend";
import BookingTrendChart from "../components/BookingTrendChart";

export default function HostHomeScreen() {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [trendRange, setTrendRange] = useState("7");
  const { data: trendData, isLoading: trendLoading } = useBookingTrend(trendRange);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const statsData = await fetchBookingStats();
        const recentData = await fetchRecentBookings();
        setStats(statsData);
        setRecentBookings(recentData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // In your HostHomeScreen component, add this:
  console.log('Trend data:', trendData);
  console.log('Trend range:', trendRange);
  console.log('Trend loading:', trendLoading);


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
                  value={stats.total || 0}
                  subtitle="All bookings"
                  colors={["#34d399", "#10b981"]}
                />
                <StatCard
                  title="Total Earnings"
                  value={`$${stats.revenue || 0}`}
                  subtitle="Generated"
                  colors={["#60a5fa", "#3b82f6"]}
                />
              </View>
              <View style={styles.row}>
                <StatCard
                  title="Your Experiences"
                  value={stats.experiences || 0}
                  subtitle="Created by you"
                  colors={["#f59e0b", "#d97706"]}
                />
                <StatCard
                  title="Average Rating"
                  value={stats.avgRating || 0}
                  subtitle="Across experiences"
                  colors={["#ec4899", "#be185d"]}
                />
              </View>
            </>
          )}
        </View>



        {/* Create Experience Buttons (Horizontal) */}
        <View style={styles.createRow}>
          {/* Default filled button (from your Button.tsx) */}
          <Button
            title="Design Every Detail"
            onPress={() => router.push("/(host)/createExperience")}
            width="48%"
            height={42}
            fontSize={14}
          />

          {/* Neutral outlined button */}
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
        <View style={{ marginBottom: 24 }}>
          <SegmentedControl
            tabs={[
              { label: "7 Day", value: "7" },
              { label: "30 Day", value: "30" },
              { label: "90 Day", value: "90" },
            ]}
            initialValue="7"
            onChange={(v) => setTrendRange(v)}
          />

          {trendLoading ? (
            <Skeleton height={200} radius={12} />
          ) : trendData && Array.isArray(trendData) && trendData.length > 0 ? (
            <BookingTrendChart data={trendData} />
          ) : (
            <View style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              justifyContent: 'center',
              height: 200
            }}>
              <Text style={{ color: '#6B7280' }}>
                No booking data available for selected period
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
  sectionTitle: {
    marginBottom: 8,
    color: "#1F2937",
    fontWeight: "bold"
  },
  centerText: {
    textAlign: "center",
    marginVertical: 8,
  },
});
