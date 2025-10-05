import { View, Text, Image } from "react-native";
import { Calendar, MapPin } from "lucide-react-native";
import { Booking } from "../services/bookingService";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import Button from "@/modules/common/components/Button";
import { LinearGradient } from "expo-linear-gradient";

interface BookingCardProps {
  booking: Booking;
}

const statusConfig = {
  confirmed: { label: "Confirmed", color: "#10B981" },
  waitlisted: { label: "Waitlisted", color: "#F59E0B" },
  cancelled: { label: "Cancelled", color: "#EF4444" },
};

export default function BookingCard({ booking }: BookingCardProps) {
  const router = useRouter();

  const status = statusConfig[booking.status] || {
    label: "Unknown",
    color: "#6B7280",
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

  const isCancelled = booking.status === "cancelled";
  const buttonLabel = isCancelled ? "Book Again" : "View Booking";
  const handlePress = isCancelled
    ? navigateToExperienceDetails
    : navigateToBookingDetails;

  return (
    <View className="bg-white rounded-3xl border border-gray-100 shadow-sm mb-5 overflow-hidden mx-3">
      {/* Image */}
      <View className="relative">
        <Image
          source={{ uri: booking.image || "https://via.placeholder.com/400x200" }}
          className="w-full h-40"
          resizeMode="cover"
        />
        {/* Overlay Badge */}
        <View className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
          <Text className="text-white text-xs font-medium">
            {status.label}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Title & Price */}
        <View className="flex-row justify-between items-start mb-2">
          <Text
            className="text-lg font-semibold text-gray-900 flex-1 mr-2 leading-6"
            numberOfLines={2}
          >
            {booking.title}
          </Text>

          <LinearGradient
            colors={["#7bf163", "#10B981"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-3 py-1.5 rounded-full"
          >
            <Text className="text-white text-sm font-bold">
              {booking.price ? `$${booking.price}` : "Free"}
            </Text>
          </LinearGradient>
        </View>

        {/* Meta Info: Location + Date (Column) */}
        <View
          className="flex-col space-y-2 mb-4 px-3 py-2 rounded-xl"
          style={{
            backgroundColor: "rgba(123, 241, 99, 0.06)",
            borderWidth: 1,
            borderColor: "rgba(123, 241, 99, 0.15)",
          }}
        >
          {/* Location */}
          <View className="flex-row items-start space-x-2 flex-wrap">
            <View className="bg-rose-50 p-1.5 rounded-full">
              <MapPin size={12} color="#E11D48" />
            </View>
            <Text className="text-gray-700 text-[11px] font-medium flex-shrink mt-1">
              {booking.location || "Location unavailable"}
            </Text>
          </View>

          {/* Date */}
          <View className="flex-row items-center space-x-2">
            <View className="bg-emerald-50 p-1.5 rounded-full">
              <Calendar size={12} color="#059669" />
            </View>
            <Text className="text-gray-700 text-[11px] font-medium">{formattedDate}</Text>
          </View>
        </View>


        {/* CTA */}
        <Button variant="primary" title={buttonLabel} onPress={handlePress} />
      </View>
    </View>
  );
}
