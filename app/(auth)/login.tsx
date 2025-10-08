import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text } from "@/components/ui/text";
import Logo from "@/assets/images/logo.svg";
import { Link } from "expo-router";
import LoginForm from "@/modules/auth/components/LoginForm"; // or SignupForm
import ScreenWrapper from "@/components/ui/layout/screenWrapper";

export default function LoginScreen() {
  return (
    <ScreenWrapper title="Moodly" subtitle="Login to your account">

      <LoginForm />

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24 }}>
        <Text style={{ color: "#6B7280" }}>New to Moodly? </Text>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity>
            <Text style={{ fontWeight: "700", color: "#030303" }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 28,
    color: "#030303",
    marginTop: 12,
  },
  subtitle: {
    fontFamily: "Nunito",
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#6B7280",
    fontSize: 14,
  },
  linkText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#030303",
  },
});
