import React, { forwardRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";

import BottomSheet from "@/components/ui/bottomSheet";
import ChipSelector from "@/components/ui/chipSelector";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";

export const CULTURE_TAGS = ["all", "beach", "music", "dance", "food", "art", "nature"] as const;
export const OUTCOME_TAGS = ["all", "happiness", "calmness", "relief", "excitement"] as const;
export const TIME_FILTERS = ["anytime", "today", "this_week", "this_month"] as const;

export type CultureTag = (typeof CULTURE_TAGS)[number];
export type OutcomeTag = (typeof OUTCOME_TAGS)[number];
export type TimeFilter = (typeof TIME_FILTERS)[number];

export interface ExperienceFilters {
  culture: CultureTag;
  outcome: OutcomeTag;
  timeFilter: TimeFilter;
}

interface FilterSheetProps {
  initialFilters: ExperienceFilters;
  onApply: (filters: ExperienceFilters) => void;
  onClear: () => void;
}

const ExperienceBottomFilterSheet = forwardRef<Modalize, FilterSheetProps>(
  ({ initialFilters, onApply, onClear }, ref) => {
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => setFilters(initialFilters), [initialFilters]);

    const handleApply = () => {
      onApply(filters);
      (ref as React.RefObject<Modalize>).current?.close();
    };

    const handleClear = () => {
      const cleared = { culture: "all", outcome: "all", timeFilter: "anytime" };
      setFilters(cleared);
      onClear();
      (ref as React.RefObject<Modalize>).current?.close();
    };

    const update = <K extends keyof ExperienceFilters>(key: K, value: ExperienceFilters[K]) =>
      setFilters((prev) => ({ ...prev, [key]: value }));

    return (
      <BottomSheet ref={ref} title="Filter Experiences">
        {[
          { label: "Culture", key: "culture", options: CULTURE_TAGS },
          { label: "Outcome", key: "outcome", options: OUTCOME_TAGS },
          { label: "Time", key: "timeFilter", options: TIME_FILTERS },
        ].map(({ label, key, options }) => (
          <View key={key} style={styles.section}>
            <Text variant="label" style={styles.label}>{label}</Text>
            <ChipSelector
              options={options as string[]}
              defaultSelected={filters[key]}
              selectedColor="#030303"
              unselectedColor="#E8E8E6"
              selectedTextColor="#FAFAF8"
              onChange={(val) => update(key as keyof ExperienceFilters, val as any)}
            />
          </View>
        ))}

        <View style={styles.actions}>
          <Button
            title="Clear"
            onPress={handleClear}
            backgroundColor="#E8E8E6"
            textColor="#030303"
            style={{ flex: 1 }}
          />
          <Button
            title="Apply"
            onPress={handleApply}
            backgroundColor="#030303"
            textColor="#FAFAF8"
            style={{ flex: 1 }}
          />
        </View>
      </BottomSheet>
    );
  }
);

ExperienceBottomFilterSheet.displayName = "ExperienceBottomFilterSheet";

const styles = StyleSheet.create({
  section: { marginBottom: 18 },
  label: { marginBottom: 8 },
  actions: { flexDirection: "row", gap: 10, marginTop: 10, marginBottom: 8},
});

export default ExperienceBottomFilterSheet;
