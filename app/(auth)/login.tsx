import {
  View,
  TouchableOpacity,
} from "react-native";
import { Text } from "@/components/ui/text";
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

