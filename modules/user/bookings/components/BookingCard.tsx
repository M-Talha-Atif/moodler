import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { MotiView } from "moti";
import Button from "@/components/ui/button";
import { Booking } from "../services/bookingService";
import Ionicons from "@expo/vector-icons/Ionicons";

interface BookingCardProps {
  booking: Booking;
  onCancelPress?: (id: string) => void;
}

// Convert "8:00 PM" → "20:00"
const convertTo24Hour = (time12h: string): string => {
  if (!time12h) return "00:00";
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");
  if (modifier === "PM" && hours !== "12") hours = String(parseInt(hours, 10) + 12);
  if (modifier === "AM" && hours === "12") hours = "00";
  return `${hours.padStart(2, "0")}:${minutes}`;
};

// Create date object from date + time
const createDateTime = (dateString: string, timeString: string): Date => {
  const time24h = convertTo24Hour(timeString);
  return new Date(`${dateString}T${time24h}`);
};

export default function BookingCard({ booking, onCancelPress }: BookingCardProps) {
  const router = useRouter();
  const isCancelled = booking.status === "cancelled";
  const currentDate = new Date();

  const expStart = createDateTime(booking.date, booking.sessionStartTime);
  const expEnd = createDateTime(booking.date, booking.sessionEndTime);

  // --- Check past or future experience ---
  const isPastExperience = useCallback(() => expEnd < currentDate, [expEnd, currentDate]);
  const isFutureExperience = useCallback(() => expStart > currentDate, [expStart, currentDate]);

  // --- Button Logic ---
  let buttonLabel = "";
  let variant: "primary" | "secondary" | "destructive" = "primary";
  let onPressAction: () => void = () => {};
  let disabled = false;

  if (isCancelled) {
    if (isFutureExperience()) {
      buttonLabel = "Book Again";
      variant = "primary";
      onPressAction = () =>
        router.push({
          pathname: "/(user)/experienceDetail",
          params: { id: booking.experienceId },
        });
    } else {
      buttonLabel = "Cancelled";
      variant = "secondary";
      disabled = true;
    }
  } else if (booking.status === "confirmed") {
    if (isPastExperience()) {
      buttonLabel = "Send Feedback";
      variant = "secondary";
      onPressAction = () => console.log("Feedback flow triggered");
    } else if (isFutureExperience()) {
      buttonLabel = "Cancel Booking";
      variant = "destructive";
      onPressAction = () => onCancelPress?.(booking.id);
    } else {
      buttonLabel = "Join Experience";
      variant = "primary";
      onPressAction = () => console.log("Join experience");
    }
  }

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 250 }}
        style={[styles.card, isCancelled && styles.cancelledCard]}
      >
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.dateStatusRow}>
            <Text style={styles.createdAt}>
              Created on {new Date(booking.createdAt).toDateString()}
            </Text>
            <View
              style={[
                styles.statusChip,
                { backgroundColor: isCancelled ? "#F87171" : "#4ADE80" },
              ]}
            >
              <Text style={styles.statusText}>
                {isCancelled ? "Cancelled" : "Confirmed"}
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>

        {/* Middle Section */}
        <View style={styles.middleSection}>
          <Image
            source={{
              uri: booking.image || "https://via.placeholder.com/200x120",
            }}
            style={[styles.image, isCancelled && styles.cancelledImage]}
            resizeMode="cover"
          />

          <View style={styles.details}>
            <Text
              style={[styles.title, isCancelled && styles.cancelledText]}
              numberOfLines={2}
            >
              {booking.title}
            </Text>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#555" />
              <Text
                style={[styles.locationText, isCancelled && styles.cancelledText]}
              >
                {booking.location || "Location TBD"}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={14} color="#555" />
              <Text
                style={[styles.subDetail, isCancelled && styles.cancelledText]}
              >
                {new Date(booking.date).toDateString()}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={14} color="#555" />
              <Text
                style={[styles.subDetail, isCancelled && styles.cancelledText]}
              >
                {booking.sessionStartTime && booking.sessionEndTime
                  ? `${booking.sessionStartTime} - ${booking.sessionEndTime}`
                  : "Time TBD"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Button
            title={buttonLabel}
            onPress={onPressAction}
            backgroundColor={
              variant === "primary"
                ? "#030303"
                : variant === "secondary"
                ? "#F1F5F9"
                : "#F87171"
            }
            textColor={variant === "secondary" ? "#030303" : "#FFFFFF"}
            borderColor={variant === "secondary" ? "#E2E8F0" : "transparent"}
            borderWidth={variant === "secondary" ? 1 : 0}
            style={styles.actionButton}
            disabled={disabled}
          />

          <View style={styles.pricePill}>
            <Text style={styles.priceText}>
              {booking.price === 0 ? "Free" : `$${booking.price}`}
            </Text>
          </View>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    overflow: "hidden",
    width: "100%",
  },
  cancelledCard: { opacity: 0.8, backgroundColor: "#F8F8F8" },
  topSection: { padding: 16 },
  dateStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createdAt: { fontSize: 13, color: "#555" },
  statusChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { color: "#FFF", fontWeight: "600", fontSize: 12 },
  separator: { height: 1, backgroundColor: "#E8E8E6", marginTop: 10 },
  middleSection: { flexDirection: "row", padding: 16, gap: 14 },
  image: { width: 120, height: 140, borderRadius: 10, backgroundColor: "#E8E8E6" },
  cancelledImage: { opacity: 0.6 },
  details: { flex: 1, justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "700", color: "#030303", marginBottom: 8 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  locationText: { fontSize: 12, color: "#555" },
  subDetail: { fontSize: 12, color: "#555" },
  cancelledText: { color: "#888", textDecorationLine: "line-through" },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pricePill: {
    borderWidth: 1,
    borderColor: "#030303",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  priceText: { fontSize: 13, fontWeight: "600", color: "#030303" },
  actionButton: { height: 46 },
});
