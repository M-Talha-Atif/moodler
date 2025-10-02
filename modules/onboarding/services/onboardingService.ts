// src/features/onboarding/services/onboardingService.ts
import api from '@/services/apiClient';
import { useAuthStore } from '@/store/useAuthStore';

export const startOnboarding = async (): Promise<any> => {
  try {
    const response = await api.post('/onboarding/start');
    console.log('🚀 Onboarding started:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to start onboarding:', error);
    throw error;
  }
};

export const answerQuestion = async (questionId: string, answer: any): Promise<any> => {
  try {
    const response = await api.post('/onboarding/answer', { 
      question: questionId, 
      answer 
    });
    console.log('✅ Question answered:', questionId, answer);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to answer question:', error);
    throw error;
  }
};

export const setGoals = async (goals: string[]): Promise<any> => {
  try {
    const response = await api.post('/onboarding/goals', { goals });
    console.log('🎯 Goals set:', goals);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to set goals:', error);
    throw error;
  }
};

export const setActivities = async (activities: string[]): Promise<any> => {
  try {
    const response = await api.post('/onboarding/activities', { activities });
    console.log('🏃 Activities set:', activities);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to set activities:', error);
    throw error;
  }
};

export const completeOnboarding = async (): Promise<any> => {
  try {
    const response = await api.post('/onboarding/complete');
    console.log('🎉 Onboarding completed:', response.data);
    
    // Update local state
    const { updateUser } = useAuthStore.getState();
    updateUser({ onboardingCompleted: true });
    
    return response.data;
  } catch (error) {
    console.error('❌ Failed to complete onboarding:', error);
    throw error;
  }
};

export const getOnboardingStatus = async (): Promise<any> => {
  try {
    const response = await api.get('/onboarding/status');
    console.log('📊 Onboarding status:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to get onboarding status:', error);
    throw error;
  }
};