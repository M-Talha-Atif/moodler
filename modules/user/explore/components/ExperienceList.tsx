import { View, FlatList, Text, ActivityIndicator, RefreshControl } from "react-native";
import ExperienceCard from "../../home/components/ExperienceCard";
import { Experience } from "@/modules/user/home/services/homeService";

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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#22c55e"]} />
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={
        loading ? (
          <View className="py-4">
            <ActivityIndicator size="small" color="#22c55e" />
          </View>
        ) : !hasMore && data.length > 0 ? (
          <View className="py-4 items-center">
            <Text className="text-gray-500">No more experiences</Text>
          </View>
        ) : null
      }
      ListEmptyComponent={
        !loading && (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-500 text-lg mb-2">No experiences found</Text>
          </View>
        )
      }
      contentContainerStyle={data.length === 0 ? { flex: 1 } : undefined}
    />
  );
}
