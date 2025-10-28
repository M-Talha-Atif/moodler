import React from "react";
import { View, StyleSheet } from "react-native";
import { Controller, useWatch } from "react-hook-form";
import Toggle from "@/modules/common/components/Toggle";
import Input from "@/components/ui/input";
import DatePickerField from "@/components/ui/datePicker";
import { Text } from "@/components/ui/text";

export default function ExperienceTimingSection({ control }: any) {
  const isVirtual = useWatch({ control, name: "isVirtual" });
  const startTime = useWatch({ control, name: "sessionStartTime" });
  const endTime = useWatch({ control, name: "sessionEndTime" });

  // Convert time string to Date object for the DatePicker
  // In ExperienceTimingSection - update the timeStringToDate function:
  const timeStringToDate = (timeValue: any) => {
    if (!timeValue) return new Date();

    try {
      // If it's already a Date object, return it
      if (timeValue instanceof Date) {
        return timeValue;
      }

      // If it's an ISO string (like "2025-10-12T15:19:00.000Z")
      if (typeof timeValue === 'string' && timeValue.includes('T')) {
        return new Date(timeValue);
      }

      // If it's a time string (like "8:19 PM")
      if (typeof timeValue === 'string') {
        const [time, modifier] = timeValue.trim().split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier?.toUpperCase() === "PM" && hours < 12) hours += 12;
        if (modifier?.toUpperCase() === "AM" && hours === 12) hours = 0;

        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
      }

      // Fallback
      return new Date();
    } catch (error) {
      console.error("Error parsing time:", timeValue, error);
      return new Date();
    }
  };

  // For min/max constraints, create Date objects from time strings
  const getStartTimeDate = () => {
    return startTime ? timeStringToDate(startTime) : undefined;
  };

  const getEndTimeDate = () => {
    return endTime ? timeStringToDate(endTime) : undefined;
  };

  return (
    <View style={styles.container}>
      {/* Virtual toggle */}
      <Toggle control={control} name="isVirtual" label="Virtual event?" />

      {/* Meeting link or location */}
      {isVirtual ? (
        <Controller
          control={control}
          name="meetLink"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <Input
                label="Meeting Link"
                placeholder="https://..."
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="url"
                backgroundColor="#EFEFE7"
                borderColor="#D1D5DB"
                borderWidth={1}
                borderRadius={8}
                fontSize={14}
                height={44}
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </View>
          )}
        />
      ) : (
        <Controller
          control={control}
          name="location"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <Input
                label="Location"
                placeholder="Venue address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                backgroundColor="#EFEFE7"
                borderColor="#D1D5DB"
                borderWidth={1}
                borderRadius={8}
                fontSize={14}
                height={44}
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </View>
          )}
        />
      )}

      {/* Date */}
      <DatePickerField
        control={control}
        name="date"
        label="Date"
        mode="date"
        placeholder="Select date"
      />

      {/* Start & End time */}
      <View style={styles.row}>
        <View style={styles.half}>
          <DatePickerField
            control={control}
            name="sessionStartTime"
            label="Start Time"
            mode="time"
            placeholder="Select start time"
            minDate={undefined}
            maxDate={getEndTimeDate()}
          />
        </View>
        <View style={styles.half}>
          <DatePickerField
            control={control}
            name="sessionEndTime"
            label="End Time"
            mode="time"
            placeholder="Select end time"
            minDate={getStartTimeDate()}
          />
        </View>
      </View>

      {/* Price & total spots */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Controller
            control={control}
            name="price"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <View>
                <Input
                  label="Price"
                  placeholder="Free or amount"
                  keyboardType="numeric"
                  value={value ? String(value) : ""}
                  onChangeText={(text) => onChange(text === "" ? undefined : Number(text))}
                  onBlur={onBlur}
                  backgroundColor="#EFEFE7"
                  borderColor="#D1D5DB"
                  borderWidth={1}
                  borderRadius={8}
                  fontSize={14}
                  height={44}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />
        </View>

        <View style={styles.half}>
          <Controller
            control={control}
            name="totalSpots"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <View>
                <Input
                  label="Total Spots"
                  placeholder="e.g. 20"
                  keyboardType="numeric"
                  value={value ? String(value) : ""}
                  onChangeText={(text) => onChange(text === "" ? undefined : Number(text))}
                  onBlur={onBlur}
                  backgroundColor="#EFEFE7"
                  borderColor="#D1D5DB"
                  borderWidth={1}
                  borderRadius={8}
                  fontSize={14}
                  height={44}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  errorText: {
    marginTop: 4,
    color: "#DC2626",
    fontSize: 12,
  },
})