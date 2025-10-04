// src/modules/user/bookings/components/BookingsHeader.tsx
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

export default function BookingsHeader() {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      className="px-5 pt-4 pb-3"
    >
      <Text className="text-3xl font-bold text-foreground font-display text-center mb-2">
        Your Bookings
      </Text>
      <Text className="text-muted-foreground text-base text-center">
        Manage your upcoming experiences and track your wellness journey
      </Text>
    </MotiView>
  );
}