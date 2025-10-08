// src/features/onboarding/components/ProgressFooter.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "@/components/ui/progressBar";
import Button from "@/components/ui/button";

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
  const progress = (step + 1) / total;
  const isLast = step === total - 1;

  return (
    <View style={styles.footerContainer}>
      {/* 🟦 Progress Bar */}
      <View style={styles.progressWrapper}>
        <ProgressBar
          progress={progress}
          height={8}
          backgroundColor="#E8E8E6"
          fillColor="#030303"
          borderRadius={4}
        />
        <Text style={styles.stepText}>
          Step {step + 1} of {total}
        </Text>
      </View>

      {/* 🪷 Next / Finish Button */}
      <Button
        title={isLast ? "Finish" : "Next"}
        onPress={onNext}
        disabled={disabled}
        backgroundColor={disabled ? "#D1D5DB" : "#030303"}
        textColor="#EFEFE7"
        width="100%"
        height={46}
        borderRadius={9}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    paddingTop: 16,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 16,
  },
  progressWrapper: {
    gap: 8,
  },
  stepText: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "right",
  },
});
