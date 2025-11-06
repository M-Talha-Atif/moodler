import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Controller, Control } from "react-hook-form";
import dayjs from "dayjs";
import { Text } from "@/components/ui/text";

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  mode?: "date" | "time" | "datetime";
  placeholder?: string;
  /** Optional constraints — used for start/end time validation */
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePickerField({
  control,
  name,
  label,
  mode = "date",
  placeholder = "Select date",
  minDate,
  maxDate,
}: Props) {
  const [visible, setVisible] = useState(false);

  const formatValue = (date: Date) => {
    if (mode === "time") return dayjs(date).format("hh:mm A");
    if (mode === "datetime") return dayjs(date).format("DD MMM YYYY, hh:mm A");
    return dayjs(date).format("DD MMM YYYY");
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && (
            <Text variant="caption" fontWeight="600" style={styles.label}>
              {label}
            </Text>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.inputContainer}
            onPress={() => setVisible(true)}
          >
            <Text
              variant="body"
              color={value ? "#030303" : "#6B7280"}
              fontSize={14}
            >
              {value ? formatValue(value) : placeholder}
            </Text>
          </TouchableOpacity>

          {error && (
            <Text variant="micro" color="#DC2626" style={styles.errorText}>
              {error.message}
            </Text>
          )}

          <DateTimePickerModal
            isVisible={visible}
            mode={mode}
            date={value instanceof Date ? value : new Date(value || Date.now())}
            /** Enforce min/max boundaries */
            minimumDate={minDate}
            maximumDate={maxDate}
            onConfirm={(date) => {
              onChange(date);
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
            themeVariant="light"
            display={Platform.OS === "ios" ? "spinner" : "default"}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    color: "#030303",
    fontFamily: "Nunito",
  },
  inputContainer: {
    backgroundColor: "#EFEFE7",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  errorText: {
    marginTop: 4,
  },
});
