import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
  duration?: number;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  visible,
  duration = 2500,
  onHide,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "#16a34a";
      case "error":
        return "#dc2626";
      default:
        return "#030303";
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, backgroundColor: getBgColor() },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    zIndex: 100,
  },
  text: {
    color: "#fff",
    fontFamily: "Nunito",
    fontSize: 15,
    textAlign: "center",
  },
});

export default Toast;
