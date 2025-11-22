import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBookingDetail } from "@/modules/user/bookings/hooks/useBookingDetail";
import { Text } from "@/components/ui/text";
import Separator from "@/components/ui/separator";
import { Mail, QrCode, Calendar, Clock, MapPin, Link, X } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "@/store/useAuthStore";


export default function BookingConfirmationScreen() {
  const { bookingId } = useLocalSearchParams();
  const router = useRouter();
  const userEmail = useAuthStore((state) => state.user?.email) || "your-email@example.com";

  const { data: booking, isLoading } = useBookingDetail(bookingId as string);

  React.useEffect(() => {
    // Auto-close after 30 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingWrap}>
        <Text variant="body" color="#6B7280">Loading booking details...</Text>
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.loadingWrap}>
        <Text variant="body" color="#6B7280">No booking found.</Text>
      </View>
    );
  }


  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Close Button */}
      <TouchableOpacity 
        style={styles.closeBtn} 
        onPress={() => router.push("/")}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={28} color="#030303" strokeWidth={2} />
      </TouchableOpacity>

      {/* Success Hero Section */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={["#00E676", "#0BDE73"]}
          style={styles.successCircle}
        >
          <Text style={styles.checkmark}>✓</Text>
        </LinearGradient>

        <Text variant="display" style={styles.title}>
          Booking Confirmed!
        </Text>

        <Text variant="caption" color="#6B7280" style={styles.subtitle}>
          Your spot has been reserved successfully
        </Text>
      </View>

      {/* Experience Banner Card */}
      <View style={styles.experienceCard}>
        <Image 
          source={{ uri: booking.image }} 
          style={styles.banner}
          resizeMode="cover"
        />
        <View style={styles.experienceInfo}>
          <Text variant="header" style={styles.expTitle}>
            {booking.title}
          </Text>
          <Text variant="caption" color="#6B7280" style={styles.expHost}>
            Hosted by {booking.hostName}
          </Text>
        </View>
      </View>

      {/* Booking Details Card */}
      <View style={styles.detailsCard}>
        <Text variant="label" fontSize={14} style={styles.cardLabel}>
          BOOKING DETAILS
        </Text>

        <View style={styles.detailRow}>
          <View style={styles.iconWrapper}>
            <Calendar size={20} color="#030303" />
          </View>
          <View style={styles.detailContent}>
            <Text variant="caption" color="#6B7280">Date</Text>
            <Text variant="body" fontWeight="600" style={styles.detailValue}>
              {new Date(booking.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.iconWrapper}>
            <Clock size={20} color="#030303" />
          </View>
          <View style={styles.detailContent}>
            <Text variant="caption" color="#6B7280">Time</Text>
            <Text variant="body" fontWeight="600" style={styles.detailValue}>
              {booking.time?.split("T")[1]?.slice(0, 5) || "TBD"}
            </Text>
          </View>
        </View>

        {booking.isVirtual ? (
          <View style={styles.detailRow}>
            <View style={styles.iconWrapper}>
              <Link size={20} color="#030303" />
            </View>
            <View style={styles.detailContent}>
              <Text variant="caption" color="#6B7280">Virtual Event</Text>
              <TouchableOpacity onPress={() => router.push(booking.meetingLink)}>
                <Text 
                  variant="caption" 
                  color="#007AFF" 
                  style={styles.linkText}
                  numberOfLines={1}
                >
                  {booking.meetingLink}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.detailRow}>
            <View style={styles.iconWrapper}>
              <MapPin size={20} color="#030303" />
            </View>
            <View style={styles.detailContent}>
              <Text variant="caption" color="#6B7280">Location</Text>
              <Text variant="body" fontWeight="600" style={styles.detailValue}>
                {booking.location}
              </Text>
            </View>
          </View>
        )}

        <Separator margin={16} color="#E5E7EB" />

        <View style={styles.bookingIdRow}>
          <Text variant="caption" color="#6B7280">Booking ID</Text>
          <Text variant="body" fontWeight="600" color="#030303">
            #{bookingId?.slice(0, 8)}
          </Text>
        </View>
      </View>

      {/* Email Confirmation Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoIconContainer}>
          <Mail size={22} color="#030303" />
        </View>
        <View style={styles.infoContent}>
          <Text variant="label" fontSize={14} fontWeight="600" style={styles.infoTitle}>
            Check Your Email
          </Text>
          <Text variant="caption" color="#6B7280" style={styles.infoDescription}>
            Confirmation sent to{" "}
            <Text variant="caption" fontWeight="600" color="#030303">
              {userEmail}
            </Text>
          </Text>
        </View>
      </View>

      {/* QR Code Card */}
      <View style={styles.qrCard}>
        <View style={styles.qrIconContainer}>
          <QrCode size={22} color="#EFEFE7" />
        </View>
        <View style={styles.qrContent}>
          <Text variant="label" fontSize={14} fontWeight="600" color="#EFEFE7" style={styles.qrTitle}>
            QR Code Ready
          </Text>
          <Text variant="caption" color="#D1D5DB" style={styles.qrDescription}>
            Your booking QR code has been sent to your email. Present it at the venue for quick check-in.
          </Text>
        </View>
      </View>

      {/* Attendees Section */}
      {booking.attendees && booking.attendees.length > 0 && (
        <View style={styles.attendeesSection}>
          <Text variant="label" fontSize={14} style={styles.attendeesLabel}>
            ATTENDEES ({booking.attendees.length})
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.attendeesScroll}
          >
            {booking.attendees.map((attendee: any) => (
              <View key={attendee.userId} style={styles.attendeeCard}>
                <Image
                  source={{ uri: attendee.avatarUrl || "https://i.pravatar.cc/100" }}
                  style={styles.avatar}
                />
                <Text 
                  variant="micro" 
                  color="#6B7280" 
                  style={styles.attendeeName}
                  numberOfLines={1}
                >
                  {attendee.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Important Notes */}
      <View style={styles.noteCard}>
        <Text variant="label" fontSize={12} fontWeight="600" color="#92400E" style={styles.noteTitle}>
          IMPORTANT
        </Text>
        <Text variant="caption" color="#78350F" style={styles.noteText}>
          • Arrive 10-15 minutes before scheduled time{"\n"}
          • Save your QR code for offline access{"\n"}
          • Contact the host for any changes
        </Text>
      </View>

      {/* Auto-close Notice */}
      <Text variant="micro" color="#9CA3AF" style={styles.autoCloseText}>
        Returning to home in 20 seconds...
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAF8",
  },
  closeBtn: {
    position: "absolute",
    top: 28,
    right: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroSection: {
    alignItems: "center",
    marginTop: 48,
    marginBottom: 24,
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkmark: {
    fontSize: 48,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 18,
  },
  experienceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  banner: {
    width: "100%",
    height: 200,
  },
  experienceInfo: {
    padding: 16,
  },
  expTitle: {
    marginBottom: 4,
  },
  expHost: {
    lineHeight: 18,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLabel: {
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
    justifyContent: "center",
  },
  detailValue: {
    marginTop: 2,
  },
  linkText: {
    marginTop: 2,
    textDecorationLine: "underline",
  },
  bookingIdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
    justifyContent: "center",
  },
  infoTitle: {
    marginBottom: 4,
  },
  infoDescription: {
    lineHeight: 18,
  },
  qrCard: {
    flexDirection: "row",
    backgroundColor: "#030303",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  qrIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(239, 239, 231, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  qrContent: {
    flex: 1,
    justifyContent: "center",
  },
  qrTitle: {
    marginBottom: 4,
  },
  qrDescription: {
    lineHeight: 18,
  },
  attendeesSection: {
    marginBottom: 16,
  },
  attendeesLabel: {
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  attendeesScroll: {
    paddingRight: 16,
  },
  attendeeCard: {
    alignItems: "center",
    marginRight: 16,
    width: 72,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  attendeeName: {
    textAlign: "center",
    lineHeight: 16,
  },
  noteCard: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  noteTitle: {
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  noteText: {
    lineHeight: 20,
  },
  autoCloseText: {
    textAlign: "center",
    lineHeight: 18,
  },
});