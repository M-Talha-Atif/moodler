// src/modules/user/notifications/components/LoadingSkeleton.tsx
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Skeleton from "@/modules/common/components/Skeleton";

export default function LoadingSkeleton() {
  const placeholders = Array.from({ length: 5 });

  return (
    <FlatList
      data={placeholders}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={styles.container}
      renderItem={() => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Skeleton width={42} height={42} radius={10} style={styles.icon} />

            <View style={{ flex: 1 }}>
              <View style={styles.headerRow}>
                <Skeleton width="60%" height={14} />
                <Skeleton width={50} height={12} />
              </View>

              <Skeleton width="90%" height={13} style={{ marginTop: 8 }} />
              <Skeleton width="75%" height={13} style={{ marginTop: 6 }} />
              <Skeleton width={70} height={12} style={{ marginTop: 10 }} />
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    overflow: "hidden",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  icon: {
    marginRight: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
});
