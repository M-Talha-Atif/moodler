import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import Button from "@/modules/common/components/Button";
import { Booking } from "../services/bookingService";
import { MotiView } from "moti";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const router = useRouter();

  const navigateToBookingDetails = useCallback(
    () => router.push({ pathname: "/bookingDetail", params: { id: booking.id } }),
    [booking.id, router]
  );

  const navigateToExperienceDetails = useCallback(
    () => router.push({ pathname: "/experienceDetail", params: { id: booking.experienceId } }),
    [booking.experienceId, router]
  );

  const isCancelled = booking.status === "cancelled";
  const buttonLabel = isCancelled ? "Book Again" : "View Booking";
  const handlePress = isCancelled
    ? navigateToExperienceDetails
    : navigateToBookingDetails;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 6 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 250 }}
      style={styles.card}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: booking.image || "https://via.placeholder.com/400x200" }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {booking.title}
        </Text>

        {/* Mood Context (replacing meta info) */}
        {booking.mood && (
          <Text style={styles.subtitle}>
            For when you feel {booking.mood.toLowerCase()}.
          </Text>
        )}

        {/* Price + CTA */}
        <View style={styles.bottomRow}>
          <View style={styles.pricePill}>
            <Text style={styles.priceText}>
              {booking.price === 0 ? "Free" : `$${booking.price}`}
            </Text>
          </View>

          <Button
            variant="primary"
            title={buttonLabel}
            onPress={handlePress}
            style={styles.joinButton}
          />
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FAFAF8", // same as mood/streak cards
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    overflow: "hidden",
    width: "100%",
    marginBottom: 16,
  },
  imageContainer: {
    height: 140,
    width: "100%",
    backgroundColor: "#E8E8E6",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 16,
    color: "#030303",
    marginBottom: 6,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    marginBottom: 18,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pricePill: {
    borderWidth: 1,
    borderColor: "#030303",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priceText: {
    fontFamily: "Nunito",
    fontSize: 13,
    fontWeight: "600",
    color: "#030303",
  },
  joinButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
});
