import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MotiView } from "moti";
import { Filter, X } from "lucide-react-native";
import Dropdown from "@/modules/common/components/DropDown";

interface Filters {
  status: string;
  timeFilter: string;
}

interface FilterProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

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

export default function SearchAndFilters({
  filters,
  onFilterChange,
  hasActiveFilters,
  onClearFilters,
}: FilterProps) {
  const currentStatus = filters?.status || "all";
  const currentTimeFilter = filters?.timeFilter || "anytime";

  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      className="mx-4 mt-3 mb-6 p-5 rounded-3xl bg-white shadow-md border border-gray-100"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center">
          <View className="p-2 rounded-full bg-blue-50 mr-2">
            <Filter size={18} className="text-blue-600" />
          </View>
          <Text className="text-lg font-semibold text-gray-900">Filters</Text>
        </View>

        {hasActiveFilters && (
          <TouchableOpacity
            onPress={onClearFilters}
            className="flex-row items-center px-3 py-1.5 rounded-full bg-gray-100"
          >
            <X size={14} className="text-gray-600 mr-1" />
            <Text className="text-sm text-gray-600 font-medium">Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Controls */}
      <View className="flex-row gap-4">
        <View className="flex-1 z-4">
          <Dropdown
            label="Status"
            options={STATUS_OPTIONS}
            selectedValue={currentStatus}
            onSelect={(v) => onFilterChange("status", v)}
          />
        </View>

        <View className="flex-1 z-4">
          <Dropdown
            label="When"
            options={TIME_OPTIONS}
            selectedValue={currentTimeFilter}
            onSelect={(v) => onFilterChange("timeFilter", v)}
          />
        </View>
      </View>

    </MotiView>
  );
}