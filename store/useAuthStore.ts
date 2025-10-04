// store/useAuthStore.ts
import { create } from "zustand";
import { storageService } from "@/services/storageService";
import { authService, AuthResponse } from "@/modules/auth/services/authService";
import { getTodayMoodLog } from "@/modules/dailyCheckIn/services/moodLogService";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "host";
  onboardingCompleted: boolean;
  hasDailyCheckIn: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // actions
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: "user" | "host",
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  updateUser: (updates: Partial<User>) => void;
  completeOnboarding: () => Promise<void>;
  fetchDailyCheckIn: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });

      const response: AuthResponse = await authService.login({
        email,
        password,
      });
      console.log("📥 Store received login response:", response);

      const userWithDefaults: User = {
        ...response.user,
        onboardingCompleted: response.user.onboardingCompleted ?? false,
        hasDailyCheckIn: false,
      };

      await storageService.setItem("auth_token", response.token);
      await storageService.setItem(
        "user_data",
        JSON.stringify(userWithDefaults),
      );

      set({
        user: userWithDefaults,
        token: response.token,
        isLoading: false,
        error: null,
      });

      return { ...response, user: userWithDefaults };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  signup: async (name, email, password, role) => {
    try {
      set({ isLoading: true, error: null });
      await authService.signup({ name, email, password, role });
      set({ isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      await storageService.removeItem("auth_token");
      await storageService.removeItem("user_data");
      set({ user: null, token: null, isLoading: false, error: null });
    }
  },

  checkAuth: async () => {
    try {
      const token = await storageService.getItem("auth_token");
      const userData = await storageService.getItem("user_data");
      if (token && userData) {
        const user = JSON.parse(userData);
        set({ user, token, isLoading: false });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      await storageService.removeItem("auth_token");
      await storageService.removeItem("user_data");
    }
  },

  completeOnboarding: async () => {
    const { user } = get();
    if (!user) return;
    const updatedUser = { ...user, onboardingCompleted: true };
    set({ user: updatedUser });
    await storageService.setItem("user_data", JSON.stringify(updatedUser));
  },

  fetchDailyCheckIn: async () => {
    try {
      const log = await getTodayMoodLog();
      set((state) => ({
        user: state.user
          ? { ...state.user, hasDailyCheckIn: !!log }
          : state.user,
      }));
    } catch (err) {
      console.error("Daily check-in fetch failed", err);
    }
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  updateUser: (updates) => {
    set((state) => {
      const updatedUser = state.user ? { ...state.user, ...updates } : null;
      if (updatedUser) {
        storageService.setItem("user_data", JSON.stringify(updatedUser));
      }
      return { user: updatedUser };
    });
  },
}));
