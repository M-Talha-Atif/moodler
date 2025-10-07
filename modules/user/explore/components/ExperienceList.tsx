import { View, FlatList, Text, RefreshControl } from "react-native";
import ExperienceCard from "../../home/components/ExperienceCard";
import { Experience } from "@/modules/user/home/services/homeService";
import ExperienceLoadingSkeleton from "./ExperienceLoadingSkeleton";

export default function ExperienceList({
  data,
  loading,
  hasMore,
  refreshing,
  onRefresh,
  onLoadMore,
  onPress,
}: {
  data: Experience[];
  loading: boolean;
  hasMore: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onPress: (exp: Experience) => void;
}) {
  // 🔹 Show full-page skeleton only when initially loading and no data yet
  if (loading && data.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 pt-4">
        <ExperienceLoadingSkeleton />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="p-4">
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
          <View className="py-4">
            <ExperienceLoadingSkeleton />
          </View>
        ) : !hasMore && data.length > 0 ? (
          <View className="py-6 items-center">
            <Text className="text-gray-500">No more experiences</Text>
          </View>
        ) : null
      }
      ListEmptyComponent={
        !loading && (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-500 text-lg mb-2">
              No experiences found
            </Text>
          </View>
        )
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#F9FAFB",
        paddingBottom: 100,
      }}
    />
  );
}
