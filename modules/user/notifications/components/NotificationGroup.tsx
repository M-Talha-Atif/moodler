import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { MotiView } from "moti";
import NotificationCard from "./NotificationCard";
import { Notification } from "../services/notificationService";

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
  delay = 0,
}: NotificationGroupProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500, delay }}
      style={styles.container}
    >
      <Text style={styles.label}>{label}</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <NotificationCard
            notification={item}
            onMarkAsRead={onMarkAsRead}
            delay={delay + index * 50}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    fontFamily: "Nunito",
    color: "#6B7280", // muted gray
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  separator: {
    height: 12,
  },
});
