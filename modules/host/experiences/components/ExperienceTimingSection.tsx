import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { useWatch, Controller } from 'react-hook-form';
import Toggle from '@/modules/common/components/Toggle';
import Input from '@/modules/common/components/Input';
import DatePickerField from '@/modules/common/components/DatePickerField';
import TimePickerField from '@/modules/common/components/TimePickerField';

const timezones = [
  'UTC-12', 'UTC-8', 'UTC-5', 'UTC-0',
  'UTC+1', 'UTC+3', 'UTC+5', 'UTC+8',
  'UTC+9', 'UTC+10'
];

export default function ExperienceTimingSection({ control }: any) {
  const isVirtual = useWatch({ control, name: 'isVirtual' });

  return (
    <View>
      <Toggle control={control} name="isVirtual" label="Virtual event?" />
      {isVirtual
        ? <Input control={control} name="meetLink" label="Meeting Link" placeholder="https://..." keyboardType="url" />
        : <Input control={control} name="location" label="Location" placeholder="Venue address" />}
      
      <DatePickerField
        control={control}
        name="date"
        label="Date"
        placeholder="Select date"
      />
      <View className="flex-row">
        <View className="flex-1 mr-2">
          <TimePickerField
            control={control}
            name="sessionStartTime"
            label="Start Time"
            placeholder="Select start time"
          />
        </View>
        <View className="flex-1">
          <TimePickerField
            control={control}
            name="sessionEndTime"
            label="End Time"
            placeholder="Select end time"
          />
        </View>
      </View>
    
      <View className="flex-row mb-3">
        <View className="flex-1 mr-2">
          <Controller
            control={control}
            name="price"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <View>
                <TextInput
                  className="border border-slate-200 rounded-lg px-4 py-3 bg-white"
                  placeholder="Free or amount"
                  keyboardType="numeric"
                  value={value === undefined || value === null ? '' : String(value)}
                  onChangeText={text => onChange(text === '' ? undefined : Number(text))}
                  onBlur={onBlur}
                  accessibilityLabel="Price"
                  inputMode="decimal"
                />
                {error && (
                  <Text className="mt-1 text-rose-500 text-xs">{error.message}</Text>
                )}
              </View>
            )}
          />
        </View>
        <View className="flex-1">
          <Controller
            control={control}
            name="totalSpots"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <View>
                <TextInput
                  className="border border-slate-200 rounded-lg px-4 py-3 bg-white"
                  placeholder="e.g. 20"
                  keyboardType="numeric"
                  value={value === undefined || value === null ? '' : String(value)}
                  onChangeText={text => onChange(text === '' ? undefined : Number(text))}
                  onBlur={onBlur}
                  accessibilityLabel="Total Spots"
                  inputMode="numeric"
                />
                {error && (
                  <Text className="mt-1 text-rose-500 text-xs">{error.message}</Text>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}