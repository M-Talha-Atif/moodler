// src/modules/user/experiences/components/ExperienceLoadingSkeleton.tsx
import React from "react";
import { View } from "react-native";
import Skeleton from "@/modules/common/components/Skeleton";

export default function ExperienceLoadingSkeleton() {
  return (
    <View className="px-4 pt-2 bg-gray-50 flex-1">
      {[1, 2, 3].map((item) => (
        <View
          key={item}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-5 overflow-hidden"
        >
          {/* Image */}
          <Skeleton height={190} radius={20} />

          <View className="p-5">
            {/* Title + Price */}
            <View className="flex-row justify-between items-center mb-3">
              <Skeleton width="70%" height={20} />
              <Skeleton width={60} height={24} radius={12} />
            </View>

            {/* Emotion Text */}
            <Skeleton width="60%" height={14} style={{ marginBottom: 10 }} />

            {/* Location & Duration */}
            <View className="space-y-2 mb-5">
              <Skeleton width="80%" height={14} />
              <Skeleton width="50%" height={14} />
            </View>

            {/* Progress Bar */}
            <Skeleton width="100%" height={8} radius={8} style={{ marginBottom: 12 }} />

            {/* Button */}
            <Skeleton width="100%" height={42} radius={10} />
          </View>
        </View>
      ))}
    </View>
  );
}
