import { View, Text, TouchableOpacity } from "react-native";
import Dropdown from "@/modules/common/components/DropDown";

const CULTURE_TAGS = ["all", "beach", "music", "dance", "food", "art", "nature"] as const;
const OUTCOME_TAGS = ["all", "happiness", "calmness", "relief", "excitement"] as const;
const TIME_FILTERS = ["anytime", "today", "this_week", "this_month"] as const;

type FilterValue =
  | (typeof CULTURE_TAGS)[number]
  | (typeof OUTCOME_TAGS)[number]
  | (typeof TIME_FILTERS)[number];

interface FiltersSectionProps {
  cultureFilter: (typeof CULTURE_TAGS)[number];
  setCultureFilter: (value: (typeof CULTURE_TAGS)[number]) => void;
  outcomeFilter: (typeof OUTCOME_TAGS)[number];
  setOutcomeFilter: (value: (typeof OUTCOME_TAGS)[number]) => void;
  timeFilter: (typeof TIME_FILTERS)[number];
  setTimeFilter: (value: (typeof TIME_FILTERS)[number]) => void;
  onClear: () => void;
}

export default function FiltersSection({
  cultureFilter,
  setCultureFilter,
  outcomeFilter,
  setOutcomeFilter,
  timeFilter,
  setTimeFilter,
  onClear,
}: FiltersSectionProps) {
  const hasActiveFilters =
    cultureFilter !== "all" ||
    outcomeFilter !== "all" ||
    timeFilter !== "anytime";

  return (
    <View className="bg-white px-4 py-4 border-b border-gray-200 rounded-3xl mx-4 mt-3 mb-5 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-900">Filters</Text>
        {hasActiveFilters && (
          <TouchableOpacity onPress={onClear}>
            <Text className="text-red-500 text-sm font-medium">Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Dropdown filters */}
      <View className="flex-row gap-4">
        <View className="flex-1 z-30">
          <Dropdown<(typeof CULTURE_TAGS)[number]>
            label="Culture"
            options={CULTURE_TAGS.map((item) => ({
              label: item.charAt(0).toUpperCase() + item.slice(1).replace("_", " "),
              value: item.toLowerCase(),
            }))}
            selectedValue={cultureFilter}
            onSelect={setCultureFilter}
          />
        </View>

        <View className="flex-1 z-20">
          <Dropdown<(typeof OUTCOME_TAGS)[number]>
            label="Outcome"
            options={OUTCOME_TAGS.map((item) => ({
              label: item.charAt(0).toUpperCase() + item.slice(1).replace("_", " "),
              value: item.toLowerCase(),
            }))}
            selectedValue={outcomeFilter}
            onSelect={setOutcomeFilter}
          />
        </View>

        <View className="flex-1 z-10">
          <Dropdown<(typeof TIME_FILTERS)[number]>
            label="Time"
            options={TIME_FILTERS.map((item) => ({
              label: item.charAt(0).toUpperCase() + item.slice(1).replace("_", " "),
              value: item.toLowerCase(),
            }))}
            selectedValue={timeFilter}
            onSelect={setTimeFilter}
          />
        </View>
      </View>
    </View>
  );
}
