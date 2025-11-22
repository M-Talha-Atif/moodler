import React, { forwardRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheetModal from "@gorhom/bottom-sheet";
import BottomSheet from "@/components/ui/bottomSheet";
import ChipSelector from "@/components/ui/chipSelector";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";
import { BookingFilters } from "../screens/BookingsScreen";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Waitlisted", value: "waitlisted" },
  { label: "Cancelled", value: "cancelled" },
] as const;

const TIME_OPTIONS = [
  { label: "Anytime", value: "anytime" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This Weekend", value: "weekend" },
  { label: "Next Week", value: "next-week" },
] as const;

interface FilterSheetProps {
  initialFilters: BookingFilters;
  onApply: (filters: BookingFilters) => void;
  onClear: () => void;
}

/**
 * Booking Filters Bottom Sheet
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
const BookingFiltersSheet = forwardRef<BottomSheetModal, FilterSheetProps>(
  ({ initialFilters, onApply, onClear }, ref) => {
    const [status, setStatus] = useState(initialFilters.status);
    const [timeFilter, setTimeFilter] = useState(initialFilters.timeFilter);

    // Sync internal state with prop changes
    useEffect(() => {
      setStatus(initialFilters.status);
      setTimeFilter(initialFilters.timeFilter);
    }, [initialFilters]);

    const handleApply = () => {
      onApply({ status, timeFilter });
      (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
    };

    const handleClear = () => {
      setStatus("all");
      setTimeFilter("anytime");
      onClear();
      (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
    };

    return (
      <BottomSheet ref={ref} title="Filter Bookings">
        {/* Status Filter */}
        <View style={styles.section}>
          <Text variant="label" style={styles.label}>
            Status
          </Text>
          <ChipSelector
            key={`status-${status}`} // Forces re-render with correct selection
            options={STATUS_OPTIONS.map((s) => s.label)}
            multiSelect={false}
            selectedColor="#030303"
            unselectedColor="#E8E8E6"
            selectedTextColor="#FAFAF8"
            onChange={(label) => {
              const selectedOption = STATUS_OPTIONS.find(
                (s) => s.label === label
              );
              if (selectedOption) setStatus(selectedOption.value);
            }}
            defaultSelected={
              STATUS_OPTIONS.find((s) => s.value === status)?.label || "All"
            }
          />
        </View>

        {/* Time Filter */}
        <View style={styles.section}>
          <Text variant="label" style={styles.label}>
            Time
          </Text>
          <ChipSelector
            key={`time-${timeFilter}`} // Forces re-render with correct selection
            options={TIME_OPTIONS.map((t) => t.label)}
            multiSelect={false}
            selectedColor="#030303"
            unselectedColor="#E8E8E6"
            selectedTextColor="#FAFAF8"
            onChange={(label) => {
              const selectedOption = TIME_OPTIONS.find(
                (t) => t.label === label
              );
              if (selectedOption) setTimeFilter(selectedOption.value);
            }}
            defaultSelected={
              TIME_OPTIONS.find((t) => t.value === timeFilter)?.label ||
              "Anytime"
            }
          />
        </View>

        {/* Action Buttons */}
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
  }
);

BookingFiltersSheet.displayName = "BookingFiltersSheet";

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
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
  },
});

export default BookingFiltersSheet;