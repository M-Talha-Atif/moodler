import React, { forwardRef, useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import  {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";

interface BottomSheetProps {
  title?: string;
  children?: React.ReactNode;
}

/**
 * Custom BottomSheet component using @gorhom/bottom-sheet
 *
 * Usage:
 * ```tsx
 * const bottomSheetRef = useRef<BottomSheetModal>(null);
 *
 * // To open
 * bottomSheetRef.current?.present();
 *
 * // To close
 * bottomSheetRef.current?.dismiss();
 * ```
 */
const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ title, children }, ref) => {
    // Snap points - defines the heights the bottom sheet can snap to
    // 'CONTENT_HEIGHT' makes it automatically adjust to content height
    const snapPoints = useMemo(() => ["50%", "90%"], []);


    // Render backdrop with press-to-close functionality
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          pressBehavior="close"
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.background}
        style={styles.container}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Title */}
          {title && <Text style={styles.title}>{title}</Text>}

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  background: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  handleIndicator: {
    backgroundColor: "#d1d5db",
    width: 50,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Nunito",
    color: "#030303",
    textAlign: "center",
    marginBottom: 16,
  },
  content: {
    // Additional content styling if needed
  },
});

export default BottomSheet;