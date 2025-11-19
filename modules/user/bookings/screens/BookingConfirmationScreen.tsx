import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBookingDetail } from "@/modules/user/bookings/hooks/useBookingDetail";
import Button from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Separator from "@/components/ui/separator";

export default function BookingConfirmationScreen() {
  const { bookingId } = useLocalSearchParams();
  // const bookingId = "8039bfba-1f45-4de7-9077-0f89baaaf3ef"
  const router = useRouter();

  const { data: booking, isLoading } = useBookingDetail(bookingId as string);
  React.useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingWrap}>
        <Text variant="body">Loading booking details...</Text>
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.loadingWrap}>
        <Text variant="body">No booking found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Close */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.push("/")}>
        <Text style={{ fontSize: 26 }}>×</Text>
      </TouchableOpacity>

      {/* Success */}
      <View style={styles.successCircle}>
        <Text style={{ fontSize: 34, color: "#0BDE73" }}>✔</Text>
      </View>

      <Text style={styles.title}>
        Your booking is confirmed, Talha!
      </Text>

      <Text style={styles.subtitle}>
        You're all set for an amazing experience.
      </Text>

      {/* Experience Banner */}
      <Image source={{ uri: booking.image }} style={styles.banner} />
      <Text style={styles.expTitle}>
        {booking.title}
      </Text>

      <Separator margin={14} />

      {/* Info */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.bodyText}>{booking.date.split("T")[0]}</Text>
        </View>

        <View style={styles.col}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.bodyText}>{booking.time?.split("T")[1]?.slice(0, 5)}</Text>
        </View>

        <View style={styles.col}>
          <Text style={styles.label}>Host</Text>
          <Text style={styles.bodyText}>{booking.hostName}</Text>
        </View>
      </View>

      {/* Location / Meeting */}
      <Separator margin={24} />

      {booking.isVirtual ? (
        <View style={styles.meetingContainer}>
          <View style={styles.iconRow}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>🔗</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.sectionTitle}>Virtual Event</Text>
              <Text style={styles.descriptionText}>
                Join using the link below
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => router.push(booking.meetingLink)}
          >
            <Text style={styles.meetingLink}>{booking.meetingLink}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.locationContainer}>
          <View style={styles.iconRow}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>📍</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.sectionTitle}>Location</Text>
              <Text style={styles.descriptionText}>
                {booking.location}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Attendees */}
      <Separator margin={24} />

      <Text style={styles.sectionTitleWithMargin}>
        Attendees ({booking.attendees.length})
      </Text>

      <View style={styles.attendeesRow}>
        {booking.attendees.map((u: any) => (
          <View key={u.userId} style={styles.attendeeCard}>
            <Image
              source={{ uri: u.avatarUrl || "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
            <Text style={styles.attendeeName}>
              {u.name}
            </Text>
          </View>
        ))}
      </View>

      {/* Auto-close notice */}
      <Text style={styles.autoCloseText}>
        Returning to dashboard in 5 seconds...
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF"
  },
  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E9FFF2",
    alignSelf: "center",
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    color: "#030303",
    textAlign: "center",
    marginTop: 20
  },
  subtitle: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 20
  },
  expTitle: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: "#1F2937",
    textAlign: "center",
    marginTop: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14
  },
  col: {
    flex: 1,
    alignItems: "center"
  },
  label: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: "#1F2937"
  },
  bodyText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    color: "#111827",
    marginTop: 6
  },

  // Icon styles
  iconRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: "#1F2937"
  },
  sectionTitleWithMargin: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: "#1F2937",
    marginBottom: 8
  },
  descriptionText: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#6B7280",
    marginTop: 4
  },

  // Virtual meeting styles
  meetingContainer: {
    marginTop: 10,
  },
  linkContainer: {
    marginTop: 12,
    marginLeft: 52,
  },
  meetingLink: {
    fontFamily: "System",
    fontSize: 13,
    fontWeight: "400",
    color: "#007AFF",
  },

  // Location styles
  locationContainer: {
    marginTop: 10,
  },

  // Attendees styles
  attendeesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 10,
  },
  attendeeCard: {
    alignItems: "center",
    width: 70
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30
  },
  attendeeName: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center"
  },

  // Button styles
  buttonContainer: {
    marginTop: 28,
  },
  primaryButton: {
    backgroundColor: "#00E676",
    width: "100%",
    height: 52,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#030303",
  },
  secondaryButton: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    color: "#030303",
    textAlign: "center",
  },
  autoCloseText: {
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 20
  }
});