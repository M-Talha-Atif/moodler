// modules/auth/hooks/useAuth.ts
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '../services/authService';

export const useAuth = () => {
  const router = useRouter();
  const { 
    setLoading, 
    setError, 
    loginSuccess, 
    logout: storeLogout,
    clearError 
  } = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await authService.login({ email, password });
      loginSuccess(response);
      
      // Navigate based on role
      if (response.user.role === 'user') {
        router.replace('/(user)');
      } else {
        router.replace('/(host)');
      }
      
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'user' | 'host') => {
    try {
      setLoading(true);
      clearError();
      
      const response = await authService.signup({ name, email, password, role });
      loginSuccess(response);
      
      // Navigate based on role
      if (role === 'user') {
        router.replace('/onboarding');
      } else {
        router.replace('/(host)');
      }
      
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      storeLogout();
      router.replace('/(auth)/login');
    }
  };

  return {
    login,
    signup,
    logout,
  };
};