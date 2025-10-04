// src/modules/user/notifications/components/NotificationHeader.tsx
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

interface NotificationHeaderProps {
  hasNotifications: boolean;
  onMarkAllAsRead: () => void;
}

export default function NotificationHeader({ 
  hasNotifications, 
  onMarkAllAsRead 
}: NotificationHeaderProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      className="px-5 pt-4 pb-3 border-b border-border bg-card"
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-3xl font-bold text-foreground font-display">
            Notifications
          </Text>
          <Text className="text-muted-foreground text-sm mt-1">
            Stay updated on check-ins, events, and milestones.
          </Text>
        </View>
        
        {hasNotifications && (
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 300 }}
          >
            <Text 
              onPress={onMarkAllAsRead}
              className="text-primary font-semibold text-sm px-3 py-2 rounded-lg bg-primary/10"
              accessibilityLabel="Mark all notifications as read"
              accessibilityRole="button"
            >
              Mark All
            </Text>
          </MotiView>
        )}
      </View>
    </MotiView>
  );
}