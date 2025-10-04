import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, MapPin, User, Clock } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";

import Header from "@/modules/common/Header";
import { fetchBookingDetail, deleteBooking } from "../services/bookingService";

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams(); // bookingId
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
              console.error("Error cancelling booking:", err);
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
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  if (!booking) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-gray-600">Booking not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="Booking Details" showBackButton />

      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ padding: 20, paddingTop: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Image */}
        <Image
          source={{
            uri: booking.image || "https://via.placeholder.com/400x200",
          }}
          className="w-full h-48 rounded-2xl mb-5"
        />

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-2">{booking.title}</Text>

        {/* Host */}
        <View className="flex-row items-center mb-3">
          <User size={18} color="#6B7280" className="mr-2" />
          <Text className="text-gray-700">Hosted by {booking.hostName || "Unknown"}</Text>
        </View>

        {/* Location */}
        <View className="flex-row items-center mb-2">
          <MapPin size={18} color="#6B7280" className="mr-2" />
          <Text className="text-gray-700">{booking.location}</Text>
        </View>

        {/* Date & Time */}
        <View className="flex-row items-center mb-2">
          <Calendar size={18} color="#6B7280" className="mr-2" />
          <Text className="text-gray-700">
            {dayjs(booking.date).format("MMM D, YYYY")}
          </Text>
        </View>
        <View className="flex-row items-center mb-4">
          <Clock size={18} color="#6B7280" className="mr-2" />
          <Text className="text-gray-700">
            {dayjs(booking.time).format("h:mm A")}
          </Text>
        </View>

        {/* Attendees */}
        <View className="mt-4 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">Attendees</Text>
          <View className="flex-row flex-wrap">
            {booking.attendees.map((att: any, i: number) => (
              <View key={i} className="items-center mr-4 mb-3">
                <Image
                  source={{
                    uri: att.avatarUrl || "https://ui-avatars.com/api/?name=" + att.name,
                  }}
                  className="w-12 h-12 rounded-full mb-1"
                />
                <Text className="text-xs text-gray-700">{att.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Cancel Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCancelBooking}
          disabled={deleting}
          className="rounded-full overflow-hidden mb-10"
        >
          <LinearGradient
            colors={["#EF4444", "#DC2626"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="py-3 rounded-full"
          >
            <Text className="text-white text-center font-semibold text-base">
              {deleting ? "Cancelling..." : "Cancel Booking"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
