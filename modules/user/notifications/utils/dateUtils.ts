import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { Notification } from "../services/notificationService";

// Extend dayjs with plugins
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const groupNotificationsByDate = (notifications: Notification[]) => {
  const groups = {
    Today: [] as Notification[],
    Yesterday: [] as Notification[],
    "Last 7 Days": [] as Notification[],
    Older: [] as Notification[],
  };

  notifications.forEach((notification) => {
    const date = dayjs(notification.createdAt);

    if (date.isToday()) {
      groups.Today.push(notification);
    } else if (date.isYesterday()) {
      groups.Yesterday.push(notification);
    } else if (date.isAfter(dayjs().subtract(7, "day"))) {
      groups["Last 7 Days"].push(notification);
    } else {
      groups.Older.push(notification);
    }
  });

  return groups;
};

export type NotificationGroups = ReturnType<typeof groupNotificationsByDate>;
