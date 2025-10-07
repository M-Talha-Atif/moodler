import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import BookingCard from "./BookingCard";
import BookingLoadingSkeleton from "./BookingLoadingSkeleton";
import { fetchBookings } from "../services/bookingService";

interface BookingListProps {
  filters: {
    status: string;
    timeFilter: string;
  };
}

export default function BookingList({ filters }: BookingListProps) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // ---- FETCH BOOKINGS ----
  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchBookings({
        page: 1,
        limit: 10,
        status: filters.status !== "all" ? filters.status : undefined,
        timeFilter: filters.timeFilter !== "anytime" ? filters.timeFilter : undefined,
      });
      setBookings(response.data || []);
      setHasMore(response.meta?.hasNextPage);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters]);

  // ---- LOAD MORE ----
  const loadMore = useCallback(async () => {
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
    } catch (err) {
      console.error("Error loading more:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, filters, bookings.length]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // ---- RENDER ITEM ----
  const renderItem = ({ item }) => (
    <View className="p-4">
      <BookingCard booking={item} />
    </View>
  );

  // ---- FOOTER ----
  const renderFooter = () => {
    if (loadingMore) {
      return <BookingLoadingSkeleton />;
    }
    if (!hasMore && bookings.length > 0) {
      return (
        <View className="py-4 items-center">
          <Text className="text-gray-500">No more bookings</Text>
        </View>
      );
    }
    return null;
  };

  // ---- EMPTY ----
  const renderEmpty = () =>
    !loading && (
      <View className="flex-1 justify-center items-center py-20">
        <Text className="text-gray-500 text-lg mb-2">No bookings found</Text>
        <Text className="text-sm text-gray-400">
          Try adjusting filters or come back later.
        </Text>
      </View>
    );

  // ---- LOADING ----
  if (loading) return <BookingLoadingSkeleton />;

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={loadBookings}
          colors={["#22c55e"]}
        />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={bookings.length === 0 ? { flex: 1 } : undefined}
      showsVerticalScrollIndicator={false}
    />
  );
}
