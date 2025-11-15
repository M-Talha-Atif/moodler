import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { Text } from "@/components/ui/text";
import IconCard from "@/components/ui/iconCard";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  height?: number;
  backgroundColor?: string;
  border?: boolean;
  rightIcon?: React.ReactNode; // optional icon
  onRightPress?: () => void;   
}

export default function Header({
  title,
  showBackButton = false,
  rightIcon,
  onRightPress,
  height = 80,
  backgroundColor = "#FAFAF8",
  border = true,
}: HeaderProps) {
  const router = useRouter();

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
          {/* Left Section (Back + Title) */}
          <View style={styles.leftSection}>
            {showBackButton && (
              <TouchableOpacity
                onPress={() => router.back()}
                style={[styles.backButton, { padding: buttonPadding }]}
              >
                <ArrowLeft size={iconSize} color="#030303" />
              </TouchableOpacity>
            )}

            <Text
              style={{
                fontSize,
                color: "#030303",
                fontWeight: "bold",
                flexShrink: 1,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>

          {/* Right Section — Optional Icon */}
          {rightIcon ? (
            <IconCard
              size={40}
              borderRadius={12}
              backgroundColor="#FFFFFF"
              shadow={false}
              onPress={onRightPress}
            >
              {rightIcon}
            </IconCard>
          ) : (
            <View style={{ width: 40 }} />
          )}
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
    backgroundColor: "#E5E7EB40",
    marginRight: 12,
  },
});
