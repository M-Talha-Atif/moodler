// MoodProgressChart.tsx
import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import dayjs from "dayjs";

const moodMap: Record<string, number> = { sad: 1, neutral: 2, happy: 3, angry: 4, surprise: 5 };
const emojiMap: Record<number, string> = { 1: "😢", 2: "😐", 3: "😊", 4: "😠", 5: "😲" };

interface MoodProgressChartProps {
  moodLogs: { createdAt: string; finalMood: string }[];
}

const MoodProgressChart: React.FC<MoodProgressChartProps> = ({ moodLogs }) => {
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDays = useMemo(() => {
    const startOfWeek = dayjs().add(weekOffset, "week").startOf("week");
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
  }, [weekOffset]);

  const moodData = weekDays.map((day) => {
    const entry = moodLogs.find((m) => dayjs(m.createdAt).isSame(day, "day"));
    const moodValue = entry ? moodMap[entry.finalMood] : 0;
    return { value: moodValue, label: day.format("dd"), emoji: moodValue ? emojiMap[moodValue] : "⚪", key: day.format("YYYY-MM-DD") };
  });

  const weekLabel = `${weekDays[0].format("MMM D")} - ${weekDays[6].format("MMM D")}`;

  return (
    <Animated.View entering={FadeInDown.delay(200).duration(600).springify()} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setWeekOffset((p) => p - 1)} style={styles.navBtn}>
          <ChevronLeft size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.weekLabel}>{weekLabel}</Text>
        <TouchableOpacity
          onPress={() => setWeekOffset((p) => p + 1)}
          disabled={weekOffset >= 0}
          style={[styles.navBtn, weekOffset >= 0 && styles.disabledNav]}
        >
          <ChevronRight size={18} color="#000" />
        </TouchableOpacity>
      </View>

      <BarChart
        data={moodData.map((m) => ({
          value: m.value,
          label: m.label,
          frontColor: m.value ? "#000" : "#d1d5db",
          gradientColor: m.value ? "#4b5563" : "#d1d5db",
          key: m.key, // unique per day
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
        xAxisLabelTextStyle={{ color: "#000", fontSize: 11, fontWeight: "600" }}
        renderTooltip={(item) => (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{item.value ? `${item.value} mood pts` : "No data"}</Text>
          </View>
        )}
      />

      <View style={styles.emojiRow}>
        {moodData.map((m) => (
          <Text key={m.key} style={styles.emoji}>{m.emoji}</Text>
        ))}
      </View>

      <View style={styles.scaleContainer}>
        <Text style={styles.scaleTitle}>Mood Scale:</Text>
        <Text style={styles.scaleText}>1 😢 Sad | 2 😐 Neutral | 3 😊 Happy | 4 😠 Angry | 5 😲 Surprised</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 24, overflow: "hidden", marginBottom: 32, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  navBtn: { padding: 6, borderRadius: 50, backgroundColor: "#e5e7eb" },
  disabledNav: { opacity: 0.4, backgroundColor: "#f3f4f6" },
  weekLabel: { fontSize: 16, fontWeight: "600", color: "#000" },
  tooltip: { backgroundColor: "#fff", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  tooltipText: { fontSize: 12, fontWeight: "600", color: "#374151" },
  emojiRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  emoji: { textAlign: "center", width: 28, fontSize: 16 },
  scaleContainer: { marginTop: 16, backgroundColor: "rgba(0,0,0,0.05)", borderRadius: 16, padding: 8 },
  scaleTitle: { fontSize: 12, fontWeight: "600", color: "#000", marginBottom: 2 },
  scaleText: { fontSize: 10, color: "#4b5563" },
});

export default MoodProgressChart;
