import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MotiView } from "moti";
import { Filter, X } from "lucide-react-native";

export default function SearchAndFilters({
  filters,
  onFilterChange,
  hasActiveFilters,
  onClearFilters,
}: any) {
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
            accessibilityLabel="Clear all filters"
          >
            <X size={14} className="text-gray-600 mr-1" />
            <Text className="text-sm text-gray-600 font-medium">Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Controls */}
      <View className="flex-row gap-4">
        {/* Status Filter */}
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">
            Status
          </Text>
          <View className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden shadow-xs">
            <Picker
              selectedValue={currentStatus}
              onValueChange={(value) => onFilterChange("status", value)}
              style={{ height: 52 }}
              dropdownIconColor="#6B7280"
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Confirmed" value="confirmed" />
              <Picker.Item label="Waitlisted" value="waitlisted" />
              <Picker.Item label="Cancelled" value="cancelled" />
            </Picker>
          </View>
        </View>

        {/* Time Filter */}
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">
            When
          </Text>
          <View className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden shadow-xs">
            <Picker
              selectedValue={currentTimeFilter}
              onValueChange={(value) => onFilterChange("timeFilter", value)}
              style={{ height: 52 }}
              dropdownIconColor="#6B7280"
            >
              <Picker.Item label="Anytime" value="anytime" />
              <Picker.Item label="Today" value="today" />
              <Picker.Item label="Tomorrow" value="tomorrow" />
              <Picker.Item label="This Weekend" value="weekend" />
              <Picker.Item label="Next Week" value="next-week" />
            </Picker>
          </View>
        </View>
      </View>
    </MotiView>
  );
}
