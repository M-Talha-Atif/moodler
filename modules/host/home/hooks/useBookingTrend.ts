import { useQuery } from "@tanstack/react-query";
import { fetchBookingTrend } from "../services/hostHomeService";

export const useBookingTrend = (range: string) => {
  return useQuery({
    queryKey: ["booking-trend", range],
    queryFn: () => fetchBookingTrend(range),
  });
};
