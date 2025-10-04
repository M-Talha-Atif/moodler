// src/modules/user/notifications/components/MarkAllButton.tsx
import { TouchableOpacity, Text } from 'react-native';
import { MotiView } from 'moti';

interface MarkAllButtonProps {
  onPress: () => void;
}

export default function MarkAllButton({ onPress }: MarkAllButtonProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-5"
    >
      <TouchableOpacity
        onPress={onPress}
        className="w-full py-4 rounded-2xl bg-primary shadow-lg"
        accessibilityLabel="Mark all notifications as read"
        accessibilityRole="button"
      >
        <Text className="text-center text-primary-foreground font-semibold text-base">
          Mark All as Read
        </Text>
      </TouchableOpacity>
    </MotiView>
  );
}