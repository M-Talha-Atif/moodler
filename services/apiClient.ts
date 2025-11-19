import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

const api = axios.create({
  baseURL: "https://ai-moodler-backend-production.up.railway.app",
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request until token is refreshed
        return new Promise(resolve => {
          subscribeTokenRefresh(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        const response = await axios.post("/auth/refresh", { refresh_token: refreshToken });
        const { access_token, refresh_token } = response.data.data;

        await AsyncStorage.setItem("auth_token", access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);

        api.defaults.headers.Authorization = `Bearer ${access_token}`;
        onRefreshed(access_token);

        return api(originalRequest);
      } catch (e) {
        // Redirect to login or handle logout
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export default api;
