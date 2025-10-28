import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const baseURL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.100.6:3000";
const baseURL = 'https://concerts-mitchell-expert-bread.trycloudflare.com'
const api = axios.create({
  baseURL,
  timeout: 30000,
});

// Token inject automatically
api.interceptors.request.use(
  async (config) => {
    try {
      // await AsyncStorage.removeItem("auth_token");
      const token = await AsyncStorage.getItem("auth_token");
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Error reading token from storage:", err);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
