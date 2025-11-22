import React, { forwardRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheetModal from "@gorhom/bottom-sheet";
import BottomSheet from "@/components/ui/bottomSheet";
import ChipSelector from "@/components/ui/chipSelector";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";

export const HOST_CULTURE_TAGS = [
  "all",
  "beach",
  "music",
  "dance",
  "food",
  "art",
  "nature",
] as const;

export const HOST_OUTCOME_TAGS = [
  "all",
  "happiness",
  "calmness",
  "relief",
  "excitement",
] as const;

export const HOST_TIME_FILTERS = [
  "anytime",
  "today",
  "this_week",
  "this_month",
] as const;

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

/**
 * Host Experience Filter Bottom Sheet
 *
 * Usage:
 * ```tsx
 * const filterSheetRef = useRef<BottomSheetModal>(null);
 *
 * // Open
 * filterSheetRef.current?.present();
 *
 * // Close
 * filterSheetRef.current?.dismiss();
 * ```
 */
const HostExperienceBottomFilterSheet = forwardRef<BottomSheetModal, HostFilterSheetProps>(
  ({ initialFilters, onApply, onClear }, ref) => {
  const [filters, setFilters] = useState<HostExperienceFilters>(initialFilters);

  // Sync internal state with prop changes
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleApply = () => {
    onApply(filters);
    (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
  };

  const handleClear = () => {
    const cleared: HostExperienceFilters = {
      cultureTags: "all",
      desiredOutcomes: "all",
      timeFilter: "anytime",
    };
    setFilters(cleared);
    onClear();
    (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
  };

  const updateFilter = <K extends keyof HostExperienceFilters>(
    key: K,
    value: HostExperienceFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filterSections = [
    {
      label: "Culture",
      key: "cultureTags" as const,
      options: HOST_CULTURE_TAGS,
    },
    {
      label: "Outcome",
      key: "desiredOutcomes" as const,
      options: HOST_OUTCOME_TAGS,
    },
    {
      label: "Time",
      key: "timeFilter" as const,
      options: HOST_TIME_FILTERS,
    },
  ];

  return (
    <BottomSheet ref={ref} title="Filter Experiences">
      {filterSections.map(({ label, key, options }) => (
        <View key={key} style={styles.section}>
          <Text variant="label" style={styles.label}>
            {label}
          </Text>
          <ChipSelector
            options={options as unknown as string[]}
            defaultSelected={filters[key]}
            selectedColor="#030303"
            unselectedColor="#E8E8E6"
            selectedTextColor="#FAFAF8"
            onChange={(val) =>
              updateFilter(key, val as HostExperienceFilters[typeof key])
            }
          />
        </View>
      ))}

      <View style={styles.actions}>
        <Button
          title="Clear"
          onPress={handleClear}
          backgroundColor="#E8E8E6"
          textColor="#030303"
          style={styles.actionButton}
        />
        <Button
          title="Apply"
          onPress={handleApply}
          backgroundColor="#030303"
          textColor="#FAFAF8"
          style={styles.actionButton}
        />
      </View>
    </BottomSheet>
  );
});

HostExperienceBottomFilterSheet.displayName =
  "HostExperienceBottomFilterSheet";

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
  },
  label: {
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
  },
});

export default HostExperienceBottomFilterSheet;