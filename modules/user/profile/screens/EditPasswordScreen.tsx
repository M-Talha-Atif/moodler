import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useCancelableApi } from "@/hooks/useCanceleableApi";
import Button from "@/components/ui/button";
import Alert from "@/components/ui/alert"; 
import Input from "@/components/ui/input"; 
import { updatePassword } from "@/modules/host/profile/services/profileService";
import Logo from "@/assets/images/logo.svg";

interface PasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

export default function EditPasswordScreen() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  //  Simplified alert system
  const [alert, setAlert] = useState<{
    visible: boolean;
    type: "success" | "error" | "info";
    message: string;
  }>({
    visible: false,
    type: "info",
    message: "",
  });

  const cancelableUpdatePassword = useCancelableApi(updatePassword);

  const validateForm = (): boolean => {
    const newErrors: PasswordErrors = {};

    if (!formData.oldPassword.trim()) newErrors.oldPassword = "Old password is required";
    if (!formData.newPassword.trim()) newErrors.newPassword = "New password is required";
    else if (formData.newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your new password";
    else if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (formData.oldPassword === formData.newPassword)
      newErrors.newPassword = "New password must be different from old password";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setErrors({});

      const result = await cancelableUpdatePassword(
        formData.oldPassword,
        formData.newPassword
      );

      if (result.success) {
        setAlert({
          visible: true,
          type: "success",
          message: "Password updated successfully!",
        });
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        handleApiError(result);
      }
    } catch (error: any) {
      console.error("Password update error:", error);
      if (error.name === "AbortError") return;

      if (error.response?.data) handleApiError(error.response.data);
      else {
        setAlert({
          visible: true,
          type: "error",
          message: "Network error. Please check your connection.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiError = (result: any) => {
    switch (result.errorType) {
      case "INVALID_OLD_PASSWORD":
        setErrors({ oldPassword: "Incorrect old password" });
        break;
      case "NO_PASSWORD_ACCOUNT":
        setAlert({
          visible: true,
          type: "error",
          message:
            "Password cannot be changed for this account type. Please use social login.",
        });
        break;
      default:
        setAlert({
          visible: true,
          type: "error",
          message:
            result.reason || "Failed to update password. Please try again.",
        });
    }
  };

  const clearForm = () => {
    setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Custom Alert */}
      {alert.visible && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Logo width={80} height={80} />
      </View>

      {/* Password Form */}
      <View style={styles.form}>
        {/* Old Password */}
        <View style={styles.inputGroup}>
          <Input
            label="Old Password"
            placeholder="Enter your current password"
            value={formData.oldPassword}
            onChangeText={(value) => handleInputChange("oldPassword", value)}
            isPassword
            editable={!isLoading}
            backgroundColor="#FFFFFF"
            borderColor={errors.oldPassword ? "#EF4444" : "#E5E7EB"}
            borderWidth={1}
            borderRadius={12}
            fontSize={16}
            placeholderColor="#9CA3AF"
          />
          {errors.oldPassword && (
            <Text style={styles.errorText}>{errors.oldPassword}</Text>
          )}
        </View>

        {/* New Password */}
        <View style={styles.inputGroup}>
          <Input
            label="New Password"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChangeText={(value) => handleInputChange("newPassword", value)}
            isPassword
            editable={!isLoading}
            backgroundColor="#FFFFFF"
            borderColor={errors.newPassword ? "#EF4444" : "#E5E7EB"}
            borderWidth={1}
            borderRadius={12}
            fontSize={16}
            placeholderColor="#9CA3AF"
          />
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword}</Text>
          )}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Input
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            isPassword
            editable={!isLoading}
            backgroundColor="#FFFFFF"
            borderColor={errors.confirmPassword ? "#EF4444" : "#E5E7EB"}
            borderWidth={1}
            borderRadius={12}
            fontSize={16}
            placeholderColor="#9CA3AF"
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Clear"
            onPress={clearForm}
            disabled={isLoading}
            backgroundColor="#E8E8E6"
            textColor="#030303"
            width="48%"
            height={48}
            fontSize={16}
            borderRadius={9}
          />
          <Button
            title={isLoading ? "Updating..." : "Change Password"}
            onPress={handleSubmit}
            disabled={isLoading}
            backgroundColor={isLoading ? "#9CA3AF" : "#030303"}
            textColor="#EFEFE7"
            width="48%"
            height={48}
            fontSize={16}
            borderRadius={9}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FAFAF8",
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  form: { flex: 1 },
  inputGroup: { marginBottom: 20 },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
});
