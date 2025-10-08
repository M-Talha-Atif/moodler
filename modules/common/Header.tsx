// src/components/layout/Header.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { Text } from "@/components/ui/text";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightContent?: React.ReactNode;
  height?: number; // Recommended range: 60–100
  backgroundColor?: string;
  border?: boolean;
}

export default function Header({
  title,
  showBackButton = false,
  rightContent,
  height = 80,
  backgroundColor = "#FAFAF8",
  border = true,
}: HeaderProps) {
  const router = useRouter();

  // Dynamic font & icon sizing based on height
  const fontSize =
    height >= 95 ? 26 : height >= 80 ? 22 : height >= 70 ? 20 : 18;
  const iconSize = height >= 90 ? 24 : height >= 75 ? 22 : 20;
  const buttonPadding = height >= 90 ? 10 : 8;

  return (
    <MotiView
      from={{ opacity: 0, translateY: -8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300 }}
      style={[
        styles.container,
        {
          height,
          backgroundColor,
          borderBottomWidth: border ? StyleSheet.hairlineWidth : 0,
          borderBottomColor: border ? "#E5E7EB" : "transparent",
        },
      ]}
    >
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.row}>
          {/* Left section (Back button + title) */}
          <View style={styles.leftSection}>
            {showBackButton && (
              <TouchableOpacity
                onPress={() => router.back()}
                style={[
                  styles.backButton,
                  { padding: buttonPadding },
                ]}
                accessibilityLabel="Go back"
              >
                <ArrowLeft size={iconSize} color="#030303" />
              </TouchableOpacity>
            )}

            <Text
              className="font-bold"
              style={{
                fontSize,
                color: "#030303",
                flexShrink: 1,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>

          {/* Optional right-side content */}
          {rightContent ? <View>{rightContent}</View> : <View style={{ width: 24 }} />}
        </View>
      </SafeAreaView>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  backButton: {
    borderRadius: 9999,
    backgroundColor: "#E5E7EB40", // subtle translucent gray
    marginRight: 12,
  },
});
