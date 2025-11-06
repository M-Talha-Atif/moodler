import axios from "axios";
import { storageService } from "@/services/storageService";
import { authService } from "@/modules/auth/services/authService";

const api = axios.create({
  baseURL: 'https://salty-baboons-look.loca.lt',
  timeout: 80000,
});

api.interceptors.request.use(async (config) => {
  const token = await storageService.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    
    console.log("🚨 API Error:", {
      status: err.response?.status,
      url: originalRequest.url,
      message: err.response?.data?.message
    });

    // ⚠️ CRITICAL FIX: Don't intercept errors from the refresh endpoint itself
    if (originalRequest.url.includes('/auth/refresh')) {
      console.log("❌ Refresh endpoint failed, not retrying to avoid loop");
      return Promise.reject(err);
    }

    // Handle both 401 for testing (but NOT for refresh endpoint)
    if ((err.response?.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("🔄 Interceptor: Attempting token refresh...");

      const refreshToken = await storageService.getItem("refresh_token");
      console.log("📝 Refresh token available:", !!refreshToken);

      if (!refreshToken) {
        console.log("❌ No refresh token available");
        return Promise.reject(err);
      }

      try {
        const refreshed = await authService.refreshToken(refreshToken);
        console.log("✅ Token refresh successful");

        // Update headers with new token
        originalRequest.headers.Authorization = `Bearer ${refreshed.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("❌ Token refresh failed:", refreshError);
        
        // Clear storage on refresh failure
        await storageService.removeItem("auth_token");
        await storageService.removeItem("refresh_token");
        await storageService.removeItem("user_data");
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
