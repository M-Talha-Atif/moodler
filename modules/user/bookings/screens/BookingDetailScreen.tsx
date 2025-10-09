import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import Separator from "@/components/ui/separator";
import Button from "@/components/ui/button";
import { fetchBookingDetail, deleteBooking } from "../services/bookingService";

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchBookingDetail(id as string);
        setBooking(data);
      } catch (err) {
        console.error("Error loading booking detail:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  const handleCancelBooking = () => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(true);
              await deleteBooking(booking.bookingId);
              Alert.alert("Booking cancelled successfully");
              router.back();
            } catch (err) {
              Alert.alert("Failed to cancel booking");
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#030303" />
        <Text style={styles.loadingText}>Loading booking details...</Text>
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="search-outline" size={40} color="#030303" />
        <Text style={styles.errorText}>Booking not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image
          source={{ uri: booking.image || "https://via.placeholder.com/400x200" }}
          style={styles.headerImage}
          resizeMode="cover"
        />

        {/* Title */}
        <View style={styles.titleSection}>
          <Text variant="display" style={{ flex: 1 }}>
            {booking.title}
          </Text>
        </View>

        {/* Key Info Section */}
        <View style={styles.infoSection}>
          {/* Row 1: Spots Left & Date */}
          <View style={styles.topRow}>
            <Text style={styles.infoTextBold}>{booking.spotsLeft} spots left</Text>
            <Separator orientation="vertical" color="#DADADA" thickness={1} style={styles.verticalSep} />
            <Text style={styles.infoText}>
              {new Date(booking.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>

          {/* Row 2: Location */}
          <View style={styles.bottomRow}>
            <Ionicons name="location-outline" size={16} color="#030303" style={{ marginRight: 4 }} />
            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
              {booking.location}
            </Text>
          </View>
        </View>

        {/* Host Info */}
        <View style={styles.section}>
          <Text variant="header">Hosted by</Text>
          <View style={styles.hostRow}>
            <Image
              source={{
                uri:
                  booking.hostAvatar ||
                  `https://ui-avatars.com/api/?name=${booking.hostName}&background=random`,
              }}
              style={styles.hostAvatar}
            />
            <Text variant="body" style={styles.hostName}>
              {booking.hostName || "Unknown"}
            </Text>
          </View>
        </View>

        {/* Attendees */}
        <View style={styles.section}>
          <Text variant="header">Attendees</Text>
          <View style={styles.attendeesRow}>
            {booking.attendees?.slice(0, 5).map((att: any, i: number) => (
              <Image
                key={i}
                source={{
                  uri: att.avatarUrl || `https://ui-avatars.com/api/?name=${att.name+"user"}&background=random`,
                }}
                style={[styles.attendeeAvatar, { marginLeft: i === 0 ? 0 : -10 }]}
              />
            ))}
            {booking.attendees?.length > 5 && (
              <View style={styles.extraAvatar}>
                <Text style={styles.extraCount}>+{booking.attendees.length - 5}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text variant="header">Booking Notes</Text>
          <Text variant="body" style={styles.descriptionText}>
            {booking.notes || "No additional notes for this booking."}
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Button */}
      <SafeAreaView edges={["bottom"]} style={styles.bookingWrapper}>
        <Button
          title="Cancel Booking"
          onPress={handleCancelBooking}
          disabled={deleting}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAF8" },
  scrollContent: { paddingBottom: 120 },
  headerImage: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  titleSection: { marginHorizontal: 24, marginTop: 16, flexDirection: "row", alignItems: "center" },

  infoSection: {
    backgroundColor: "#FAFAF8",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 24,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalSep: { marginHorizontal: 10, height: 12 },
  infoText: { fontSize: 13, color: "#4B5563", fontFamily: "Nunito" },
  infoTextBold: { fontSize: 13, color: "#111827", fontFamily: "Nunito-Bold" },
  locationText: { fontSize: 13, color: "#111827", flexShrink: 1, fontFamily: "Nunito" },

  section: { marginHorizontal: 24, marginVertical: 16 },
  hostRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 12 },
  hostAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#E8E8E6" },
  hostName: { color: "#030303" },

  attendeesRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  attendeeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FAFAF8",
  },
  extraAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8E8E6",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10,
  },
  extraCount: { fontSize: 12, fontFamily: "Nunito-Bold", color: "#555" },
  descriptionText: { marginTop: 6, color: "#555", fontFamily: "Nunito" },

  bookingWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 12,
    backgroundColor: "transparent",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAF8",
    padding: 20,
  },
  loadingText: { marginTop: 12, fontSize: 16, color: "#666", fontFamily: "Nunito" },
  errorText: { marginTop: 12, fontSize: 16, color: "#666", textAlign: "center", fontFamily: "Nunito" },
});
