// src/features/onboarding/components/OnboardingScreen.tsx
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { ProgressBar } from 'react-native-paper';
import ChatBubble from './ChatBubble';
import QuestionInput from './QuestionInput';
import ProgressFooter from './ProgressFooter';
import onboardingQuestions from '../utils/onboardingQuestions';
import { 
  startOnboarding, 
  answerQuestion, 
  completeOnboarding 
} from '../services/onboardingService';
import { useAuthStore } from '@/store/useAuthStore';

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<any>(null);
  const [isBuildingProfile, setIsBuildingProfile] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const { user } = useAuthStore();

  const currentQuestion = onboardingQuestions[step];

  useEffect(() => {
    const initOnboarding = async () => {
      try {
        // // Check if user already completed onboarding
        // if (user?.onboardingCompleted) {
        //   router.replace('/(tabs)');
        //   return;
        // }
        
        await startOnboarding();
        setStep(0);
      } catch (error) {
        console.error('Onboarding init error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initOnboarding();
  }, []);

  const handleNext = async () => {
    if (!currentQuestion) return;

    try {
      // Save answer
      await answerQuestion(currentQuestion.id, input);

      // Move to next step or complete
      if (step < onboardingQuestions.length - 1) {
        setStep(step + 1);
        setInput(null);
      } else {
        // Complete onboarding
        setIsBuildingProfile(true);
        
        // Simulate profile building
        const interval = setInterval(() => {
          setProgressValue((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              completeOnboarding();
              setTimeout(() => router.replace('/(tabs)'), 500);
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      }
    } catch (error) {
      console.error('Onboarding step error:', error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text>Loading onboarding...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Progress Bar */}
      <View className="px-6 pt-12">
        <ProgressBar 
          progress={isBuildingProfile ? progressValue / 100 : step / (onboardingQuestions.length - 1)} 
          color="#7bf163"
        />
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center px-6">
        {isBuildingProfile ? (
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="items-center space-y-6"
          >
            {/* Animated Gear */}
            <MotiView
              from={{ rotate: '0deg' }}
              animate={{ rotate: '360deg' }}
              transition={{
                loop: true,
                repeatReverse: false,
                type: 'timing',
                duration: 2000,
              }}
            >
              <Text className="text-5xl">⚙️</Text>
            </MotiView>
            
            <Text className="text-xl font-semibold text-center">Building your profile...</Text>
            <Text className="text-gray-600 text-center">
              Please wait while we personalize your experience
            </Text>
            
            {/* Progress Text */}
            <Text className="text-[#7bf163] font-medium">{progressValue}%</Text>
          </MotiView>
        ) : (
          <MotiView
            key={step}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="space-y-8"
          >
            {/* Emoji */}
            <View className="items-center">
              <Text className="text-5xl">🤖</Text>
            </View>

            {/* Chat Bubble */}
            <ChatBubble 
              sender="ai" 
              text={currentQuestion?.text} 
            />

            {/* Question Input */}
            {currentQuestion && (
              <QuestionInput
                type={currentQuestion.type}
                value={input}
                onChange={setInput}
                id={currentQuestion.id}
                options={currentQuestion.options}
              />
            )}
          </MotiView>
        )}
      </View>

      {/* Footer */}
      {!isBuildingProfile && currentQuestion && (
        <View className="px-6 pb-8">
          <ProgressFooter
            step={step}
            total={onboardingQuestions.length}
            onNext={handleNext}
            disabled={
              currentQuestion.type === 'chips' 
                ? !input || (Array.isArray(input) && input.length === 0)
                : currentQuestion.type !== 'toggle' && !input
            }
          />
        </View>
      )}
    </View>
  );
}