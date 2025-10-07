// Premium version with more features
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

interface BookingProps {
  booking: {
    bookingId: string;
    guestName: string;
    experienceId: string;
    experienceTitle: string;
    date: string;
    amount: number;
    status: "confirmed" | "pending" | "cancelled" | "completed";
    guestCount?: number;
    duration?: string;
  };
  onPress?: (bookingId: string) => void;
  onQuickAction?: (action: string, bookingId: string) => void;
}

export default function PremiumRecentBookingCard({ 
  booking, 
  onPress, 
  onQuickAction 
}: BookingProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusConfig = (status: string) => {
    const configs = {
      confirmed: {
        color: "#10B981",
        bg: "#ECFDF5",
        icon: "checkmark-circle" as const,
        gradient: ["#4ADE80", "#16A34A"],
        lightGradient: ["#DCFCE7", "#BBF7D0"],
      },
      pending: {
        color: "#F59E0B",
        bg: "#FFFBEB",
        icon: "time" as const,
        gradient: ["#F59E0B", "#D97706"],
        lightGradient: ["#FEF3C7", "#FDE68A"],
      },
      completed: {
        color: "#3B82F6",
        bg: "#EFF6FF",
        icon: "trophy" as const,
        gradient: ["#3B82F6", "#1D4ED8"],
        lightGradient: ["#DBEAFE", "#BFDBFE"],
      },
      cancelled: {
        color: "#EF4444",
        bg: "#FEF2F2",
        icon: "close-circle" as const,
        gradient: ["#EF4444", "#DC2626"],
        lightGradient: ["#FECACA", "#FCA5A5"],
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const statusConfig = getStatusConfig(booking.status);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsExpanded(!isExpanded);
    onPress?.(booking.bookingId);
  };

  const handleQuickAction = (action: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onQuickAction?.(action, booking.bookingId);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30, scale: 0.9 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: "spring", damping: 15 }}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.95}
        className="mb-4 mx-2"
      >
        <LinearGradient
          colors={["#FFFFFF", "#F8FAFC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl p-6 shadow-2xl shadow-black/10 border border-white/80"
        >
          {/* Main Content */}
          <View className="flex-row justify-between items-start mb-4">
            {/* Experience Info */}
            <View className="flex-1 mr-3">
              <Text className="font-playfair text-xl font-bold text-gray-900 mb-2 leading-6">
                {booking.experienceTitle}
              </Text>
              
              <View className="flex-row items-center mb-3">
                <View className="flex-row items-center bg-gray-50 rounded-full px-3 py-1.5 mr-2">
                  <Ionicons name="person" size={14} color="#4ADE80" />
                  <Text className="text-gray-700 text-sm font-semibold ml-1.5">
                    {booking.guestName}
                  </Text>
                </View>
                
                {booking.guestCount && (
                  <View className="flex-row items-center bg-blue-50 rounded-full px-3 py-1.5">
                    <Ionicons name="people" size={14} color="#3B82F6" />
                    <Text className="text-gray-700 text-sm font-semibold ml-1.5">
                      {booking.guestCount} guests
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Status with Glow Effect */}
            <View className="relative">
              <LinearGradient
                colors={statusConfig.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-4 py-2 rounded-2xl shadow-lg shadow-black/20"
              >
                <View className="flex-row items-center">
                  <Ionicons name={statusConfig.icon} size={14} color="white" />
                  <Text className="text-white text-xs font-bold ml-2 capitalize">
                    {booking.status}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Details Row */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center space-x-4">
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-green-50 items-center justify-center mr-2">
                  <Ionicons name="calendar" size={16} color="#10B981" />
                </View>
                <View>
                  <Text className="text-gray-900 text-sm font-bold">
                    {formatDate(booking.date)}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {new Date(booking.date).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </Text>
                </View>
              </View>

              {booking.duration && (
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-2">
                    <Ionicons name="time" size={16} color="#3B82F6" />
                  </View>
                  <View>
                    <Text className="text-gray-900 text-sm font-bold">
                      {booking.duration}
                    </Text>
                    <Text className="text-gray-500 text-xs">Duration</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Amount with Currency */}
            <View className="items-end">
              <Text className="text-gray-500 text-xs font-medium mb-1">
                Total
              </Text>
              <Text className="font-poppins text-2xl font-bold text-gray-900">
                ${booking.amount}
              </Text>
            </View>
          </View>

          {/* Quick Actions */}
          {isExpanded && (
            <MotiView
              from={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ type: "timing", duration: 300 }}
              className="flex-row justify-between pt-4 border-t border-gray-100"
            >
              {booking.status === "pending" && (
                <>
                  <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center bg-green-50 py-2 rounded-xl mr-2"
                    onPress={() => handleQuickAction("confirm")}
                  >
                    <Ionicons name="checkmark" size={16} color="#10B981" />
                    <Text className="text-green-700 text-sm font-semibold ml-2">
                      Confirm
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center bg-red-50 py-2 rounded-xl"
                    onPress={() => handleQuickAction("decline")}
                  >
                    <Ionicons name="close" size={16} color="#EF4444" />
                    <Text className="text-red-700 text-sm font-semibold ml-2">
                      Decline
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              
              {booking.status === "confirmed" && (
                <TouchableOpacity 
                  className="flex-1 flex-row items-center justify-center bg-blue-50 py-2 rounded-xl"
                  onPress={() => handleQuickAction("message")}
                >
                  <Ionicons name="chatbubble" size={16} color="#3B82F6" />
                  <Text className="text-blue-700 text-sm font-semibold ml-2">
                    Message Guest
                  </Text>
                </TouchableOpacity>
              )}
            </MotiView>
          )}

          {/* Footer */}
          <View className="flex-row justify-between items-center pt-3">
            <View className="flex-row items-center">
              <Ionicons name="key" size={12} color="#9CA3AF" />
              <Text className="text-gray-500 text-xs font-medium ml-1">
                #{booking.bookingId.slice(0, 6)}
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Text className="text-gray-600 text-xs font-medium mr-2">
                {isExpanded ? "Tap to collapse" : "Tap for details"}
              </Text>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={14} 
                color="#6B7280" 
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </MotiView>
  );
}