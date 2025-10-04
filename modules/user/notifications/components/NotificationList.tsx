// src/modules/user/notifications/components/NotificationList.tsx
import { FlatList, View } from 'react-native';
import { NotificationGroups } from '../utils/dateUtils';
import NotificationGroup from './NotificationGroup';
import EmptyState from './EmptyState';

interface NotificationListProps {
  groupedNotifications: NotificationGroups;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationList({ 
  groupedNotifications, 
  onMarkAsRead 
}: NotificationListProps) {
  const groups = Object.entries(groupedNotifications).filter(([_, notes]) => notes.length > 0);

  if (groups.length === 0) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={groups}
      keyExtractor={([label]) => label}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-24"
      renderItem={({ item: [label, notes], index }) => (
        <NotificationGroup
          label={label}
          notifications={notes}
          onMarkAsRead={onMarkAsRead}
          delay={index * 100}
        />
      )}
      className="flex-1"
    />
  );
}