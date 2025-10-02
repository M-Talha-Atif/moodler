// services/storageService.ts
import * as SecureStore from 'expo-secure-store';

export const storageService = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      // Note: SecureStore doesn't have a clear method, so we remove items individually
      // You'll need to track which keys you want to clear
      console.warn('SecureStore clear not implemented - remove items individually');
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};