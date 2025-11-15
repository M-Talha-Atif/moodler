import api from "@/services/apiClient";

// Fetch overall stats for host dashboard (total bookings, earnings, etc.)
export const fetchBookingStats = async () => {
  try {
    const response = await api.get(`/host/bookings/stats`, { withCredentials: true });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching booking stats:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch booking stats");
  }
};

// Fetch recent bookings to show on host dashboard (latest activities)
export const fetchRecentBookings = async () => {
  try {
    const response = await api.get(`/host/bookings/recent`, { withCredentials: true });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching recent bookings:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch recent bookings");
  }
};

export const fetchBookingTrend = async (range: string) => {
  try {
    const { data } = await api.get("/host/bookings/trend", {
      params: { range }, // "7", "30", "90"
    });
    return data?.data || [];
  } catch (error: any) {
    console.error("Error fetching booking trend:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch trend");
  }
};

