import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, MapPin, User, Clock, ArrowRight, Users } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import Header from "@/modules/common/Header";
import { fetchBookingDetail, deleteBooking } from "../services/bookingService";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/modules/common/components/Button";

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
    <>
      <SafeAreaView className="flex-1 bg-slate-50">
        <Header title="Booking Details" showBackButton />
        {/* Hero Image */}
        <View className="relative mb-4 mt-8">
          <Image
            source={{
              uri: booking.image || "https://via.placeholder.com/400x200",
            }}
            className="w-full h-48"
          />
        </View>
        <View className="flex-1">

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60, paddingTop: 12 }}
            showsVerticalScrollIndicator={false}
          >


            {/* Main Card */}
            <View className="bg-white rounded-3xl shadow-md shadow-black/10 p-5 mb-8 border border-gray-100">
              {/* Title */}
              <Text className="text-2xl font-bold text-gray-900 mb-5 leading-tight">
                {booking.title}
              </Text>

              {/* Info Grid */}
              <View className="space-y-5 mb-4">
                {/* Host */}
                <View className="flex-row items-center  mt-4">
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
                <View className="flex-row items-center mt-4">
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
                <View className="flex-row space-x-3 mt-4">
                  {/* Date */}
                  <View className="flex-1 flex-row items-center">
                    <View className="bg-purple-50 p-3 rounded-2xl mr-4">
                      <Calendar size={20} color="#8B5CF6" />
                    </View>
                    <View className="flex-1 mt-2">
                      <Text className="text-sm text-gray-500 font-medium">Date</Text>
                      <Text className="text-gray-900 font-semibold">
                        {dayjs(booking.date).format("MMM D, YYYY")}
                      </Text>
                    </View>
                  </View>

                  {/* Time */}
                  <View className="flex-1 flex-row items-center mt-2">
                    <View className="bg-orange-50 p-3 rounded-2xl mr-4">
                      <Clock size={20} color="#F59E0B" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm text-gray-500">Time</Text>
                      <Text className="text-gray-900 font-semibold">
                        {dayjs(booking.time).format("h:mm A")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Divider */}
              <View className="h-[1px] bg-gray-200 my-4" />

              {/* Attendees */}
              <View className="mt-4">
                <View className="flex-row items-center mb-4 space-x-4">
                  <Users size={20} color="#374151" className="mr-2" />
                  <Text className="p-2 text-lg font-bold text-gray-900">Attendees</Text>
                  <Text className="text-gray-500">({booking.attendees.length})</Text>
                </View>

                <View className="flex-row items-center">
                  {booking.attendees.slice(0, 6).map((att: any, i: number) => (
                    <View
                      key={i}
                      className="relative"
                      style={{ marginLeft: i === 0 ? 0 : -12 }}
                    >
                      <Image
                        source={{
                          uri:
                            att.avatarUrl ||
                            `https://ui-avatars.com/api/?name=${att.name}&background=random`,
                        }}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                      />
                    </View>
                  ))}

                  {booking.attendees.length > 6 && (
                    <View className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center ml-2">
                      <Text className="text-gray-500 font-semibold text-xs">
                        +{booking.attendees.length - 6}
                      </Text>
                    </View>
                  )}
                </View>

              </View>
            </View>


          </ScrollView>

        </View>

      </SafeAreaView>


      {/* Sticky Button outside scroll, respects bottom inset perfectly */}
      <SafeAreaView
        edges={["bottom"]}
        className="absolute left-0 right-0 bottom-0 bg-transparent px-8 pb-2"
      >
        <Button
          title="Cancel Booking"
          variant="destructive"
          onPress={handleCancelBooking}
        />

        {/* <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleCancelBooking}
          disabled={deleting}
          className="rounded-2xl overflow-hidden shadow-md shadow-red-200"
        >
          <LinearGradient
            colors={deleting ? ["#9CA3AF", "#6B7280"] : ["#EF4444", "#DC2626"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="py-4 rounded-2xl"
          >
            <Text className="text-white text-center font-bold text-base tracking-wide">
              {deleting ? "Cancelling..." : "Cancel Booking"}
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </SafeAreaView>

    </>
  );
}
