// ExploreScreen.tsx - FIXED
import { useEffect, useState, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { fetchExperiencesForUser } from "../services/exploreService";
import { Experience } from "@/modules/user/home/services/homeService";
import ExperienceList from "../components/ExperienceList";
import FiltersSection from "../components/FiltersSection";
import SearchBar from "../components/SearchBar";

export default function ExploreScreen() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [cultureFilter, setCultureFilter] = useState("all");
    const [outcomeFilter, setOutcomeFilter] = useState("all");
    const [timeFilter, setTimeFilter] = useState("anytime");
    const [search, setSearch] = useState("");

    const abortControllerRef = useRef<AbortController | null>(null);
    const isMountedRef = useRef(true);

    // FIXED: Remove loading from dependencies
    const fetchData = useCallback(async (pageNum = 1, append = false) => {
        if (!isMountedRef.current) return;
        
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        // Don't fetch if already loading for initial load
        if (loading && !append) return;
        
        setLoading(true);

        try {
            const res = await fetchExperiencesForUser({
                page: pageNum,
                limit: 10,
                search,
                culture: cultureFilter,
                outcome: outcomeFilter,
                timeFilter,
            });

            if (!isMountedRef.current) return;

            const items = res.data || [];
            if (append) {
                setExperiences(prev => [...prev, ...items]);
            } else {
                setExperiences(items);
            }
            setHasMore(res.meta?.hasNextPage || items.length > 0);
            setPage(pageNum);
        } catch (err: any) {
            if (!isMountedRef.current) return;
            if (err.name !== "AbortError") {
                console.error("Fetch error:", err);
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
                setRefreshing(false);
            }
        }
    }, [cultureFilter, outcomeFilter, timeFilter, search]); // REMOVED loading

    // FIXED: Use separate useEffect for initial load
    useEffect(() => {
        isMountedRef.current = true;
        // Initial load
        fetchData(1, false);
        
        return () => {
            isMountedRef.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // FIXED: Filter changes - reset and fetch
    useEffect(() => {
        if (!isMountedRef.current) return;
        
        setPage(1);
        setExperiences([]);
        fetchData(1, false);
    }, [cultureFilter, outcomeFilter, timeFilter, search]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(1);
        fetchData(1, false);
    }, [fetchData]);

    const loadMore = () => {
        if (!hasMore || loading || refreshing) return;
        fetchData(page + 1, true);
    };

    const handleClearFilters = () => {
        setCultureFilter("all");
        setOutcomeFilter("all");
        setTimeFilter("anytime");
        setSearch("");
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <SearchBar value={search} onChange={setSearch} />
            <FiltersSection
                cultureFilter={cultureFilter}
                setCultureFilter={setCultureFilter}
                outcomeFilter={outcomeFilter}
                setOutcomeFilter={setOutcomeFilter}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
                onClear={handleClearFilters}
            />

            <ExperienceList
                data={experiences}
                loading={loading}
                hasMore={hasMore}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onLoadMore={loadMore}
                onPress={(exp) => {
                    router.push({
                        pathname: "/(tabs)/(user)/experienceDetail",
                        params: { id: exp.id },
                    });
                }}
            />
        </SafeAreaView>
    );
}