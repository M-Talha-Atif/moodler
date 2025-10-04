// src/modules/user/experiences/components/HostCard.tsx
import { View, Text, Image } from 'react-native';
import { MotiView } from 'moti';
import { Host } from '../services/experienceService';

interface HostCardProps {
  host: Host;
}

export default function HostCard({ host }: HostCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 500, delay: 200 }}
    >
      <View className="flex-row items-center bg-card p-4 rounded-2xl border border-border shadow-sm">
        <Image
          source={
            host?.avatarUrl
              ? { uri: host.avatarUrl }
              : require('@/assets/images/default-avatar.png')
          }
          className="w-12 h-12 rounded-full mr-4"
          accessibilityLabel={`Avatar of host ${host.name}`}
        />
        <View className="flex-1">
          <Text className="font-semibold text-foreground text-base">
            {host.name}
          </Text>
          <Text className="text-muted-foreground text-sm">Experience Host</Text>
        </View>
      </View>
    </MotiView>
  );
}