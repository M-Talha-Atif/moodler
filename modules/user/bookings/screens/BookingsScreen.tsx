import { useRef, useState, useCallback, useMemo } from "react";
import { Filter } from "lucide-react-native";
import Header from "@/modules/common/Header";
import BookingList from "../components/BookingList";
import BookingFiltersSheet from "../components/BookingFilterBottomSheet";
import AlertDialog from "@/components/ui/alertDialog";
import { deleteBooking } from "../services/bookingService";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Toast from "@/components/ui/toast";


export interface BookingFilters {
  status: string;
  timeFilter: string;
}

export default function BookingsScreen() {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [filters, setFilters] = useState<BookingFilters>({
    status: "all",
    timeFilter: "anytime",
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });


  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== "all") count++;
    if (filters.timeFilter !== "anytime") count++;
    return count;
  }, [filters]);

  const handleApplyFilters = useCallback((newFilters: BookingFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({ status: "all", timeFilter: "anytime" });
  }, []);

  const handleCancelRequest = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setAlertVisible(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBookingId) return;
    setIsProcessing(true);


    try {
      await deleteBooking(selectedBookingId);
      setRefreshTrigger(prev => (prev + 1))
      // Toast.show({ type: "success", text1: "Booking cancelled successfully!" });
      setToast({ visible: true, message: "Booking cancelled successfully!", type: "success" });

      // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    } catch {
      // Toast.show({ type: "error", text1: "Failed to cancel booking. Try again." });
      setToast({ visible: true, message: "Failed to cancel booking. Try again.", type: "error" });

    } finally {
      setIsProcessing(false);
      setAlertVisible(false);
      setSelectedBookingId(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAF8" }}>
      <Header
        title="My Bookings"
        rightIcon={
          <View style={{ position: "relative" }}>
            <Filter size={22} color="#030303" />
            {activeFilterCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#030303",
                  borderWidth: 1.2,
                  borderColor: "#FAFAF8",
                }}
              />
            )}
          </View>
        }
        onRightPress={() => sheetRef.current?.present()}
      />

      <View style={{ marginTop: 16, flex: 1 }}>
        <BookingList filters={filters} onCancelPress={handleCancelRequest} refreshTrigger={refreshTrigger} />
      </View>

      <BookingFiltersSheet
        ref={sheetRef}
        initialFilters={filters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <AlertDialog
        visible={alertVisible}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking?"
        confirmText={isProcessing ? "Cancelling..." : "Yes, Cancel"}
        cancelText="No"
        onCancel={() => setAlertVisible(false)}
        onConfirm={handleConfirmCancel}
      />

      <Toast
        message={toast.message}
        type={toast.type as any}
        visible={toast.visible}
        onHide={() => setToast((prev) => ({ ...prev, visible: false }))}
      />

    </SafeAreaView>
  );
}
