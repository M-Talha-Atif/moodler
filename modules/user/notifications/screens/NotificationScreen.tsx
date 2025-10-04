// src/modules/user/notifications/screens/NotificationsScreen.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotifications } from '../hooks/useNotification';
import LoadingSkeleton from '../components/LoadingSkeleton';
import NotificationHeader from '../components/NotificationHeader';
import ErrorState from '../components/ErrorState';
import NotificationList from '../components/NotificationList';
import MarkAllButton from '../components/MarkAllButton';

export default function NotificationsScreen() {
  const {
    groupedNotifications,
    loading,
    error,
    handleMarkAsRead,
    handleMarkAllAsRead,
    hasUnreadNotifications,
    refetch
  } = useNotifications();

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <NotificationHeader 
        hasNotifications={Object.values(groupedNotifications).some(group => group.length > 0)}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
      
      <NotificationList
        groupedNotifications={groupedNotifications}
        onMarkAsRead={handleMarkAsRead}
      />

      {hasUnreadNotifications && (
        <MarkAllButton onPress={handleMarkAllAsRead} />
      )}
    </SafeAreaView>
  );
}