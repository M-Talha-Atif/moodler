// src/modules/user/experiences/components/InfoRow.tsx
import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';

interface InfoRowProps {
  label: string;
  value: string | number;
  icon: string;
  highlight?: boolean;
  warning?: boolean;
  showProgress?: boolean;
}

const InfoRow = ({
  label,
  value,
  icon,
  highlight = false,
  warning = false,
  showProgress = false,
}: InfoRowProps) => {
  const colors = useMemo(() => ({
    value: warning ? 'text-orange-500' : highlight ? 'text-teal-600' : 'text-gray-900',
    icon: warning ? '#f59e0b' : highlight ? '#0d9488' : '#6b7280',
    glow: warning ? '#f59e0b33' : '#0d948833',
  }), [highlight, warning]);

  // Compute progress (e.g., "3 / 12" → 25%)
  const progress = useMemo(() => {
    if (!showProgress) return 0;
    const match = value.toString().match(/(\d+)\s*\/\s*(\d+)/);
    if (match) {
      const filled = parseInt(match[1], 10);
      const total = parseInt(match[2], 10);
      return Math.min((filled / total) * 100, 100);
    }
    return 0;
  }, [value, showProgress]);

  return (
    <View className="flex-row items-center justify-between py-3 px-2">
      {/* Left: Icon + Label */}
      <View className="flex-row items-center flex-1">
        <MotiView
          from={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 150 }}
        >
          <Ionicons name={icon as any} size={20} color={colors.icon} style={{ marginRight: 12 }} />
        </MotiView>
        <Text className="text-gray-600 font-medium text-sm">{label}</Text>
      </View>

      {/* Right: Value (and optional progress) */}
      <View className="flex-row items-center">
        {showProgress && progress > 0 && (
          <View className="w-5 h-5 mr-2">
            <View className="absolute inset-0 rounded-full bg-gray-200" />
            <View
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: warning ? '#f59e0b' : '#10b981',
                opacity: 0.25,
                transform: [{ rotate: `${progress * 3.6}deg` }],
              }}
            />
          </View>
        )}
        <Text
          className={`font-semibold text-base text-right ${colors.value}`}
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>

      {/* Subtle highlight/warning glow */}
      {(highlight || warning) && (
        <MotiView
          className="absolute inset-0 rounded-xl"
          from={{ opacity: 0.1 }}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ loop: true, duration: 2500, type: 'timing' }}
          style={{ backgroundColor: colors.glow }}
        />
      )}
    </View>
  );
};

export default memo(InfoRow);
