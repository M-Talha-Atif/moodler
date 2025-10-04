// src/modules/dailyCheckIn/components/SubmitButton.tsx
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MotiView } from "moti";

interface SubmitButtonProps {
  onSubmit: () => void;
  loading: boolean;
  disabled: boolean;
  children: string;
  marginTop?: number; // optional prop to control top margin
}

export default function SubmitButton({
  onSubmit,
  loading,
  disabled,
  children,
  marginTop, // we will override with responsive default if undefined
}: SubmitButtonProps) {
  const screenWidth = Dimensions.get("window").width;

  // Responsive padding and font sizes
  const padding = screenWidth > 768 ? 20 : screenWidth > 480 ? 16 : 12;
  const fontSize = screenWidth > 768 ? 18 : screenWidth > 480 ? 16 : 14;
  const borderRadius = screenWidth > 768 ? 24 : screenWidth > 480 ? 20 : 16;
  const responsiveMarginTop =
    marginTop !== undefined
      ? marginTop
      : screenWidth > 768
        ? 24
        : screenWidth > 480
          ? 20
          : 16;

  return (
    <MotiView
      from={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 500, delay: 400 }}
      style={{ marginTop: responsiveMarginTop }}
    >
      <TouchableOpacity
        onPress={onSubmit}
        disabled={disabled || loading}
        style={{
          width: "100%",
          padding,
          borderRadius,
          backgroundColor: disabled || loading ? "#9ca3af" : "#10b981",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={{ color: "white", fontSize, fontWeight: "600" }}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </MotiView>
  );
}
