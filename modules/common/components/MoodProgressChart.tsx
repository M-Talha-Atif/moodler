// src/modules/common/components/MoodProgressChart.tsx
import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart } from "react-native-gifted-charts";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import dayjs from "dayjs";

// mood-to-value mapping
const moodMap: Record<string, number> = {
    sad: 1,
    neutral: 2,
    happy: 3,
    angry: 4,
    surprise: 5,
};

// emoji legend
const emojiMap: Record<number, string> = {
    1: "😢",
    2: "😐",
    3: "😊",
    4: "😠",
    5: "😲",
};

interface MoodProgressChartProps {
    moodLogs: { createdAt: string; finalMood: string }[];
}

export default function MoodProgressChart({ moodLogs }: MoodProgressChartProps) {
    const [weekOffset, setWeekOffset] = useState(0); // 0 = current week, -1 = previous week

    // compute week days dynamically (Mon–Sun)
    const weekDays = useMemo(() => {
        const startOfWeek = dayjs().add(weekOffset, "week").startOf("week");
        return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
    }, [weekOffset]);

    // merge API data with missing days
    const moodData = weekDays.map((day) => {
        const entry = moodLogs.find((m) => dayjs(m.createdAt).isSame(day, "day"));
        const moodValue = entry ? moodMap[entry.finalMood] : 0;
        return {
            value: moodValue,
            label: day.format("dd"), // short weekday label e.g. Mo, Tu
            emoji: moodValue > 0 ? emojiMap[moodValue] : "⚪", // show white dot for no data
        };
    });

    // dynamic title
    const weekLabel = `${weekDays[0].format("MMM D")} - ${weekDays[6].format(
        "MMM D"
    )}`;

    return (
        <Animated.View
            entering={FadeInDown.delay(200).duration(600).springify()}
            className="rounded-3xl mb-8 overflow-hidden shadow-sm"
        >
            <LinearGradient
                colors={["#ecfdf5", "#d1fae5"]}
                className="p-5 rounded-3xl"
            >
                {/* Header */}
                <View className="flex-row justify-between items-center mb-3">
                    <TouchableOpacity
                        onPress={() => setWeekOffset((p) => p - 1)}
                        className="p-1 rounded-full bg-emerald-200/50"
                    >
                        <ChevronLeft size={18} color="#047857" />
                    </TouchableOpacity>

                    <Text className="text-lg font-semibold text-emerald-800">
                        {weekLabel}
                    </Text>

                    <TouchableOpacity
                        onPress={() => setWeekOffset((p) => p + 1)}
                        disabled={weekOffset >= 0}
                        className={`p-1 rounded-full ${weekOffset >= 0 ? "opacity-40 bg-gray-200" : "bg-emerald-200/50"
                            }`}
                    >
                        <ChevronRight size={18} color="#047857" />
                    </TouchableOpacity>
                </View>

                {/* Bar chart */}
                <BarChart
                    data={moodData.map((m, index) => ({
                        value: m.value,
                        label: m.label,
                        frontColor: m.value === 0 ? "#d1d5db" : "#10b981",
                        gradientColor: m.value === 0 ? "#d1d5db" : "#34d399",
                        key: String(index), // give each item a stable key
                    }))}
                    barWidth={28}
                    spacing={12}
                    roundedTop
                    hideRules
                    hideYAxisText
                    noOfSections={5}
                    yAxisThickness={0}
                    initialSpacing={10}
                    animateOnDataChange
                    animationDuration={800}
                    xAxisLabelTextStyle={{
                        color: "#065f46",
                        fontSize: 11,
                        fontWeight: "600",
                    }}
                    renderTooltip={(item) => (
                        <View className="bg-white rounded-xl px-2 py-1 shadow-md">
                            <Text className="text-xs font-semibold text-gray-700">
                                {item.value > 0 ? `${item.value} mood pts` : "No data"}
                            </Text>
                        </View>
                    )}
                />

                {/* Emoji row */}
                <View className="flex-row justify-between items-center mt-4 px-2">
                    {moodData.map((m, i) => (
                        <Text
                            key={i}
                            className="text-base"
                            style={{ textAlign: "center", width: 28 }}
                        >
                            {m.emoji}
                        </Text>
                    ))}
                </View>

                {/* Mood scale */}
                <View className="mt-4 bg-white/60 rounded-2xl px-3 py-2">
                    <Text className="text-gray-700 font-semibold mb-1 text-sm">
                        Mood Scale:
                    </Text>
                    <Text className="text-gray-600 text-xs">
                        1 😢 Sad | 2 😐 Neutral | 3 😊 Happy | 4 😠 Angry | 5 😲 Surprised
                    </Text>
                </View>
            </LinearGradient>
        </Animated.View>
    );
}
