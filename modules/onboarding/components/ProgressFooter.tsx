// src/features/onboarding/components/ProgressFooter.tsx
import { View, Text, TouchableOpacity } from "react-native";

interface ProgressFooterProps {
  step: number;
  total: number;
  onNext: () => void;
  disabled?: boolean;
}

export default function ProgressFooter({
  step,
  total,
  onNext,
  disabled,
}: ProgressFooterProps) {
  return (
    <View className="flex-row items-center justify-between w-full border-t border-gray-200 pt-6 mt-4">
      {/* Step Info */}
      <Text className="text-gray-600 text-sm">
        Step {step + 1} of {total}
      </Text>

      {/* Next Button */}
      <TouchableOpacity
        onPress={onNext}
        disabled={disabled}
        className={`px-6 py-3 rounded-xl ${
          disabled ? "bg-gray-400" : "bg-[#7bf163]"
        }`}
      >
        <Text className="text-white font-semibold text-base">
          {step === total - 1 ? "Finish" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
