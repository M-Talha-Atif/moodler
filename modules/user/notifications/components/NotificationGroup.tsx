// src/modules/user/notifications/components/NotificationGroup.tsx
import { View, Text, FlatList } from 'react-native';
import { MotiView } from 'moti';
import NotificationCard from './NotificationCard';
import { Notification } from '../services/notificationService';

interface NotificationGroupProps {
  label: string;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  delay?: number;
}

export default function NotificationGroup({ 
  label, 
  notifications, 
  onMarkAsRead,
  delay = 0 
}: NotificationGroupProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay }}
      className="px-5 py-4"
    >
      <Text className="text-muted-foreground font-semibold text-xs uppercase tracking-wider mb-3">
        {label}
      </Text>
      
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <NotificationCard
            notification={item}
            onMarkAsRead={onMarkAsRead}
            delay={delay + (index * 50)}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </MotiView>
  );
}