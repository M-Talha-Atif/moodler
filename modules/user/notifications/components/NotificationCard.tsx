import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MotiView } from "moti";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Heart,
  Users,
  Target,
  CalendarDays,
  BookOpen,
  Bell,
} from "lucide-react-native";
import { Notification } from "../services/notificationService";

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

export default function NotificationCard({
  notification,
  onMarkAsRead,
  delay = 0,
}: NotificationCardProps) {
  const IconComponent = iconMap[notification.type] || Bell;
  const timeAgo = dayjs(notification.createdAt).fromNow();

  const handlePress = () => {
    if (!notification.read) onMarkAsRead(notification.id);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 6 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 250, delay }}
      style={styles.card}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <IconComponent size={22} color="#030303" />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.title} numberOfLines={2}>
                {notification.title}
              </Text>
              <Text style={styles.time}>{timeAgo}</Text>
            </View>

            <Text style={styles.message} numberOfLines={3}>
              {notification.message}
            </Text>

            {!notification.read && (
              <TouchableOpacity onPress={() => onMarkAsRead(notification.id)}>
                <Text style={styles.markRead}>Mark as Read</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    overflow: "hidden",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    padding: 8,
    marginRight: 12,
    backgroundColor: "#E8E8E6",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 15,
    color: "#030303",
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontFamily: "Nunito",
    fontSize: 12,
    color: "#666",
  },
  message: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    marginBottom: 6,
  },
  markRead: {
    fontFamily: "Nunito",
    fontSize: 12,
    color: "#030303",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
