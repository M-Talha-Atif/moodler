// src/modules/user/bookings/services/bookingsService.ts
import api from "@/services/apiClient";

export interface Booking {
  id: string;
  title: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  date: string;
  experienceId: string;
  image: string;
  price: number;
  sessionStartTime: string;
  sessionEndTime: string;
  location: string;
  createdAt: string;
}

export interface BookingStats {
  total: number;
  upcoming: number;
  completed: number;
}

export interface BookingsResponse {
  data: Booking[];
  meta: {
    total: number;
    hasNextPage: boolean;
    currentPage: number;
    totalPages: number;
  };
}

export interface FetchBookingsParams {
  status?: string;
  timeFilter?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// src/modules/user/bookings/services/bookingService.ts
export const fetchBookingStats = async (
  signal?: AbortSignal
): Promise<BookingStats> => {
  const response = await api.get("/user/bookings/stats", { signal });

  if (!response.data?.data) {
    throw new Error("No booking stats data received");
  }

  return response.data.data;
};


export const fetchBookings = async (
  params: FetchBookingsParams = {},
  signal?: AbortSignal
): Promise<BookingsResponse> => {
  const queryParams = new URLSearchParams();

  if (params.status && params.status !== "all") {
    queryParams.append("status", params.status);
  }
  if (params.timeFilter && params.timeFilter !== "anytime") {
    queryParams.append("timeFilter", params.timeFilter);
  }
  if (params.search) {
    queryParams.append("search", params.search);
  }
  if (params.page) {
    queryParams.append("page", params.page.toString());
  }
  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  const response = await api.get(`/user/bookings?${queryParams.toString()}`, {
    signal,
  });

  const rawData = response.data?.data?.data;
  const meta = response.data?.data?.meta;

  if (!Array.isArray(rawData)) {
    throw new Error("Invalid bookings data format received");
  }

  const mappedData: Booking[] = rawData.map((rawBooking: any) => ({
    id: rawBooking.id || "",
    title: rawBooking.experience?.title || "Untitled Experience",
  status:
      (rawBooking.status as "confirmed" | "waitlisted" | "cancelled") ||
      "confirmed",
    date: rawBooking.experience?.date || "",
    price: rawBooking.experience?.price || 0,
    image: rawBooking.experience?.image,
    sessionStartTime: rawBooking.experience?.sessionStartTime,
    sessionEndTime: rawBooking.experience?.sessionEndTime,
    location: rawBooking.experience?.location,
    experienceId: rawBooking.experience?.id || "",
    createdAt: rawBooking.createdAt,
  }));

  const limit = params.limit || 10;
  const currentPage = params.page || 1;
  const total = meta?.total || 0;
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = currentPage < totalPages;

  return {
    data: mappedData,
    meta: {
      total,
      hasNextPage,
      currentPage,
      totalPages,
    },
  };
};


// Fetch booking detail
export const fetchBookingDetail = async (bookingId: string) => {
  const response = await api.get(`/user/bookings/${bookingId}`, { withCredentials: true });
  return response.data.data; // directly return booking object
};

// Delete booking
export const deleteBooking = async (bookingId: string) => {
  const response = await api.delete(`/user/bookings/${bookingId}`, { withCredentials: true });
  return response.data;
};
