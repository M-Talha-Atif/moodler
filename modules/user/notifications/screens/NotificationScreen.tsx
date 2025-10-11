import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { CheckCircle2 } from "lucide-react-native";
import Header from "@/modules/common/Header";
import { useNotifications } from "../hooks/useNotification";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";
import NotificationList from "../components/NotificationList";

export default function NotificationsScreen() {
  const {
    groupedNotifications,
    loading,
    error,
    handleMarkAsRead,
    handleMarkAllAsRead,
    hasUnreadNotifications,
    refetch,
  } = useNotifications();

  if (loading) return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerWrapper}>
        <Header
          title="Notifications"
          showBackButton
          rightIcon={
            hasUnreadNotifications ? (
              <CheckCircle2 size={22} color="#030303" />
            ) : undefined
          }
          onRightPress={hasUnreadNotifications ? handleMarkAllAsRead : undefined}
        />
      </View>
      <View style={styles.listWrapper}>
        <LoadingSkeleton />
      </View>

    </SafeAreaView>
  );

  if (error) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Fixed header */}
      <View style={styles.headerWrapper}>
        <Header
          title="Notifications"
          showBackButton
          rightIcon={
            hasUnreadNotifications ? (
              <CheckCircle2 size={22} color="#030303" />
            ) : undefined
          }
          onRightPress={hasUnreadNotifications ? handleMarkAllAsRead : undefined}
        />
      </View>

      {/* Scrollable list below header */}
      <View style={styles.listWrapper}>
        <NotificationList
          groupedNotifications={groupedNotifications}
          onMarkAsRead={handleMarkAsRead}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  headerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#FAFAF8",
  },
  listWrapper: {
    flex: 1,
    paddingTop: 60, // space for header height
    paddingBottom: 60, // space for header height
  },
});
