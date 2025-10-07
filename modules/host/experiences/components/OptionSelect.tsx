import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';

type Option = { value: string; label: string };

export default function OptionSelect({
  control, name, label, options, setValue, value, modalLabel
}: {
  control: any;
  name: string;
  label: string;
  options: Option[];
  setValue: (name: string, v: any, opts?: any) => void;
  value: string;
  modalLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value)?.label || '';
  return (
    <View className="mb-3">
      <Text className="mb-1 text-base font-medium text-slate-700">{label}</Text>
      <TouchableOpacity
        className="border border-slate-200 rounded-lg px-4 py-3 bg-white"
        onPress={() => setOpen(true)}
        accessibilityLabel={label}
      >
        <Text className={selected ? 'text-slate-900' : 'text-slate-400'}>
          {selected || `Select ${modalLabel || label}`}
        </Text>
      </TouchableOpacity>
      {open && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 64,
            zIndex: 50,
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#E2E8F0',
            borderRadius: 16,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            maxHeight: 320,
          }}
        >
          <ScrollView>
            {options.map(item => (
              <TouchableOpacity
                key={item.value}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                  backgroundColor: item.value === value ? '#DEF7EC' : '#FFF',
                }}
                onPress={() => {
                  setValue(name, item.value, { shouldValidate: true });
                  setOpen(false);
                  Haptics.selectionAsync();
                }}
              >
                <Text style={{
                  color: item.value === value ? '#059669' : '#1E293B',
                  fontWeight: item.value === value ? 'bold' : 'normal',
                }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={{ paddingVertical: 12 }} onPress={() => setOpen(false)}>
            <Text className="text-center text-rose-400">Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}