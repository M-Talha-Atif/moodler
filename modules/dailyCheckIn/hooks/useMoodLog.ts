// src/modules/dailyCheckIn/hooks/useMoodLog.ts
import { useState } from "react";
import { ToastAndroid } from "react-native";
import { createMoodLog, getTodayMoodLog } from "../services/moodLogService";

export const useMoodLog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitMoodLog = async (data: any) => {
    try {
      setIsLoading(true);
      const result = await createMoodLog(data);
      ToastAndroid.show(
        "✅ Daily check-in completed successfully!",
        ToastAndroid.SHORT,
      );
      return result;
    } catch (error: any) {
      console.error("Failed to create mood log:", error);
      ToastAndroid.show(`❌ ${error.message}`, ToastAndroid.SHORT);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const checkTodayMoodLog = async () => {
    try {
      const todayLog = await getTodayMoodLog();
      return todayLog;
    } catch (error) {
      console.error("Error checking today's mood log:", error);
      return null;
    }
  };

  return {
    submitMoodLog,
    checkTodayMoodLog,
    isLoading,
  };
};
