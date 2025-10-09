import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Filter } from "lucide-react-native";
import { Modalize } from "react-native-modalize";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
// import SearchBar from "../components/SearchBar"; // ensure this is the new simple one
import Header from "@/modules/common/Header";
import ExperienceList from "../components/ExperienceList";
import ExperienceBottomFilterSheet, {
    CultureTag,
    OutcomeTag,
    TimeFilter,
} from "../components/ExperienceBottomFilterSheet";
import SearchBar from "@/components/ui/searchBar";
import { fetchExperiencesForUser } from "../services/exploreService";
import { Experience } from "@/modules/user/home/services/homeService";

export default function ExploreScreen() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [filters, setFilters] = useState({
        culture: "all" as CultureTag,
        outcome: "all" as OutcomeTag,
        timeFilter: "anytime" as TimeFilter,
    });
    const [search, setSearch] = useState("");

    const abortController = useRef<AbortController | null>(null);
    const sheetRef = useRef<Modalize>(null);

    const fetchData = useCallback(
        async (pageNum = 1, append = false) => {
            if (loading && !append) return;

            if (!append) {
                setExperiences([]); // clear list to show skeletons
                setLoading(true);
            }

            abortController.current?.abort();
            abortController.current = new AbortController();

            try {
                const res = await fetchExperiencesForUser({
                    page: pageNum,
                    limit: 10,
                    search,
                    ...filters,
                });

                const items: Experience[] = res?.data ?? [];
                setExperiences((prev) => (append ? [...prev, ...items] : items));
                setHasMore(res?.meta?.hasNextPage ?? items.length > 0);
                setPage(pageNum);
            } catch (err: any) {
                if (err.name !== "AbortError") console.error("Fetch error:", err);
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        [filters, search, loading]
    );



    useFocusEffect(
        useCallback(() => {
            fetchData(1);
            return () => abortController.current?.abort();
        }, [])
    );

    useEffect(() => {
        fetchData(1);
    }, [filters, search]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData(1);
    };

    const loadMore = () => {
        if (hasMore && !loading && !refreshing) fetchData(page + 1, true);
    };

    const handleClearFilters = () => {
        setFilters({ culture: "all", outcome: "all", timeFilter: "anytime" });
        setSearch("");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Explore"
                rightIcon={<Filter size={22} color="#030303" />}
                onRightPress={() => sheetRef.current?.open()}
            />

            <View style={styles.searchSection}>
                <SearchBar value={search} onChangeText={setSearch} placeholder="Search Experiences.." />
            </View>

            <ExperienceList
                data={experiences}
                loading={loading}
                hasMore={hasMore}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onLoadMore={loadMore}
                onPress={(exp) =>
                    router.push({
                        pathname: "/(tabs)/(user)/experienceDetail",
                        params: { id: exp.id },
                    })
                }
            />

            <ExperienceBottomFilterSheet
                ref={sheetRef}
                initialFilters={filters}
                onApply={setFilters}
                onClear={handleClearFilters}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAF8",
    },
    searchSection: {
        marginTop: 12,
        paddingHorizontal: 16,
    },
});
