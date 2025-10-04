// src/modules/user/notifications/services/notificationsService.ts
import api from "@/services/apiClient";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'checkin' | 'community' | 'goal' | 'event' | 'booking_confirm' | 'booking_cancel' | 'general';
  read: boolean;
  createdAt: string;
}

interface FetchNotificationsParams {
  type?: string;
  read?: boolean;
}

export const fetchUserNotifications = async (
  params: FetchNotificationsParams = {}
): Promise<Notification[]> => {
  const query = new URLSearchParams();
  if (params.type) query.append('type', params.type);
  if (params.read !== undefined) query.append('read', params.read.toString());

  const response = await api.get(`/notification?${query.toString()}`, {
    withCredentials: true,
  });
  
  if (!response.data?.data) {
    throw new Error('No notifications data received');
  }
  
  return response.data.data;
};

export const markNotificationAsRead = async (id: string): Promise<{ id: string; read: boolean }> => {
  const response = await api.patch(`/notification/${id}/read`, null, { 
    withCredentials: true 
  });
  
  if (!response.data?.data) {
    throw new Error('No response data received');
  }
  
  return response.data.data;
};

export const markAllNotificationsAsRead = async (): Promise<{ userId: string; read: boolean }> => {
  const response = await api.patch(`/notification/read-all`, null, { 
    withCredentials: true 
  });
  
  if (!response.data?.data) {
    throw new Error('No response data received');
  }
  
  return response.data.data;
};