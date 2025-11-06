// services/storageService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageService = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
      console.log(" Storage - Set:", key);
    } catch (error) {
      console.error("Error storing data:", error);
      // Don't throw, just log
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log(" Storage - Get:", key, value ? "✓" : "null");
      return value;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      console.log(" Storage - Remove:", key);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log(" Storage - Cleared");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
