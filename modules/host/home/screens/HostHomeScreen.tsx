// src/modules/host/home/HostHomeScreen.tsx
import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Header from "@/modules/common/Header";
import StatCard from "@/modules/common/components/StatCard";
import Skeleton from "@/modules/common/components/Skeleton";
import RecentBookingCard from "../components/RecentBookingCard";
import { fetchBookingStats, fetchRecentBookings } from "../services/hostHomeService";

export default function HostHomeScreen({ navigation }: any) {
    const [stats, setStats] = useState<any>(null);
    const [recentBookings, setRecentBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const statsData = await fetchBookingStats();
                const recentData = await fetchRecentBookings();
                setStats(statsData);
                setRecentBookings(recentData);
            } catch (err: any) {
                setError(err.message || "Failed to fetch dashboard data");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <>
            <Header title="Host Dashboard" showBackButton={false} />

            <View className="flex-1 bg-gray-50">

                <View className="mt-50" />

                <ScrollView contentContainerStyle={{ paddingBottom: 10, paddingTop: 100 }} className="flex-1 pt-4 px-4">
                    {/* 📊 Stats */}
                    <View className="mb-4">
                        {loading ? (
                            <>
                                <View className="flex-row mb-2">
                                    <Skeleton height={80} width="48%" radius={16} style={{ marginRight: 8 }} />
                                    <Skeleton height={80} width="48%" radius={16} />
                                </View>
                                <View className="flex-row">
                                    <Skeleton height={80} width="48%" radius={16} style={{ marginRight: 8 }} />
                                    <Skeleton height={80} width="48%" radius={16} />
                                </View>
                            </>
                        ) : (
                            <>
                                <View className="flex-row mb-2">
                                    <StatCard
                                        title="Total Bookings"
                                        value={stats.total || 0}
                                        subtitle="All bookings"
                                        colors={["#34d399", "#10b981"]}
                                    />
                                    <StatCard
                                        title="Revenue"
                                        value={`$${stats.revenue || 0}`}
                                        subtitle="Generated"
                                        colors={["#60a5fa", "#3b82f6"]}
                                    />
                                </View>
                                <View className="flex-row">
                                    <StatCard
                                        title="Created Experiences"
                                        value={stats.experiences || 0}
                                        subtitle="You own"
                                        colors={["#f59e0b", "#d97706"]}
                                    />
                                    <StatCard
                                        title="Avg Rating"
                                        value={stats.avgRating || 0}
                                        subtitle="Across experiences"
                                        colors={["#ec4899", "#be185d"]}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                    {/* 📝 Recent Bookings */}
                    <Text className="text-gray-700 font-semibold mb-2 text-lg">Recent Bookings</Text>
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={70} radius={12} style={{ marginBottom: 8 }} />)
                    ) : recentBookings.length === 0 ? (
                        <Text className="text-gray-500 text-center my-4">No recent bookings</Text>
                    ) : (
                        recentBookings.map((b) => <RecentBookingCard key={b.bookingId} booking={b} />)
                    )}

                    {/* ➕ Create Experience Button */}
                    <TouchableOpacity
                        className="bg-emerald-500 py-3 rounded-2xl mt-6 mb-10 items-center"
                        onPress={() => navigation.navigate("createExperience")}
                    >
                        <Text className="text-white font-semibold text-base">Create New Experience</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        </>
    );
}
