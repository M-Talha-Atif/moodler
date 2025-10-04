import { View, Text, Image, TouchableOpacity } from "react-native";
import { Calendar, MapPin, DollarSign } from "lucide-react-native";
import { Booking } from "../services/bookingService";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback } from "react";

interface BookingCardProps {
  booking: Booking;
}

const statusConfig = {
  confirmed: { label: "Confirmed", color: "bg-green-100 border-green-200 text-green-800" },
  waitlisted: { label: "Waitlisted", color: "bg-yellow-100 border-yellow-200 text-yellow-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 border-red-200 text-red-800" },
};

export default function BookingCard({ booking }: BookingCardProps) {
  const router = useRouter();

  const status = statusConfig[booking.status] || {
    label: "Unknown",
    color: "bg-gray-100 border-gray-200 text-gray-800",
  };

  const formattedDate = booking.date
    ? dayjs(booking.date).format("MMM D, YYYY")
    : "Date not set";

  const navigateToBookingDetails = useCallback(
    () => router.push({ pathname: "/bookingDetail", params: { id: booking.id } }),
    [booking.id, router]
  );

  const navigateToExperienceDetails = useCallback(
    () => router.push({ pathname: "/experienceDetail", params: { id: booking.experienceId } }),
    [booking.experienceId, router]
  );

  // ✅ Decide button text & action based on booking status
  const isCancelled = booking.status === "cancelled";
  const buttonLabel = isCancelled ? "Book Again" : "View Booking";
  const handlePress = isCancelled
    ? navigateToExperienceDetails
    : navigateToBookingDetails;

  return (
    <View className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 mx-3 overflow-hidden">
      <View className="flex-row items-center p-4">
        {/* Image */}
        <View className="mr-4">
          <Image
            source={{ uri: booking.image || "https://via.placeholder.com/80" }}
            className="w-16 h-16 rounded-full border border-gray-200"
          />
        </View>

        {/* Details */}
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
            {booking.title}
          </Text>

          <View className="flex-row items-center mt-1">
            <MapPin size={14} color="#6B7280" className="mr-1" />
            <Text className="text-xs text-gray-600" numberOfLines={1}>
              {booking.location || "Location not available"}
            </Text>
          </View>

          <View className="flex-row items-center mt-1">
            <Calendar size={14} color="#6B7280" className="mr-1" />
            <Text className="text-xs text-gray-600">{formattedDate}</Text>
          </View>

          <View className="flex-row items-center mt-1">
            <DollarSign size={14} color="#6B7280" className="mr-1" />
            <Text className="text-xs text-gray-600">
              {booking.price ? `$${booking.price}` : "Price unavailable"}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer Row */}
      <View className="flex-row items-center justify-between px-4 pb-4">
        <View className={`px-3 py-1 rounded-full border ${status.color}`}>
          <Text className="text-xs font-semibold">{status.label}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePress}
          className="rounded-full overflow-hidden"
        >
          <LinearGradient
            colors={isCancelled ? ["#10B981", "#059669"] : ["#3B82F6", "#6366F1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-4 py-1.5 rounded-full"
          >
            <Text className="text-white text-sm font-semibold">
              {buttonLabel}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
