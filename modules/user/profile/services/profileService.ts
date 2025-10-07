import api from "@/services/apiClient";

export const getInsights = async (moodDays: number = 60) => {
  try {
    const response = await api.get(`/insights?moodDays=${moodDays}`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching insights:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch insights");
  }
};

export const getMoodLogsByRange = async (start: string, end: string) => {
  try {
    const response = await api.get(`/mood-log/range?start=${start}&end=${end}`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching mood logs:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch mood logs");
  }
};
