import { View, Text, TouchableOpacity, FlatList } from "react-native";

const CULTURE_TAGS = ["all", "beach", "music", "dance", "food", "art", "nature"];
const OUTCOME_TAGS = ["all", "happiness", "calmness", "relief", "excitement"];
const TIME_FILTERS = ["anytime", "today", "this_week", "this_month"];

export default function FiltersSection({
  cultureFilter,
  setCultureFilter,
  outcomeFilter,
  setOutcomeFilter,
  timeFilter,
  setTimeFilter,
  onClear,
}: any) {
  const hasActiveFilters =
    cultureFilter !== "all" ||
    outcomeFilter !== "all" ||
    timeFilter !== "anytime";

  const renderFilterRow = (title: string, tags: string[], selected: string, setSelected: (t: string) => void) => (
    <View>
      <Text className="text-sm font-medium text-gray-700 mb-2">{title}</Text>
      <FlatList
        horizontal
        data={tags}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`px-4 py-2 rounded-full mr-2 ${
              selected === item ? "bg-green-500" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selected === item ? "text-white" : "text-gray-700"
              }`}
            >
              {item.replace("_", " ")}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View className="bg-white px-4 py-3 border-b border-gray-200">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-900">Filters</Text>
        {hasActiveFilters && (
          <TouchableOpacity onPress={onClear}>
            <Text className="text-red-500 text-sm font-medium">Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="space-y-3">
        {renderFilterRow("Culture", CULTURE_TAGS, cultureFilter, setCultureFilter)}
        {renderFilterRow("Outcome", OUTCOME_TAGS, outcomeFilter, setOutcomeFilter)}
        {renderFilterRow("Time", TIME_FILTERS, timeFilter, setTimeFilter)}
      </View>
    </View>
  );
}
