import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import SignupForm from "@/modules/auth/components/SignupForm";
import ScreenWrapper from "@/components/ui/layout/screenWrapper";

export default function SignupScreen() {
  return (
    <ScreenWrapper
      title="Moodly"
      subtitle="Create your account"
      showLogo={true}
    >
      <SignupForm />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Link href="/(auth)/login" asChild>
          <Text style={styles.signinText}>Sign in</Text>
        </Link>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    paddingBottom: 40,
  },
  footerText: {
    color: "#6B7280",
    fontSize: 14,
  },
  signinText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#030303",
  },
});
