// src/modules/user/experiences/components/ExperienceHeader.tsx
import { View, Text, Image } from 'react-native';
import { MotiView } from 'moti';

interface ExperienceHeaderProps {
  image: string;
  title: string;
  description: string;
}

export default function ExperienceHeader({ image, title, description }: ExperienceHeaderProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 600 }}
    >
      <Image
        source={{ uri: image }}
        className="w-full h-64"
        resizeMode="cover"
        accessibilityLabel={`Image for ${title}`}
      />
      
      <View className="p-5 space-y-4">
        <Text className="text-3xl font-bold text-foreground font-display">
          {title}
        </Text>
        
        <Text className="text-muted-foreground leading-relaxed text-base">
          {description}
        </Text>
      </View>
    </MotiView>
  );
}