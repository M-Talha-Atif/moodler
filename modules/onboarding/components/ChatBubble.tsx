// src/features/onboarding/components/ChatBubble.tsx
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatBubbleProps {
  sender: 'ai' | 'user';
  text: string;
}

export default function ChatBubble({ sender, text }: ChatBubbleProps) {
  const isAI = sender === 'ai';

  return (
    <View className={`flex-row ${isAI ? 'justify-start' : 'justify-end'}`}>
      {isAI && (
        <View className="mr-3">
          <Ionicons name="chatbubble" size={20} color="#7bf163" />
        </View>
      )}
      
      <View 
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isAI 
            ? 'bg-white border border-gray-200 rounded-tl-none' 
            : 'bg-[#7bf163] rounded-tr-none'
        }`}
      >
        <Text className={isAI ? 'text-gray-800' : 'text-white'}>
          {text}
        </Text>
      </View>
    </View>
  );
}