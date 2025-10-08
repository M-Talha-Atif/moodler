// src/modules/onboarding/components/QuestionInput.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import ChipSelector from "@/components/ui/chipSelector";
import ToggleSwitch from "@/components/ui/toggleSwitch";

interface QuestionInputProps {
  type: "chips" | "toggle";
  value: any;
  onChange: (value: any) => void;
  id: string;
  options?: string[];
}

export default function QuestionInput({
  type,
  value,
  onChange,
  id,
  options = [],
}: QuestionInputProps) {
  const safeValue =
    value !== null && value !== undefined
      ? value
      : type === "chips"
      ? []
      : false;

  if (type === "chips") {
    const isSingle =
      id === "social" || id === "learningStyle" || id === "intro";

    return (
      <MotiView
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 300 }}
      >
        <ChipSelector
          options={options}
          multiSelect={!isSingle}
          selectedColor="#030303"
          unselectedColor="#EFEFE7"
          selectedTextColor="#EFEFE7"
          textColor="#030303"
          borderColor="#D1D5DB"
          borderRadius={16}
          fontFamily="Nunito"
          fontSize={15}
          spacing={8}
          onChange={(selected) => onChange(selected)}
          containerStyle={styles.chipContainer}
        />
      </MotiView>
    );
  }

  if (type === "toggle") {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 300 }}
        style={styles.toggleWrapper}
      >
        <ToggleSwitch
          label="Enable community features"
          initial={safeValue === "true" || safeValue === true}
          onToggle={(state) => onChange(state ? "true" : "false")}
        />
      </MotiView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  chipContainer: {
    marginTop: 16, // 8pt grid * 2
    flexWrap: "wrap",
    rowGap: 8,
    columnGap: 8,
  },
  toggleWrapper: {
    marginTop: 24, // aligns with section spacing
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F5F5F0",
  },
});
