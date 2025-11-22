// modules/auth/services/authService.ts
import api from "@/services/apiClient";
import { storageService } from "@/services/storageService";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: "user" | "host";
}

export interface AuthResponse {
  token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "host";
    onboardingCompleted: boolean;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post("/auth/login", credentials);

    const { access_token, refresh_token, user } = response.data.data;

    console.log("Raw login response:", response.data);
    console.log("Extracted token:", access_token);
    console.log("Extracted user:", user);

    return {
      token: access_token,
      refresh_token: refresh_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingCompleted: user.onboardingCompleted ?? false,
      },
    };
  },

  async signup(userData: SignupData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/signup", userData);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout", {}, { withCredentials: true });
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // modules/auth/services/authService.ts
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    console.log("🔄 Attempting token refresh...");

    try {
      const response = await api.post("/auth/refresh", {
        refresh_token: refreshToken,
      });

      console.log("✅ Refresh token response received:", response.data);

      const { access_token, refresh_token } = response.data.data;

      // ⚠️ CRITICAL FIX: Refresh response doesn't include user data
      // Get user data from storage instead
      const userData = await storageService.getItem("user_data");
      let user = null;

      if (userData) {
        user = JSON.parse(userData);
        console.log("👤 Using existing user data from storage");
      } else {
        console.log("❌ No user data found in storage");
        // Optionally fetch user data from /auth/me endpoint
        try {
          const currentUserResponse = await api.get("/auth/me");
          user = currentUserResponse.data.data;
          console.log("👤 Fetched fresh user data");
        } catch (error) {
          console.log("❌ Failed to fetch user data:", error);
        }
      }

      // Store new tokens
      await storageService.setItem("auth_token", access_token);
      await storageService.setItem("refresh_token", refresh_token);

      return {
        token: access_token,
        refresh_token: refresh_token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          onboardingCompleted: user.onboardingCompleted ?? false,
        }
      };
    } catch (error: any) {
      console.log("❌ Refresh token API call failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }
};
