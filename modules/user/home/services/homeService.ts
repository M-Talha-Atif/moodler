// src/modules/user/home/services/homeService.ts
import api from "@/services/apiClient";

export interface Host {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  isVirtual: boolean;
  sessionStartTime: string;
  sessionEndTime: string;
  price: number;
  timezone: string;
  totalSpots: number;
  spotsFilled: number;
  targetEmotions: string[];
  desiredOutcomes: string[];
  language: string;
  culturalTags: string[];
  host: Host;
  createdAt: string;
}

export interface HomeData {
  userName: string;
  profilePic: string;
  streak: number;
  currentMood: string;
  greeting: string;
  recommendedExperiences: Experience[];
}

// Fetch recommendation experiences
const fetchRecommendationExperiences = async (): Promise<Experience[]> => {
  const response = await api.get(`/recommendations`, { withCredentials: true });
  return response.data;
};

// Get mood streak
const getMoodStreak = async (): Promise<{ streak: number; totalDaysLogged: number }> => {
  try {
    const res = await api.get('/mood-log/streak', {
      withCredentials: true,
    });
    return res.data?.data ?? null;
  } catch (error) {
    console.error('Error fetching mood streak:', error?.response?.data || error.message || error);
    throw error;
  }
};

// Get today's mood log - you'll need to implement this based on your API
const getTodayMoodLog = async (): Promise<{ 
  id: string; 
  userId: string; 
  moodLabel: string; 
  note: string | null; 
  textSentiment: string; 
  photoEmotion: string | null; 
  voiceTranscript: string | null; 
  voiceSentiment: string; 
  sameAsYesterday: boolean; 
  finalMood: string; 
  createdAt: object 
} | null> => {
  try {
    const response = await api.get('/mood-log/today', { withCredentials: true });
    return response.data?.data ?? null;
  } catch (error) {
    // Return null if no mood log exists for today (404)
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching today\'s mood log:', error?.response?.data || error.message || error);
    throw error;
  }
};

const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const homeService = {
  async getHomeData(): Promise<HomeData> {
    try {
      const [moodStreakData, todayMoodData, experiencesData] = await Promise.all([
        getMoodStreak(),
        getTodayMoodLog(),
        fetchRecommendationExperiences()
      ]);

      // Handle today's mood - use finalMood or default to neutral
      let currentMood = "😊"; // Default fallback
      if (todayMoodData && todayMoodData.finalMood) {
        currentMood = todayMoodData.finalMood;
      }

      return {
        userName: "talha", // This would come from user context/auth
        profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        streak: moodStreakData?.streak || 0,
        currentMood,
        greeting: getTimeBasedGreeting(),
        recommendedExperiences: experiencesData || []
      };
    } catch (error) {
      console.error('Home service error:', error);
      throw error;
    }
  },
};