// store/useAuthStore.ts - COMPLETE FIXED VERSION
import { create } from 'zustand';
import { storageService } from '@/services/storageService'; 
import { authService, AuthResponse } from '@/modules/auth/services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'host';
  onboardingCompleted: boolean;
}

interface AuthState {
  // STATE
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // ACTIONS
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (name: string, email: string, password: string, role: 'user' | 'host') => Promise<AuthResponse>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  updateUser: (updates: Partial<User>) => void;
  completeOnboarding: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // INITIAL STATE
  user: null,
  token: null,
  isLoading: false,
  error: null,

  // LOGIN WITH REAL API
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      set({ isLoading: true, error: null });
      
      // Call real API
      const response: AuthResponse = await authService.login({ email, password });
      
      // Store token and user data
      await storageService.setItem('auth_token', response.token);
      await storageService.setItem('user_data', JSON.stringify(response.user));
      
      // Update state
      set({
        user: response.user,
        token: response.token,
        isLoading: false,
        error: null,
      });
      
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // SIGNUP WITH REAL API
  signup: async (name: string, email: string, password: string, role: 'user' | 'host'): Promise<AuthResponse> => {
    try {
      set({ isLoading: true, error: null });
      
      // Call real API
      const response: AuthResponse = await authService.signup({ name, email, password, role });
      
      // Store token and user data
      await storageService.setItem('auth_token', response.token);
      
      // Create user with onboarding not completed for new signups
      const userWithOnboarding = { 
        ...response.user, 
        onboardingCompleted: false 
      };
      
      await storageService.setItem('user_data', JSON.stringify(userWithOnboarding));
      
      // Update state
      set({
        user: userWithOnboarding,
        token: response.token,
        isLoading: false,
        error: null,
      });
      
      return { ...response, user: userWithOnboarding };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage and state
      await storageService.removeItem('auth_token');
      await storageService.removeItem('user_data');
      set({
        user: null,
        token: null,
        isLoading: false,
        error: null,
      });
    }
  },

  // CHECK AUTH ON APP START
  checkAuth: async () => {
    try {
      const token = await storageService.getItem('auth_token');
      const userData = await storageService.getItem('user_data');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        set({
          user,
          token,
        });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Clear invalid data
      await storageService.removeItem('auth_token');
      await storageService.removeItem('user_data');
    }
  },

  // COMPLETE ONBOARDING
  completeOnboarding: async () => {
    try {
      const { user } = get();
      if (!user) return;

      // Update user with onboarding completed
      const updatedUser = { ...user, onboardingCompleted: true };
      
      // Update state
      set({ user: updatedUser });
      
      // Update storage
      await storageService.setItem('user_data', JSON.stringify(updatedUser));
      
      console.log('✅ Onboarding marked as completed');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  },

  // UTILITY ACTIONS
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  updateUser: (updates: Partial<User>) => {
    set((state) => {
      const updatedUser = state.user ? { ...state.user, ...updates } : null;
      
      // Also update storage
      if (updatedUser) {
        storageService.setItem('user_data', JSON.stringify(updatedUser));
      }
      
      return { user: updatedUser };
    });
  },
}));