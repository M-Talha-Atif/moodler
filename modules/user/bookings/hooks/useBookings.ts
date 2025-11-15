// src/modules/user/bookings/hooks/useBookings.ts
import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchBookingStats,
  fetchBookings,
  type Booking,
  type BookingStats,
} from "../services/bookingService";
import { debounce } from "lodash";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingStats, setBookingStats] = useState<BookingStats>({
    total: 0,
    upcoming: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [status, setStatus] = useState<
    "all" | "confirmed" | "waitlisted" | "cancelled"
  >("all");
  const [timeFilter, setTimeFilter] = useState<
    "anytime" | "today" | "tomorrow" | "weekend" | "next-week"
  >("anytime");
  const [search, setSearch] = useState("");

  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const [error, setError] = useState<string | null>(null);

  // Active filter tracker
  const hasActiveFilters =
    status !== "all" || timeFilter !== "anytime" || search !== "";

  // Safe data fetcher
  const fetchData = useCallback(
    async (pageNum = 1, append = false) => {
      if (!isMountedRef.current) return;

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      if (!append) setLoading(true);

      try {
        const [statsRes, bookingsRes] = await Promise.allSettled([
          fetchBookingStats({ signal: controller.signal }),
          fetchBookings(
            {
              status: status === "all" ? undefined : status,
              timeFilter: timeFilter === "anytime" ? undefined : timeFilter,
              search: search || undefined,
              page: pageNum,
              limit: 10,
            },
            controller.signal
          ),
        ]);

        if (!isMountedRef.current) return;

        // Update stats safely
        if (statsRes.status === "fulfilled") {
          setBookingStats(statsRes.value);
        }

        // Update bookings safely
        if (bookingsRes.status === "fulfilled") {
          const data = bookingsRes.value.data || [];
          const meta = bookingsRes.value.meta || {};

          setBookings((prev) =>
            append ? [...prev, ...data] : data
          );
          setHasMore(meta.hasNextPage ?? data.length > 0);
          setPage(pageNum);
          setError(null);
        }
      } catch (err: any) {
        if (!isMountedRef.current) return;
        if (err.name !== "AbortError") {
          console.error("❌ Booking fetch error:", err);
        }
        setError(err.message || "Failed to load bookings");
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
          setRefreshing(false);
          setLoadingMore(false);
        }
      }
    },
    [status, timeFilter, search]
  );

  //  Debounce search to prevent spamming requests
  const debouncedFetch = useRef(
    debounce((fn) => fn(), 400)
  ).current;

  //  Initial load (runs once)
  useEffect(() => {
    isMountedRef.current = true;
    fetchData(1, false);

    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
      debouncedFetch.cancel();
    };
  }, []);

  // Refetch when filters change (debounced)
  useEffect(() => {
    if (!isMountedRef.current) return;
    debouncedFetch(() => fetchData(1, false));
  }, [status, timeFilter, search, fetchData]);

  // Pull-to-refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(1, false);
  }, [fetchData]);

  // ✅ Infinite scroll
  const handleLoadMore = useCallback(() => {
    if (!hasMore || loading || refreshing || loadingMore) return;
    setLoadingMore(true);
    fetchData(page + 1, true);
  }, [hasMore, loading, refreshing, loadingMore, page, fetchData]);

  // ✅ Filter helpers
  const handleFilterChange = (key: string, value: any) => {
    if (key === "status") setStatus(value);
    if (key === "timeFilter") setTimeFilter(value);
  };

  const handleClearFilters = () => {
    setStatus("all");
    setTimeFilter("anytime");
    setSearch("");
  };

  // ✅ Clean, safe API for consumers
  return {
    bookings,
    bookingStats,
    error,
    loading,
    loadingMore,
    refreshing,
    filters: {
      status,
      timeFilter,
      search,
      hasActiveFilters,
    },
    pagination: {
      hasMore,
      total: bookingStats.total,
    },
    handleFilterChange,
    handleSearch: setSearch,
    handleLoadMore,
    handleClearFilters,
    handleRefresh,
    refetch: () => fetchData(1, false),
  };
};
