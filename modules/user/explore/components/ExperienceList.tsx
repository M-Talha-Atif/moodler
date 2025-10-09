import React from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
} from "react-native";
import ExperienceCard from "../../home/components/ExperienceCard";
import { Experience } from "@/modules/user/home/services/homeService";
import ExperienceLoadingSkeleton from "./ExperienceLoadingSkeleton";

interface Props {
  data: Experience[];
  loading: boolean;
  hasMore: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onPress: (exp: Experience) => void;
}

export default function ExperienceList({
  data,
  loading,
  hasMore,
  refreshing,
  onRefresh,
  onLoadMore,
  onPress,
}: Props) {
  if (loading && data.length === 0) {
    return (
      <View style={styles.fullSkeleton}>
        <ExperienceLoadingSkeleton />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <ExperienceCard experience={item} onJoin={onPress} />
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#22c55e"]}
        />
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={
        loading && data.length > 0 ? (
          <View style={styles.footerLoading}>
            <ExperienceLoadingSkeleton />
          </View>
        ) : !hasMore && data.length > 0 ? (
          <View style={styles.footerEnd}>
            <Text style={styles.footerText}>No more experiences</Text>
          </View>
        ) : null
      }
      ListEmptyComponent={
        !loading
          ? () => (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No experiences found</Text>
            </View>
          )
          : null
      }

      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  fullSkeleton: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 16,
  },
  cardContainer: {
    padding: 16,
  },
  footerLoading: {
    paddingVertical: 16,
  },
  footerEnd: {
    paddingVertical: 24,
    alignItems: "center",
  },
  footerText: {
    color: "#6B7280",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 16,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "#F9FAFB",
    paddingBottom: 100,
  },
});
