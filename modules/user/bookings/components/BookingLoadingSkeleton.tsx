import React from "react";
import { View, StyleSheet } from "react-native";
import Skeleton from "@/modules/common/components/Skeleton";

export default function BookingLoadingSkeleton() {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.card}>
          {/* Top Section - Date & Status */}
          <View style={styles.topSection}>
            <View style={styles.dateStatusRow}>
              <Skeleton width="60%" height={14} radius={5} />
              <Skeleton width={80} height={24} radius={12} />
            </View>
            <View style={styles.separator}>
              <Skeleton width="100%" height={1} radius={0} />
            </View>
          </View>

          {/* Middle Section - Image & Details */}
          <View style={styles.middleSection}>
            {/* Image placeholder */}
            <View style={styles.imageContainer}>
              <Skeleton width="100%" height="100%" radius={10} />
            </View>

            {/* Details */}
            <View style={styles.details}>
              {/* Title */}
              <Skeleton width="90%" height={18} radius={6} style={styles.titleSkeleton} />
              
              {/* Location */}
              <Skeleton width="70%" height={14} radius={5} style={styles.detailSkeleton} />
              
              {/* Date */}
              <Skeleton width="60%" height={14} radius={5} style={styles.detailSkeleton} />
              
              {/* Time */}
              <Skeleton width="50%" height={14} radius={5} style={styles.detailSkeleton} />
            </View>
          </View>

          {/* Separator */}
          <View style={styles.separator}>
            <Skeleton width="100%" height={1} radius={0} />
          </View>

          {/* Bottom Section - Button & Price */}
          <View style={styles.bottomSection}>
            <Skeleton width={120} height={42} radius={12} />
            <Skeleton width={70} height={32} radius={20} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF8",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    marginBottom: 16,
    overflow: "hidden",
    width: "100%",
  },
  topSection: {
    padding: 16,
  },
  dateStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  separator: {
    marginHorizontal: 16,
  },
  middleSection: {
    flexDirection: "row",
    padding: 16,
    gap: 14,
  },
  imageContainer: {
    width: 120,
    height: 140,
    borderRadius: 10,
    overflow: "hidden",
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  titleSkeleton: {
    marginBottom: 8,
  },
  detailSkeleton: {
    marginBottom: 6,
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});