import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

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
  onPress?: (bookingId: string) => void;
  onQuickAction?: (action: string, bookingId: string) => void;
}

export default function SimpleRecentBookingCard({
  booking,
  onPress,
  onQuickAction,
}: BookingProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsExpanded(!isExpanded);
    onPress?.(booking.bookingId);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 250 }}
      style={styles.card}
    >
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        {/* Header */}
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{booking.experienceTitle}</Text>
            <Text style={styles.subtitle}>{booking.guestName}</Text>
          </View>

          <View
            style={[
              styles.statusPill,
              { backgroundColor: status.bg },
            ]}
          >
            <Ionicons name={status.icon as any} size={14} color={status.color} />
            <Text style={[styles.statusText, { color: status.color }]}>
              {booking.status}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsRow}>
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
              <Text style={styles.detailText}>
                {booking.guestCount} guests
              </Text>
            </View>
          )}
        </View>

        {/* Price */}
        <View style={styles.footer}>
          <Text style={styles.price}>${booking.amount}</Text>
          <View style={styles.footerRight}>
            <Text style={styles.footerText}>
              {isExpanded ? "Collapse" : "Details"}
            </Text>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={14}
              color="#6B7280"
            />
          </View>
        </View>

        {/* Quick Actions */}
        {isExpanded && (
          <View style={styles.actionRow}>
            {booking.status === "pending" && (
              <>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: "#E6F4EA" }]}
                  onPress={() => onQuickAction?.("confirm", booking.bookingId)}
                >
                  <Ionicons name="checkmark" size={14} color="#15803D" />
                  <Text style={[styles.actionText, { color: "#15803D" }]}>
                    Confirm
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: "#FEE2E2" }]}
                  onPress={() => onQuickAction?.("decline", booking.bookingId)}
                >
                  <Ionicons name="close" size={14} color="#B91C1C" />
                  <Text style={[styles.actionText, { color: "#B91C1C" }]}>
                    Decline
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {booking.status === "confirmed" && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: "#DBEAFE" }]}
                onPress={() => onQuickAction?.("message", booking.bookingId)}
              >
                <Ionicons name="chatbubble" size={14} color="#1D4ED8" />
                <Text style={[styles.actionText, { color: "#1D4ED8" }]}>
                  Message
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
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
    padding: 16,
    marginBottom: 14,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 15,
    color: "#030303",
    fontWeight: "700",
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#555",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: "Nunito",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    gap: 10,
  },
  detailGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "700",
    color: "#030303",
  },
  footerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontFamily: "Nunito",
    fontSize: 12,
    color: "#6B7280",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
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
    fontFamily: "Nunito",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
});
