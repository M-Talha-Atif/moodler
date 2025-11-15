import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";

interface BookingProps {
  booking: {
    bookingId: string;
    guestName: string;
    experienceTitle: string;
    date: string;
    amount: number;
    status: "confirmed" | "pending" | "cancelled" | "completed";
    guestCount?: number;
    duration?: string;
  };
  onQuickAction?: (action: string, bookingId: string) => void;
}

export default function SimpleRecentBookingCard({ booking, onQuickAction }: BookingProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return { bg: "#E6F4EA", color: "#15803D", icon: "checkmark-circle" };
      case "pending":
        return { bg: "#FEF3C7", color: "#B45309", icon: "time" };
      case "completed":
        return { bg: "#DBEAFE", color: "#1D4ED8", icon: "trophy" };
      case "cancelled":
        return { bg: "#FEE2E2", color: "#B91C1C", icon: "close-circle" };
      default:
        return { bg: "#F3F4F6", color: "#6B7280", icon: "alert-circle" };
    }
  };

  const status = getStatusColor(booking.status);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 250 }}
      style={styles.card}
    >
      {/* Header */}
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{booking.experienceTitle}</Text>
          <Text style={styles.subtitle}>Booked by {booking.guestName}</Text>
        </View>

        <View style={[styles.statusPill, { backgroundColor: status.bg }]}>
          <Ionicons name={status.icon as any} size={14} color={status.color} />
          <Text style={[styles.statusText, { color: status.color }]}>{booking.status}</Text>
        </View>
      </View>

      {/* Main Content (Left details + Right price) */}
      <View style={styles.middleRow}>
        <View style={{ flex: 1 }}>
          <View style={styles.detailGroup}>
            <Ionicons name="calendar" size={16} color="#030303" />
            <Text style={styles.detailText}>{formatDate(booking.date)}</Text>
          </View>

          {booking.duration && (
            <View style={styles.detailGroup}>
              <Ionicons name="time" size={16} color="#030303" />
              <Text style={styles.detailText}>{booking.duration}</Text>
            </View>
          )}

          {booking.guestCount && (
            <View style={styles.detailGroup}>
              <Ionicons name="people" size={16} color="#030303" />
              <Text style={styles.detailText}>{booking.guestCount} guests</Text>
            </View>
          )}
        </View>

        {/* Price on the right side */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${booking.amount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      {booking.status === "pending" && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#E6F4EA" }]}
            onPress={() => onQuickAction?.("confirm", booking.bookingId)}
          >
            <Ionicons name="checkmark" size={14} color="#15803D" />
            <Text style={[styles.actionText, { color: "#15803D" }]}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#FEE2E2" }]}
            onPress={() => onQuickAction?.("decline", booking.bookingId)}
          >
            <Ionicons name="close" size={14} color="#B91C1C" />
            <Text style={[styles.actionText, { color: "#B91C1C" }]}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    padding: 16,
    marginBottom: 14,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
    marginLeft: 4,
  },
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  detailGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: "#333",
  },
  priceContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#030303",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
});
