// src/modules/user/bookings/components/BookingLoadingSkeleton.tsx
import React from "react";
import { View } from "react-native";
import Skeleton from "@/modules/common/components/Skeleton";

export default function BookingLoadingSkeleton() {
  return (
    <View className="px-4 pt-3 bg-gray-50 flex-1">
      {[1, 2, 3].map((item) => (
        <View
          key={item}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm mb-5 overflow-hidden"
        >
          {/* Image Placeholder */}
          <Skeleton height={160} radius={20} />

          <View className="p-4">
            {/* Title and Price Row */}
            <View className="flex-row justify-between items-center mb-3">
              <Skeleton width="70%" height={20} />
              <Skeleton width={60} height={24} radius={12} />
            </View>

            {/* Meta Info: Location & Date */}
            <View className="space-y-2 mb-4">
              <Skeleton width="60%" height={14} />
              <Skeleton width="50%" height={14} />
            </View>

            {/* Button Placeholder */}
            <Skeleton width="100%" height={40} radius={10} />
          </View>
        </View>
      ))}
    </View>
  );
}
