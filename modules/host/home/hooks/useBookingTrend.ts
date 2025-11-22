import { useQuery } from "@tanstack/react-query";
import { fetchBookingTrend } from "../services/hostHomeService";

export const useBookingTrend = (range: string) => {
  return useQuery({
    queryKey: ["booking-trend", range],
    queryFn: () => fetchBookingTrend(range),
    staleTime: 0, // Always consider data stale
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window gains focus
  });
};