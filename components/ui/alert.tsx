import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type AlertType = "success" | "error" | "info";

interface AlertProps {
  type?: AlertType;
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type = "info", message, onClose }) => {
  const getStyles = () => {
    switch (type) {
      case "success":
        return { bg: "#0066FF", icon: "checkmark-circle", text: "#FAFAF8" };
      case "error":
        return { bg: "#FF4D4D", icon: "close-circle", text: "#FAFAF8" };
      default:
        return { bg: "#E8E8E6", icon: "information-circle", text: "#030303" };
    }
  };

  const { bg, icon, text } = getStyles();

  return (
    <View
      style={{
        backgroundColor: bg,
        padding: 14,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={22}
          color={text}
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            color: text,
            fontSize: 15,
            fontFamily: "Nunito",
            flexShrink: 1,
          }}
        >
          {message}
        </Text>
      </View>

      {onClose && (
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={20} color={text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Alert;
