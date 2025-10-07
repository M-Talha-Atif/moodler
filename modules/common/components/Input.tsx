import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { Controller, Control } from 'react-hook-form';

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'url';
  multiline?: boolean;
  prefix?: string;
};

export default function Input({
  control,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  multiline,
  prefix,
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View className="mb-2">
          <Text className="mb-1 text-base font-medium text-slate-700">{label}</Text>
          <View className="flex-row items-center border rounded-lg px-3 py-2 bg-white border-slate-200">
            {prefix ? <Text className="mr-1 text-slate-400">{prefix}</Text> : null}
            <TextInput
              className="flex-1 text-base text-slate-900"
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType={keyboardType}
              multiline={multiline}
              accessibilityLabel={label}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {error && (
            <Text className="mt-1 text-rose-500 text-xs">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}