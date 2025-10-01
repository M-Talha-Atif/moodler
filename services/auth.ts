// src/services/auth.ts
import api from './apiClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'host';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'host';
  };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const signup = async (userData: SignupData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/signup', userData);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data.data;
};