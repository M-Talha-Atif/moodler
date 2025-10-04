// modules/auth/services/authService.ts
import api from "@/services/apiClient";

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

    const { access_token, user } = response.data.data;

    console.log("🔑 Raw login response:", response.data);
    console.log("✅ Extracted token:", access_token);
    console.log("✅ Extracted user:", user);

    return {
      token: access_token,
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
    await api.post("/auth/logout");
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
