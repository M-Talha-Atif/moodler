import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Controller, Control } from 'react-hook-form';

const buildTimes = () => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hh = h.toString().padStart(2, '0');
      const mm = m.toString().padStart(2, '0');
      times.push(`${hh}:${mm}`);
    }
  }
  return times;
};
const timesArr = buildTimes();

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
};

export default function TimePickerField({ control, name, label, placeholder }: Props) {
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
              {value || placeholder || 'Select time'}
            </Text>
          </TouchableOpacity>
          <Modal visible={open} animationType="slide" transparent>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#0007' }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 16, margin: 24, padding: 16, maxHeight: 400 }}>
                <ScrollView>
                  {timesArr.map(t => (
                    <TouchableOpacity
                      key={t}
                      style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}
                      onPress={() => { onChange(t); setOpen(false); }}
                    >
                      <Text style={{ fontSize: 18, color: t === value ? "#4ADE80" : "#111" }}>{t}</Text>
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