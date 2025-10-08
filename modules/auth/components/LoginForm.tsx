import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { error, login, setError, clearError } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    try {
      clearError();
      setIsLoading(true);
      await login(email, password);
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { paddingRight: 40 }]}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Pressable
        style={[
          styles.button,
          { backgroundColor: isLoading ? "#9CA3AF" : "#030303" },
        ]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 24 },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  inputGroup: { gap: 6 },
  label: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#111827",
  },
  passwordWrapper: { position: "relative" },
  eyeIcon: { position: "absolute", right: 12, top: "30%" },
  button: {
    marginTop: 8,
    borderRadius: 9,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#EFEFE7", fontWeight: "700", fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  footerText: { color: "#6B7280", fontSize: 14 },
  link: { color: "#030303", fontWeight: "700", fontSize: 14 },
});
