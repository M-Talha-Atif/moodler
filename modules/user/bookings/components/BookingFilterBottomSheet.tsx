import React, { forwardRef, useState, useEffect } from "react";
import { View } from "react-native";
import BottomSheet from "@/components/ui/bottomSheet";
import ChipSelector from "@/components/ui/chipSelector";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";
import { BookingFilters } from "../screens/BookingsScreen";
import { Modalize } from "react-native-modalize";

const STATUS_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Waitlisted", value: "waitlisted" },
    { label: "Cancelled", value: "cancelled" },
];

const TIME_OPTIONS = [
    { label: "Anytime", value: "anytime" },
    { label: "Today", value: "today" },
    { label: "Tomorrow", value: "tomorrow" },
    { label: "This Weekend", value: "weekend" },
    { label: "Next Week", value: "next-week" },
];

interface FilterSheetProps {
    initialFilters: BookingFilters;
    onApply: (filters: BookingFilters) => void;
    onClear: () => void;
}

const BookingFiltersSheet = forwardRef<Modalize, FilterSheetProps>(
    ({ initialFilters, onApply, onClear }, ref) => {
        const [status, setStatus] = useState(initialFilters.status);
        const [timeFilter, setTimeFilter] = useState(initialFilters.timeFilter);

        useEffect(() => {
            setStatus(initialFilters.status);
            setTimeFilter(initialFilters.timeFilter);
        }, [initialFilters]);

        const handleApply = () => {
            onApply({ status, timeFilter });
            // ref has current property
            if (ref && 'current' in ref) {
                ref.current?.close();
            }
        };

        const handleClear = () => {
            setStatus("all");
            setTimeFilter("anytime");
            onClear();
            //  ref has current property
            if (ref && 'current' in ref) {
                ref.current?.close();
            }
        };

        return (
            <BottomSheet ref={ref} title="Filter Bookings">
                <View style={{ marginBottom: 18 }}>
                    <Text variant="label" style={{ marginBottom: 8 }}>
                        Status
                    </Text>
                    <ChipSelector
                        key={`status-${status}`} //  Forces re-render with correct selection
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

                <View style={{ marginBottom: 18 }}>
                    <Text variant="label" style={{ marginBottom: 8 }}>
                        Time
                    </Text>
                    <ChipSelector
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

                <View style={{ flexDirection: "row", gap: 10, marginBottom: 8 }}>
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

BookingFiltersSheet.displayName = "BookingFiltersSheet";
export default BookingFiltersSheet;
