import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Controller, Control } from 'react-hook-form';

function getCurrentMonthDates() {
  const arr = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  // Get last day of current month
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let day = today.getDate(); day <= lastDay; day++) {
    const d = new Date(year, month, day);
    arr.push({
      value: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    });
  }
  return arr;
}
const dateOptions = getCurrentMonthDates();

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
};

export default function DatePickerField({ control, name, label, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View className="mb-3">
          <Text className="mb-1 text-base font-medium text-slate-700">{label}</Text>
          <TouchableOpacity
            className="border border-slate-200 rounded-lg px-4 py-3 bg-white"
            onPress={() => setOpen(true)}
            accessibilityLabel={label}
          >
            <Text className={value ? 'text-slate-900' : 'text-slate-400'}>
              {dateOptions.find(o => o.value === value)?.label || placeholder || 'Select date'}
            </Text>
          </TouchableOpacity>
          <Modal visible={open} animationType="slide" transparent>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#0007' }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 16, margin: 24, padding: 16, maxHeight: 400 }}>
                <ScrollView>
                  {dateOptions.map(o => (
                    <TouchableOpacity
                      key={o.value}
                      style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}
                      onPress={() => { onChange(o.value); setOpen(false); }}
                    >
                      <Text style={{ fontSize: 18, color: o.value === value ? "#4ADE80" : "#111" }}>{o.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity style={{ padding: 12 }} onPress={() => setOpen(false)}>
                  <Text style={{ color: "#EF4444", textAlign: "center" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {error && (
            <Text className="mt-1 text-rose-500 text-xs">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
} 