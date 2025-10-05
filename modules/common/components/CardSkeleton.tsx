// src/components/ui/CardSkeleton.tsx
import React from "react";
import { View } from "react-native";
import Skeleton from "./Skeleton";

export default function CardSkeleton() {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      {/* Image Placeholder */}
      <Skeleton height={150} radius={12} />

      <View className="mt-4 space-y-3">
        {/* Title */}
        <Skeleton width="70%" height={18} />
        {/* Subtitle */}
        <Skeleton width="50%" height={14} />
        {/* Paragraph */}
        <Skeleton width="90%" height={14} />
        <Skeleton width="85%" height={14} />
        {/* Button */}
        <Skeleton width="100%" height={40} radius={10} />
      </View>
    </View>
  );
}
