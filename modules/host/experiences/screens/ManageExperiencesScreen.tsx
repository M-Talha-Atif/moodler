import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { fetchHostExperiences, deleteHostExperience } from "../services/experience";
import HostExperienceCard from "../components/HostExperienceCard";
import Skeleton from "@/modules/common/components/Skeleton";
import Header from "@/modules/common/Header";
import HostExperienceBottomFilterSheet, { HostExperienceFilters } from "../components/HostExperienceBottomFilterSheet";
import HostExperienceSearchBar from "../components/HostExperienceSearchBar";
import { Filter } from "lucide-react-native";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function ManageHostExperiencesScreen() {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const filterSheetRef = useRef<any>(null);

  const [filters, setFilters] = useState<HostExperienceFilters>({
    cultureTags: "all",
    desiredOutcomes: "all",
    timeFilter: "anytime",
  });

  const [searchText, setSearchText] = useState("");


  // Types matching your API response
  type HostExperience = {
    id: string;
    title: string;
    image: string;
    date: string;
    totalSpots: number;
    totalBookings: number;
    status: "upcoming" | "past";
  };

  type HostExperiencePage = {
    data: HostExperience[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      nextPage: number | null;
      prevPage: number | null;
    };
  };
  const {
    data,
    isLoading,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
    hasNextPage,
    isRefetching,
  } = useInfiniteQuery<HostExperiencePage, Error>({
    queryKey: ["experiences", filters, searchText],
    queryFn: async ({ pageParam = 1 }) => {
      console.log("Fetching experiences - page:", pageParam, "filters:", filters, "search:", searchText);
      const response = await fetchHostExperiences({
        page: pageParam,
        limit: 10,
        search: searchText,
        ...filters,
      });
      console.log("API response received:", response.data.length, "items");
      return response as HostExperiencePage;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const hasNext = lastPage.meta?.hasNextPage ? lastPage.meta.nextPage : undefined;
      console.log("getNextPageParam - hasNextPage:", lastPage.meta?.hasNextPage, "nextPage:", hasNext);
      return hasNext;
    },
    refetchOnWindowFocus: true,
    // Add these to prevent duplicates
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    // onSuccess: () => console.log("Query successful"),
    onError: (error) => console.log("Query error:", error),
  });

  // Fix: Use a more unique key extractor to prevent duplicates
  const experiences = React.useMemo(() => {
    const allExperiences = data?.pages.flatMap((p) => p.data) ?? [];
    // Remove duplicates by id
    const uniqueExperiences = allExperiences.filter((exp, index, self) =>
      index === self.findIndex(e => e.id === exp.id)
    );
    console.log("Total experiences:", allExperiences.length, "Unique:", uniqueExperiences.length);
    return uniqueExperiences;
  }, [data]);

  const onRefresh = () => refetch();
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };


  // Add this in your component
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused - refetching experiences");
      refetch();
    }, [refetch])
  );

  const deleteMutation = useMutation({
    mutationFn: deleteHostExperience,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["experiences", filters, searchText], (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((exp: any) => exp.id !== id),
          })),
        };
      });
    },
  });

  const handleDelete = (id: string) => deleteMutation.mutate(id);

  const handleClearFilters = () => {
    setFilters({ cultureTags: "all", desiredOutcomes: "all", timeFilter: "anytime" });
    setSearchText("");
  };

  const renderItem = ({ item }: { item: any }) => (
    <HostExperienceCard
      experience={item}
      onEdit={() => navigation.navigate("UpdateHostExperience", { id: item.id })}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Header
        title="Manage Experiences"
        rightIcon={<Filter size={22} color="#030303" />}
        onRightPress={() => filterSheetRef.current?.open()}
      />

      <View style={{ marginTop: 12, paddingHorizontal: 2 }}>
        <HostExperienceSearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Experiences..."
        />
      </View>

      {isLoading && experiences.length === 0 ? (
        <View style={styles.loaderContainer}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={160} width="100%" radius={16} style={{ marginBottom: 12 }} />
          ))}
        </View>
      ) : experiences.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No experiences found. Create one to get started.</Text>
        </View>
      ) : (
        <FlatList
          data={experiences}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null}
          refreshing={isRefetching}
          onRefresh={onRefresh}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <HostExperienceBottomFilterSheet
        ref={filterSheetRef}
        initialFilters={filters}
        onApply={setFilters}
        onClear={handleClearFilters}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  loaderContainer: { padding: 16 },
  scrollContainer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 },
  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyText: { color: "#6B7280", fontSize: 15 },
});
