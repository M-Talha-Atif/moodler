import React from "react";
import { View, Image, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import Separator from "@/components/ui/separator";
import Button from "@/components/ui/button";
import { useBookingDetail } from "../hooks/useBookingDetail";
import { deleteBooking } from "../services/bookingService";

export default function BookingDetailScreen() {
  const { bookingId } = useLocalSearchParams();
  console.log("Booking Id:", bookingId); // <-- log the actual ID
  const router = useRouter();
  const { data: bookingData, isLoading, error } = useBookingDetail(bookingId as string);

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
              await deleteBooking(bookingData.data.bookingId);
              Alert.alert("Success", "Booking cancelled successfully");
              router.back();
            } catch (err) {
              Alert.alert("Error", "Failed to cancel booking");
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="time-outline" size={40} color="#030303" />
        <Text style={styles.loadingText}>Loading booking details...</Text>
      </View>
    );
  }

  if (error || !bookingData) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="search-outline" size={40} color="#030303" />
        <Text style={styles.errorText}>Booking not found</Text>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  const booking = bookingData;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#030303" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Details</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View style={styles.confirmedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#0BDE73" />
            <Text style={styles.statusText}>Confirmed</Text>
          </View>
          <Text style={styles.bookingId}>Booking #{booking.bookingId.slice(0, 8)}</Text>
        </View>

        {/* Experience Card */}
        <View style={styles.card}>
          <Image
            source={{ uri: booking.image || "https://via.placeholder.com/400x200" }}
            style={styles.banner}
            resizeMode="cover"
          />
          <Text style={styles.expTitle}>{booking.title}</Text>
          <View style={styles.hostRow}>
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${booking.hostName}&background=random`,
              }}
              style={styles.hostAvatar}
            />
            <Text style={styles.hostText}>Hosted by {booking.hostName}</Text>
          </View>
        </View>

        {/* Booking Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Information</Text>
          
          {/* Date & Time */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="calendar-outline" size={20} color="#030303" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Date & Time</Text>
              <Text style={styles.infoValue}>
                {new Date(booking.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              <Text style={styles.timeText}>
                {new Date(booking.time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
            </View>
          </View>

          <Separator margin={12} />

          {/* Attendees */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="people-outline" size={20} color="#030303" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Attendees</Text>
              <Text style={styles.infoValue}>
                {booking.attendees.length} {booking.attendees.length === 1 ? 'person' : 'people'}
              </Text>
            </View>
          </View>

          <Separator margin={12} />

          {/* Location / Virtual Meeting */}
          {booking.isVirtual ? (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="link-outline" size={20} color="#030303" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Virtual Meeting</Text>
                <Text style={styles.infoValue}>Join via meeting link</Text>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Copy Meeting Link</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="location-outline" size={20} color="#030303" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{booking.location}</Text>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Open in Maps</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Attendees List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Attendees ({booking.attendees.length})
          </Text>
          <View style={styles.attendeesList}>
            {booking.attendees.map((attendee: any) => (
              <View key={attendee.userId} style={styles.attendeeItem}>
                <Image
                  source={{
                    uri: attendee.avatarUrl || `https://ui-avatars.com/api/?name=${attendee.name}&background=random`,
                  }}
                  style={styles.avatar}
                />
                <View style={styles.attendeeInfo}>
                  <Text style={styles.attendeeName}>{attendee.name}</Text>
                  <Text style={styles.attendeeRole}>Attendee</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Support Card */}
        <View style={styles.supportCard}>
          <Ionicons name="help-buoy-outline" size={24} color="#007AFF" />
          <Text style={styles.supportTitle}>Need help with your booking?</Text>
          <Text style={styles.supportText}>
            Contact our support team for any questions or changes
          </Text>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <SafeAreaView edges={["bottom"]} style={styles.actionContainer}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="calendar-outline" size={20} color="#030303" />
          <Text style={styles.secondaryButtonText}>Add to Calendar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={handleCancelBooking}
        >
          <Ionicons name="close-circle-outline" size={20} color="#DC2626" />
          <Text style={styles.dangerButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

// Add TouchableOpacity import and component
const TouchableOpacity = ({ children, onPress, style }: any) => (
  <View style={style} onStartShouldSetResponder={() => true} onResponderRelease={onPress}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#F8F9FA" 
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: "600",
    color: "#030303",
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  confirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9FFF2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "600",
    color: "#0BDE73",
  },
  bookingId: {
    fontFamily: "System",
    fontSize: 12,
    color: "#6B7280",
  },
  card: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  banner: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  expTitle: {
    fontFamily: "Nunito",
    fontSize: 18,
    fontWeight: "600",
    color: "#030303",
    marginBottom: 8,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hostAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  hostText: {
    fontFamily: "System",
    fontSize: 14,
    color: "#6B7280",
  },
  cardTitle: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: "600",
    color: "#030303",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: "System",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: "System",
    fontSize: 16,
    color: "#030303",
    marginBottom: 2,
  },
  timeText: {
    fontFamily: "System",
    fontSize: 14,
    color: "#6B7280",
  },
  linkText: {
    fontFamily: "System",
    fontSize: 14,
    color: "#007AFF",
    marginTop: 4,
  },
  attendeesList: {
    gap: 12,
  },
  attendeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  attendeeInfo: {
    flex: 1,
  },
  attendeeName: {
    fontFamily: "System",
    fontSize: 16,
    color: "#030303",
    marginBottom: 2,
  },
  attendeeRole: {
    fontFamily: "System",
    fontSize: 12,
    color: "#6B7280",
  },
  supportCard: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  supportTitle: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: "600",
    color: "#030303",
    marginTop: 12,
    marginBottom: 8,
  },
  supportText: {
    fontFamily: "System",
    fontSize: 14,
    color: "#6B7280",
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  supportButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  supportButtonText: {
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  actionContainer: {
    padding: 16,
    gap: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 9,
    gap: 8,
  },
  secondaryButtonText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "600",
    color: "#030303",
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#DC2626',
    gap: 8,
  },
  dangerButtonText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAF8",
    padding: 20,
  },
  loadingText: {
    fontFamily: "System",
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  errorText: {
    fontFamily: "System",
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 12,
  },
});