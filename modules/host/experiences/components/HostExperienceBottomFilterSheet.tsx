import React, { forwardRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import BottomSheet from "@/components/ui/bottomSheet";
import ChipSelector from "@/components/ui/chipSelector";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";

export const HOST_CULTURE_TAGS = ["all", "beach", "music", "dance", "food", "art", "nature"] as const;
export const HOST_OUTCOME_TAGS = ["all", "happiness", "calmness", "relief", "excitement"] as const;
export const HOST_TIME_FILTERS = ["anytime", "today", "this_week", "this_month"] as const;

export type HostCultureTag = (typeof HOST_CULTURE_TAGS)[number];
export type HostOutcomeTag = (typeof HOST_OUTCOME_TAGS)[number];
export type HostTimeFilter = (typeof HOST_TIME_FILTERS)[number];

export interface HostExperienceFilters {
  cultureTags: HostCultureTag;
  desiredOutcomes: HostOutcomeTag;
  timeFilter: HostTimeFilter;
}

interface HostFilterSheetProps {
  initialFilters: HostExperienceFilters;
  onApply: (filters: HostExperienceFilters) => void;
  onClear: () => void;
}

const HostExperienceBottomFilterSheet = forwardRef<Modalize, HostFilterSheetProps>(
  ({ initialFilters, onApply, onClear }, ref) => {
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => setFilters(initialFilters), [initialFilters]);

    const handleApply = () => {
      onApply(filters);
      (ref as React.RefObject<Modalize>).current?.close();
    };

    const handleClear = () => {
      const cleared = { cultureTags: "all", desiredOutcomes: "all", timeFilter: "anytime" };
      setFilters(cleared);
      onClear();
      (ref as React.RefObject<Modalize>).current?.close();
    };

    const update = <K extends keyof HostExperienceFilters>(key: K, value: HostExperienceFilters[K]) =>
      setFilters((prev) => ({ ...prev, [key]: value }));

    return (
      <BottomSheet ref={ref} title="Filter Experiences">
        {[
          { label: "Culture", key: "cultureTags", options: HOST_CULTURE_TAGS },
          { label: "Outcome", key: "desiredOutcomes", options: HOST_OUTCOME_TAGS },
          { label: "Time", key: "timeFilter", options: HOST_TIME_FILTERS },
        ].map(({ label, key, options }) => (
          <View key={key} style={styles.section}>
            <Text variant="label" style={styles.label}>{label}</Text>
            <ChipSelector
              options={options as string[]}
              defaultSelected={filters[key]}
              selectedColor="#030303"
              unselectedColor="#E8E8E6"
              selectedTextColor="#FAFAF8"
              onChange={(val) => update(key as keyof HostExperienceFilters, val as any)}
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

HostExperienceBottomFilterSheet.displayName = "HostExperienceBottomFilterSheet";

const styles = StyleSheet.create({
  section: { marginBottom: 18 },
  label: { marginBottom: 8 },
  actions: { flexDirection: "row", gap: 10, marginTop: 10, marginBottom: 8},
});

export default HostExperienceBottomFilterSheet;
