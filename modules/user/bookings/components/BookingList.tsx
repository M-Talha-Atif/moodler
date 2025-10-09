import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import BookingCard from "./BookingCard";
import BookingLoadingSkeleton from "./BookingLoadingSkeleton";
import { fetchBookings } from "../services/bookingService";
import { BookingFilters } from "../screens/BookingsScreen";

interface BookingListProps {
  filters: BookingFilters;
  onCancelPress?: (bookingId: string) => void;
  refreshTrigger?: number;
}

export default function BookingList({ filters, onCancelPress, refreshTrigger }: BookingListProps) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchBookings({
        page: 1,
        limit: 10,
        status: filters.status !== "all" ? filters.status : undefined,
        timeFilter:
          filters.timeFilter !== "anytime" ? filters.timeFilter : undefined,
      });
      setBookings(response.data || []);
      setHasMore(response.meta?.hasNextPage || false);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters, refreshTrigger]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    try {
      setLoadingMore(true);
      const nextPage = Math.ceil(bookings.length / 10) + 1;
      const response = await fetchBookings({
        page: nextPage,
        limit: 10,
        status: filters.status !== "all" ? filters.status : undefined,
        timeFilter:
          filters.timeFilter !== "anytime" ? filters.timeFilter : undefined,
      });
      setBookings((prev) => [...prev, ...response.data]);
      setHasMore(response.meta?.hasNextPage || false);
    } catch (err) {
      console.error("Error loading more:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, filters, bookings.length]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ padding: 12 }}>
      <BookingCard booking={item} onCancelPress={onCancelPress} />
    </View>
  );

  const renderFooter = () => {
    if (loadingMore) return <BookingLoadingSkeleton />;
    if (!hasMore && bookings.length > 0)
      return (
        <View style={{ paddingVertical: 20, alignItems: "center" }}>
          <Text style={{ color: "#6B7280" }}>No more bookings</Text>
        </View>
      );
    return null;
  };

  const renderEmpty = () =>
    !loading && (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 40,
        }}
      >
        <Text style={{ color: "#6B7280", fontSize: 16, marginBottom: 6 }}>
          No bookings found
        </Text>
        <Text style={{ color: "#9CA3AF", fontSize: 13 }}>
          Try adjusting filters or come back later.
        </Text>
      </View>
    );

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
      contentContainerStyle={
        bookings.length === 0 ? { flex: 1 } : undefined
      }
      showsVerticalScrollIndicator={false}
    />
  );
}
