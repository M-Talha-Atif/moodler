import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { NotificationGroups } from "../utils/dateUtils";
import NotificationGroup from "./NotificationGroup";
import EmptyState from "./EmptyState";

interface NotificationListProps {
  groupedNotifications: NotificationGroups;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationList({
  groupedNotifications,
  onMarkAsRead,
}: NotificationListProps) {
  const groups = Object.entries(groupedNotifications).filter(
    ([_, notes]) => notes.length > 0
  );

  if (groups.length === 0) {
    return <EmptyState />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={([label]) => label}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item: [label, notes], index }) => (
          <NotificationGroup
            label={label}
            notifications={notes}
            onMarkAsRead={onMarkAsRead}
            delay={index * 100}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F8", // light neutral like your other screens
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 100,
  },
});
