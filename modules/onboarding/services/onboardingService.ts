// src/features/onboarding/services/onboardingService.ts
import { useAuthStore } from '@/store/useAuthStore';

export const startOnboarding = async () => {
  // API call to start onboarding
  return Promise.resolve();
};

export const answerQuestion = async (questionId: string, answer: any) => {
  // Save answer to backend
  console.log('Saving answer:', questionId, answer);
  return Promise.resolve();
};

export const completeOnboarding = async () => {
  // Mark onboarding as complete
  const { updateUser } = useAuthStore.getState();
  updateUser({ onboardingCompleted: true });
  return Promise.resolve();
};