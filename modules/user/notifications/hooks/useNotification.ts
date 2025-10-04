// src/modules/user/notifications/hooks/useNotifications.ts
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import {
  fetchUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  type Notification
} from '../services/notificationService'
import { groupNotificationsByDate } from '../utils/dateUtils';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchUserNotifications({});
      const sorted = data.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotifications(sorted);
    } catch (err: any) {
      setError(err.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleMarkAsRead = async (id: string) => {
    try {
      // Optimistic update
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );

      await markNotificationAsRead(id);
    } catch (err: any) {
      // Rollback on error
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: false } : n)
      );
      Alert.alert('Error', 'Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Optimistic update
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));

      await markAllNotificationsAsRead();
    } catch (err: any) {
      // Rollback on error
      setNotifications(prev => prev.map(n => ({ ...n, read: false })));
      Alert.alert('Error', 'Failed to mark all notifications as read');
    }
  };

  const groupedNotifications = groupNotificationsByDate(notifications);
  const hasUnreadNotifications = notifications.some(n => !n.read);

  return {
    notifications,
    groupedNotifications,
    loading,
    error,
    handleMarkAsRead,
    handleMarkAllAsRead,
    hasUnreadNotifications,
    refetch: loadNotifications
  };
};