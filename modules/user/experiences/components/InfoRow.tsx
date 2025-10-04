// src/modules/user/experiences/components/InfoRow.tsx
import { View, Text } from 'react-native';

interface InfoRowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  warning?: boolean;
}

export default function InfoRow({ label, value, highlight = false, warning = false }: InfoRowProps) {
  const getValueColor = () => {
    if (warning) return 'text-warning';
    if (highlight) return 'text-primary';
    return 'text-foreground';
  };

  return (
    <View className="flex-row justify-between items-center py-1">
      <Text className="text-muted-foreground font-medium text-sm flex-1">
        {label}
      </Text>
      <Text 
        className={`font-semibold text-base flex-1 text-right ${getValueColor()}`}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}