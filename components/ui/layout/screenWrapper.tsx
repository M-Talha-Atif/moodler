import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import Logo from "@/assets/images/logo.svg";

interface ScreenWrapperProps extends ScrollViewProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean; // toggle logo visibility
  scrollable?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  contentStyle?: ViewStyle;
}

export default function ScreenWrapper({
  title,
  subtitle,
  showLogo = true,
  scrollable = true,
  backgroundColor = "#FAFAF8",
  children,
  footer,
  contentStyle,
  ...rest
}: ScreenWrapperProps) {
  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Container
          {...rest}
          contentContainerStyle={[
            styles.container,
            scrollable && { flexGrow: 1 },
            contentStyle,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {showLogo && (
            <View style={styles.logoContainer}>
              <Logo width={80} height={80} />
            </View>
          )}

          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          )}

          {children}

          {footer && <View style={styles.footer}>{footer}</View>}
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 28,
    color: "#030303",
  },
  subtitle: {
    fontFamily: "Nunito",
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  footer: {
    marginTop: 24,
  },
});
