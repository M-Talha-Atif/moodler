// src/modules/user/experiences/components/ExperienceLoadingSkeleton.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Skeleton from "@/modules/common/components/Skeleton";

export default function ExperienceLoadingSkeleton() {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.card}>
          {/* Image */}
          <Skeleton height={144} radius={0} style={styles.image} />

          {/* Content */}
          <View style={styles.content}>
            {/* Title */}
            <Skeleton width="70%" height={18} style={styles.title} />

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <Skeleton width="45%" height={36} radius={10} />
              <Skeleton width="45%" height={36} radius={10} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    marginBottom: 16,
  },
  image: {
    width: "100%",
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  date: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
