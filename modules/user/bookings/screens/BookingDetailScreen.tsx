import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, MapPin, User, Clock, ArrowRight, Users } from "lucide-react-native";
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
    <SafeAreaView className="flex-1 bg-slate-50">
      <Header title="Booking Details" showBackButton />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image with Gradient Overlay */}
        <View className="relative">
          <Image
            source={{
              uri: booking.image || "https://via.placeholder.com/400x200",
            }}
            className="w-full h-64"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.1)"]}
            className="absolute inset-0"
          />
        </View>

        {/* Content Card */}
        <View className="px-6 -mt-8">
          <View className="bg-white rounded-3xl shadow-lg shadow-black/10 p-6 mb-6">
            {/* Title */}
            <Text className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {booking.title}
            </Text>

            {/* Info Grid */}
            <View className="space-y-4 mb-6">
              {/* Host */}
              <View className="flex-row items-center">
                <View className="bg-blue-50 p-3 rounded-2xl mr-4">
                  <User size={20} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-gray-500 font-medium">Host</Text>
                  <Text className="text-gray-900 font-semibold">
                    {booking.hostName || "Unknown"}
                  </Text>
                </View>
              </View>

              {/* Location */}
              <View className="flex-row items-center">
                <View className="bg-green-50 p-3 rounded-2xl mr-4">
                  <MapPin size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-gray-500 font-medium">Location</Text>
                  <Text className="text-gray-900 font-semibold">{booking.location}</Text>
                </View>
                <ArrowRight size={18} color="#9CA3AF" />
              </View>

              {/* Date & Time Row */}
              <View className="flex-row">
                {/* Date */}
                <View className="flex-row items-center flex-1">
                  <View className="bg-purple-50 p-3 rounded-2xl mr-4">
                    <Calendar size={20} color="#8B5CF6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500 font-medium">Date</Text>
                    <Text className="text-gray-900 font-semibold">
                      {dayjs(booking.date).format("MMM D, YYYY")}
                    </Text>
                  </View>
                </View>

                {/* Time */}
                <View className="flex-row items-center flex-1">
                  <View className="bg-orange-50 p-3 rounded-2xl mr-4">
                    <Clock size={20} color="#F59E0B" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500 font-medium">Time</Text>
                    <Text className="text-gray-900 font-semibold">
                      {dayjs(booking.time).format("h:mm A")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Divider */}
            <View className="h-px bg-gray-100 my-2" />

            {/* Attendees Section */}
            <View className="mt-6">
              <View className="flex-row items-center mb-4">
                <Users size={20} color="#374151" className="mr-2" />
                <Text className="text-lg font-bold text-gray-900">Attendees</Text>
                <Text className="text-gray-500 ml-2">({booking.attendees.length})</Text>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="pb-2"
              >
                <View className="flex-row space-x-3">
                  {booking.attendees.map((att: any, i: number) => (
                    <View key={i} className="items-center">
                      <View className="relative">
                        <Image
                          source={{
                            uri: att.avatarUrl || "https://ui-avatars.com/api/?name=" + att.name + "&background=random",
                          }}
                          className="w-14 h-14 rounded-2xl mb-2"
                        />
                        <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                      </View>
                      <Text className="text-xs font-medium text-gray-700 max-w-16 text-center">
                        {att.name.split(' ')[0]}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          {/* Cancel Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCancelBooking}
            disabled={deleting}
            className="rounded-2xl overflow-hidden shadow-lg shadow-red-200"
          >
            <LinearGradient
              colors={deleting ? ["#9CA3AF", "#6B7280"] : ["#EF4444", "#DC2626"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="py-4 rounded-2xl"
            >
              <Text className="text-white text-center font-bold text-base">
                {deleting ? "Cancelling..." : "Cancel Booking"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}