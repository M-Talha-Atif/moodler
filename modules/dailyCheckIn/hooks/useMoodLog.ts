// src/modules/dailyCheckIn/hooks/useMoodLog.ts
import { useState } from "react";
import { ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";
import { createMoodLog, getTodayMoodLog } from "../services/moodLogService";

export const useMoodLog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitMoodLog = async (data: any) => {
    try {
      setIsLoading(true);
      const result = await createMoodLog(data);

      Toast.show({
        type: 'success',
        text1: 'Thank you!',
        text2: 'Your mood has been submitted successfully.',
        position: 'bottom',
        visibilityTime: 2000,
      });

      return result;
    } catch (error: any) {
      console.error("Failed to create mood log:", error);

      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: error.message,
        position: 'bottom',
        visibilityTime: 2000,
      });

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
