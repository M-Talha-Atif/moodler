// modules/auth/hooks/useAuth.ts
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { getTodayMoodLog } from "@/modules/dailyCheckIn/services/moodLogService";

export const useAuth = () => {
  const router = useRouter();
  const { setLoading, setError, clearError, login, signup, logout } =
    useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      clearError();

      const response = await login(email, password);

      // daily check-in status fetch
      const todayLog = await getTodayMoodLog();
      useAuthStore.setState({
        user: { ...response.user, hasDailyCheckIn: !!todayLog },
      });

      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (
    name: string,
    email: string,
    password: string,
    role: "user" | "host",
  ) => {
    try {
      // setLoading(true);
      clearError();

      await signup(name, email, password, role);

      // Signup ke baad bas login page bhejna hai
      router.replace("/(auth)/login");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Signup failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.replace("/(auth)/login");
    }
  };

  return {
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };
};
