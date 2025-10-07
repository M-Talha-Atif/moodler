import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange: (date: Date) => void;
  mode?: "date" | "time" | "datetime";
  placeholder?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  labelColor?: string;
  icon?: React.ReactNode;
  accentColor?: string; // 🟡 NEW
  themeVariant?: "light" | "dark"; // 🌗 NEW
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  mode = "date",
  placeholder = "Select date",
  backgroundColor = "#d3d3d3",
  borderColor = "#ccc",
  borderRadius = 10,
  fontFamily = "Nunito",
  fontSize = 14,
  textColor = "#030303",
  labelColor = "#030303",
  icon,
  accentColor = "#030303", // default black highlight
  themeVariant = "light",
  style,
  textStyle,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = (date: Date) => {
    setIsVisible(false);
    onChange(date);
  };

  const formatValue = (date: Date) => {
    if (mode === "time") return dayjs(date).format("hh:mm A");
    if (mode === "datetime") return dayjs(date).format("DD MMM YYYY, hh:mm A");
    return dayjs(date).format("DD MMM YYYY");
  };

  return (
    <View style={{ width: "100%" }}>
      {label && (
        <Text
          style={{
            marginBottom: 6,
            fontFamily,
            fontSize: 14,
            color: labelColor,
          }}
        >
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        activeOpacity={0.8}
        style={[
          styles.inputContainer,
          { backgroundColor, borderColor, borderRadius },
          style,
        ]}
      >
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <Text
          style={[
            {
              fontFamily,
              fontSize,
              color: value ? textColor : "#555",
            },
            textStyle,
          ]}
        >
          {value ? formatValue(value) : placeholder}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
        date={value || new Date()}
        themeVariant={themeVariant}
        display={Platform.OS === "ios" ? "spinner" : "default"}
        pickerStyle={{
          accentColor, // 💡 Android accent color
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
});

export default DatePicker;
