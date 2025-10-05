// src/modules/user/experiences/components/BookingStatus.tsx
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

interface BookingStatusProps {
  isBooked: boolean;
  bookingStatus?: string;
}

export default function BookingStatus({ isBooked, bookingStatus }: BookingStatusProps) {
  if (!isBooked) return null;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', delay: 600 }}
    >
      <View className="bg-success/10 p-4 rounded-2xl border border-success/20">
        <Text className="text-success font-semibold text-center text-sm">
          You have already booked this experience {bookingStatus && `(${bookingStatus})`}
        </Text>
      </View>
    </MotiView>
  );
}