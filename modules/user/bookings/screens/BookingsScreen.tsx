// src/modules/user/bookings/screens/BookingsScreen.tsx
import { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, RefreshCcw } from "lucide-react-native";
import BookingCard from "../components/BookingCard";
import BookingsHeader from "../components/BookingsHeader";
import SearchAndFilters from "../components/SearchAndFilters";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { fetchBookings } from "../services/bookingService";
import Header from "@/modules/common/Header";

export default function BookingsScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const HEADER_HEIGHT = 100; 

  // Filters
  const [filters, setFilters] = useState({
    status: "all",
    timeFilter: "anytime",
    hasActiveFilters: false,
  });

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchBookings({
        page: 1,
        limit: 10,
        status: filters.status !== "all" ? filters.status : undefined,
        timeFilter: filters.timeFilter !== "anytime" ? filters.timeFilter : undefined,
      });

      setBookings(response.data || []);
      setHasMore(response.meta?.hasNextPage);
    } catch (err: any) {
      console.error("Error fetching bookings:", err);
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    try {
      setLoadingMore(true);
      const nextPage = Math.ceil(bookings.length / 10) + 1;

      const response = await fetchBookings({
        page: nextPage,
        limit: 10,
        status: filters.status !== "all" ? filters.status : undefined,
        timeFilter: filters.timeFilter !== "anytime" ? filters.timeFilter : undefined,
      });

      setBookings((prev) => [...prev, ...response.data]);
      setHasMore(response.meta?.hasNextPage);
    } catch (error) {
      console.error("Error loading more:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      hasActiveFilters:
        (key === "status" && value !== "all") ||
        (key === "timeFilter" && value !== "anytime"),
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      timeFilter: "anytime",
      hasActiveFilters: false,
    });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <LoadingSkeleton />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-lg text-red-600 text-center mb-4">{error}</Text>
        <TouchableOpacity
          onPress={loadBookings}
          className="flex-row items-center px-4 py-2 rounded-full bg-primary"
        >
          <RefreshCcw size={16} color="white" className="mr-2" />
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">

      {/*  Gradient Header */}
      <Header
        title="My Bookings"
        showBackButton
      />
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookingCard booking={item} />}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={loadBookings}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT - 20, // 👈 push content below header
          paddingBottom: 100,
          backgroundColor: "white",
        }}
        ListHeaderComponent={
          <>
            {/* Filters */}
            <View >
              <SearchAndFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                hasActiveFilters={filters.hasActiveFilters}
                onClearFilters={handleClearFilters}
              />
            </View>

            {/* Empty State */}
            {bookings.length === 0 && (
              <View className="items-center justify-center py-16">
                <Text className="text-lg text-gray-600 mb-2 font-medium">
                  No bookings found
                </Text>
                <Text className="text-sm text-gray-500">
                  Try changing your filters or come back later
                </Text>
              </View>
            )}
          </>
        }
        ListFooterComponent={
          hasMore && !loadingMore ? null : (
            <View className="py-8 items-center">
              {loadingMore ? (
                <>
                  <ActivityIndicator size="small" color="#3B82F6" />
                  <Text className="text-gray-500 mt-2 text-sm">
                    Loading more bookings...
                  </Text>
                </>
              ) : (
                <Text className="text-gray-500 text-sm">No more bookings to show</Text>
              )}
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
