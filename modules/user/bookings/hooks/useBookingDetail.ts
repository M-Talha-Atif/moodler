// src/modules/user/bookings/hooks/useBookingDetail.ts
import { useQuery } from "@tanstack/react-query";
import { fetchBookingDetail } from "../services/bookingService";

export const useBookingDetail = (bookingId: string) => {
  return useQuery({
    queryKey: ["booking-detail", bookingId],
    queryFn: () => fetchBookingDetail(bookingId),
    enabled: !!bookingId,
  });
};
