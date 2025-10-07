import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Controller, Control } from 'react-hook-form';

type Props = {
  control: Control<any>;
  name: string;
  label: string;
};

export default function Toggle({ control, name, label }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-base font-medium text-slate-700">{label}</Text>
          <Switch
            value={!!value}
            onValueChange={onChange}
            accessibilityLabel={label}
          />
          {error && (
            <Text className="text-rose-500 text-xs ml-2">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}