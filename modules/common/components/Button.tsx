import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  ViewStyle,
} from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "destructive"
  | "ghost"
  | "gradient";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  style?: ViewStyle;
  gradientColors?: string[]; // only used if variant="gradient"
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  haptic?: boolean; // vibrate on press
}

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
  style,
  gradientColors = ["#7bf163", "#5ECD4A"],
  iconLeft,
  iconRight,
  haptic = true,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-base",
    lg: "py-4 px-6 text-lg",
  }[size];

  const variantClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    outline: "border border-gray-300 bg-transparent",
    destructive: "bg-destructive",
    ghost: "bg-transparent",
    gradient: "",
  }[variant];

  const textColor = {
    primary: "text-primary-foreground",
    secondary: "text-foreground",
    outline: "text-foreground",
    destructive: "text-white",
    ghost: "text-foreground",
    gradient: "text-white",
  }[variant];

  const handlePress = async () => {
    if (haptic) await Haptics.selectionAsync();
    onPress?.();
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300 }}
      style={style}
    >
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        activeOpacity={0.9}
        className={`flex-row justify-center items-center rounded-2xl ${variantClasses} ${sizeClasses} ${
          isDisabled ? "opacity-70" : ""
        } ${className}`}
      >
        {variant === "gradient" ? (
          <LinearGradient
            colors={isDisabled ? ["#9CA3AF", "#6B7280"] : gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 items-center justify-center rounded-2xl"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className={`font-semibold text-center ${textColor}`}>
                {title}
              </Text>
            )}
          </LinearGradient>
        ) : (
          <>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View className="flex-row items-center justify-center">
                {iconLeft && <View className="mr-2">{iconLeft}</View>}
                <Text className={`font-semibold text-center ${textColor}`}>
                  {title}
                </Text>
                {iconRight && <View className="ml-2">{iconRight}</View>}
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    </MotiView>
  );
}
