import { useRef, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { RefreshCcw } from "lucide-react-native";
import Header from "@/modules/common/Header";
import SearchAndFilters from "../components/SearchAndFilters";
import BookingList from "../components/BookingList";

export default function BookingsScreen() {
  const filtersRef = useRef({
    status: "all",
    timeFilter: "anytime",
    hasActiveFilters: false,
  });

  const [, forceUpdate] = useState({});

  const handleFilterChange = useCallback((key: string, value: string) => {
    filtersRef.current = {
      ...filtersRef.current,
      [key]: value,
      hasActiveFilters:
        (key === "status" && value !== "all") ||
        (key === "timeFilter" && value !== "anytime"),
    };
    forceUpdate({}); // trigger rerender for BookingList
  }, []);

  const handleClearFilters = useCallback(() => {
    filtersRef.current = {
      status: "all",
      timeFilter: "anytime",
      hasActiveFilters: false,
    };
    forceUpdate({});
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="My Bookings" />
      <View className="mt-16 mb-2" style={{ overflow: "visible", zIndex: 10 }}>
        <SearchAndFilters
          filters={filtersRef.current}
          onFilterChange={handleFilterChange}
          hasActiveFilters={filtersRef.current.hasActiveFilters}
          onClearFilters={handleClearFilters}
        />
      </View>

      <BookingList filters={filtersRef.current} />
    </SafeAreaView>
  );
}
