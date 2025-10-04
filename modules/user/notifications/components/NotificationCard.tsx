import { View, Text, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { 
  Heart, 
  Users, 
  Target, 
  CalendarDays, 
  BookOpen, 
  Bell 
} from 'lucide-react-native';
import { Notification } from '../services/notificationService';

// Enable "x minutes ago" formatting
dayjs.extend(relativeTime);

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  delay?: number;
}

const iconMap = {
  checkin: Heart,
  community: Users,
  goal: Target,
  event: CalendarDays,
  booking_confirm: BookOpen,
  booking_cancel: BookOpen,
  general: Bell,
};

const iconColors = {
  checkin: 'text-white',
  community: 'text-white',
  goal: 'text-white',
  event: 'text-white',
  booking_confirm: 'text-white',
  booking_cancel: 'text-white',
  general: 'text-white',
};

export default function NotificationCard({ 
  notification, 
  onMarkAsRead,
  delay = 0 
}: NotificationCardProps) {
  const timeAgo = dayjs(notification.createdAt).fromNow();
  const IconComponent = iconMap[notification.type];
  const iconColor = iconColors[notification.type];

  const handlePress = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', delay }}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className="rounded-2xl shadow-lg overflow-hidden mb-3"
      >
        {notification.read ? (
          // Read state - plain white background
          <View className="bg-white p-4 rounded-2xl border border-gray-200">
            <View className="flex-row items-start">
              <View className="flex-shrink-0 p-2 mr-3">
                <IconComponent 
                  size={20} 
                  className="text-gray-600" 
                />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-gray-700 font-semibold text-base flex-1 mr-2" numberOfLines={2}>
                    {notification.title}
                  </Text>
                  <Text className="text-gray-500 text-xs flex-shrink-0">
                    {timeAgo}
                  </Text>
                </View>
                <Text className="text-gray-600 text-sm leading-5 mb-2" numberOfLines={3}>
                  {notification.message}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          // Unread state - LinearGradient background (like StreakWidget)
          <LinearGradient
            colors={["#4ade80", "#22c55e"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: 16, borderRadius: 16 }}
          >
            <View className="flex-row items-start">
              <View className="flex-shrink-0 p-2 mr-3">
                <IconComponent 
                  size={20} 
                  className="text-white" 
                />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-white font-semibold text-base flex-1 mr-2" numberOfLines={2}>
                    {notification.title}
                  </Text>
                  <Text className="text-white/90 text-xs flex-shrink-0">
                    {timeAgo}
                  </Text>
                </View>
                <Text className="text-white/90 text-sm leading-5 mb-2" numberOfLines={3}>
                  {notification.message}
                </Text>
                
                {/* Mark as Read Button */}
                <MotiView
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', delay: delay + 200 }}
                >
                  <TouchableOpacity
                    onPress={() => onMarkAsRead(notification.id)}
                    className="self-start"
                  >
                    <Text className="text-white text-xs font-medium underline">
                      Mark as Read
                    </Text>
                  </TouchableOpacity>
                </MotiView>
              </View>
            </View>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </MotiView>
  );
}