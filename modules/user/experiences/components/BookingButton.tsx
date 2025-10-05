import { MotiView } from "moti";
import Button from "@/modules/common/components/Button";

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
  bookingStatus,
}: BookingButtonProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-5"
    >
      {isBooked ? (
        <Button
          title={`Already Booked${
            bookingStatus ? ` (${bookingStatus})` : ""
          }`}
          disabled
          variant="secondary"
        />
      ) : (
        <Button
          title={bookingLoading ? "Booking..." : "Book This Experience"}
          loading={bookingLoading}
          onPress={onPress}
          variant="primary"
        />
      )}
    </MotiView>
  );
}
