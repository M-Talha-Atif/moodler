// src/modules/user/experiences/components/BookingButton.tsx
import { TouchableOpacity, Text } from 'react-native';
import { MotiView } from 'moti';

interface BookingButtonProps {
  isBooked: boolean;
  bookingLoading: boolean;
  onPress: () => void;
  bookingStatus?: string;
}

export default function BookingButton({ 
  isBooked, 
  bookingLoading, 
  onPress, 
  bookingStatus 
}: BookingButtonProps) {
  if (isBooked) {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-5"
      >
        <TouchableOpacity
          disabled
          className="w-full py-4 rounded-2xl bg-muted"
          accessibilityLabel="Already booked"
        >
          <Text className="text-center text-muted-foreground font-semibold text-base">
            Already Booked {bookingStatus && `(${bookingStatus})`}
          </Text>
        </TouchableOpacity>
      </MotiView>
    );
  }

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 300 }}
      className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-5"
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={bookingLoading}
        className={`w-full py-4 rounded-2xl shadow-lg ${
          bookingLoading ? "bg-primary/70" : "bg-primary"
        }`}
        accessibilityLabel={bookingLoading ? "Booking in progress" : "Book this experience"}
        accessibilityRole="button"
      >
        <Text className="text-center text-primary-foreground font-semibold text-lg">
          {bookingLoading ? "Booking..." : "Book This Experience"}
        </Text>
      </TouchableOpacity>
    </MotiView>
  );
}